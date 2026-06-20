/* ============================================================================
   Invotica — production trace logger
   ----------------------------------------------------------------------------
   Goal: when something breaks in production you can pinpoint WHERE and WHEN,
   instead of hunting for a needle in a haystack.

   What it gives you:
   - A per-session `traceId` stamped on every log line + every captured error.
   - Levels (debug/info/warn/error) with timestamps, page path, and component tag.
   - Global capture of uncaught errors and unhandled promise rejections.
   - An in-memory ring buffer (last N entries) you can dump from the console at
     any time via `window.__invotica.dump()`.
   - A single `report()` sink that is Sentry-ready: flip ONE flag (or wire the
     `onReport` hook) to ship errors to a real backend later. Off by default so
     the site stays light.

   How to read a trace in production: open the browser console and run
       window.__invotica.dump()
   You get an ordered list of everything that happened this session with the
   traceId, so you can reproduce and locate the failing component/page.
   See docs/LOGGING.md for the full runbook.
   ========================================================================== */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  ts: string; // ISO timestamp
  level: LogLevel;
  traceId: string;
  scope: string; // component / module tag
  page: string; // pathname at time of log
  message: string;
  data?: unknown;
}

interface LoggerConfig {
  /** Minimum level to record. */
  minLevel: LogLevel;
  /** Max entries kept in the in-memory ring buffer. */
  bufferSize: number;
  /** Persist the buffer to localStorage so it survives a reload (prod aid). */
  persist: boolean;
  /** Forward error-level entries to an external sink (e.g. Sentry). */
  report: boolean;
  /** Custom report sink. Receives every entry at/above error level. */
  onReport?: (entry: LogEntry) => void;
}

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const isBrowser = typeof window !== "undefined";
const isDev =
  (typeof import.meta !== "undefined" && import.meta.env?.DEV) ?? false;

const STORAGE_KEY = "invotica:trace";

/** Short, URL-safe, time-sortable id (no dependency). */
function makeTraceId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}-${r}`;
}

const CONSOLE_STYLE: Record<LogLevel, string> = {
  debug: "color:#8aa39c",
  info: "color:#214239;font-weight:600",
  warn: "color:#c35f3b;font-weight:600",
  error: "color:#fff;background:#ad4f2e;padding:1px 4px;border-radius:3px",
};

class Logger {
  private cfg: LoggerConfig;
  private buffer: LogEntry[] = [];
  readonly traceId: string;
  private installed = false;

  constructor() {
    this.traceId = makeTraceId();
    this.cfg = {
      minLevel: isDev ? "debug" : "info",
      bufferSize: 200,
      persist: !isDev,
      report: false, // ← set true (or pass onReport) to enable Sentry-style sink
      onReport: undefined,
    };
    if (this.cfg.persist) this.restore();
  }

  configure(partial: Partial<LoggerConfig>) {
    this.cfg = { ...this.cfg, ...partial };
  }

  private page(): string {
    return isBrowser ? window.location.pathname : "ssr";
  }

  private restore() {
    if (!isBrowser) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) this.buffer = JSON.parse(raw).slice(-this.cfg.bufferSize);
    } catch {
      /* storage blocked / quota — ignore, logging must never throw */
    }
  }

  private flush() {
    if (!isBrowser || !this.cfg.persist) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.buffer));
    } catch {
      /* ignore */
    }
  }

  private write(level: LogLevel, scope: string, message: string, data?: unknown) {
    if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[this.cfg.minLevel]) return;

    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level,
      traceId: this.traceId,
      scope,
      page: this.page(),
      message,
      data,
    };

    this.buffer.push(entry);
    if (this.buffer.length > this.cfg.bufferSize) this.buffer.shift();
    this.flush();

    // Console output (always in dev; warn/error always in prod).
    if (isDev || level === "warn" || level === "error") {
      const tag = `%c[${level}] ${scope}`;
      const meta = `(${entry.traceId} · ${entry.page})`;
      const fn =
        level === "error"
          ? console.error
          : level === "warn"
            ? console.warn
            : console.log;
      data !== undefined
        ? fn(`${tag} ${message} ${meta}`, CONSOLE_STYLE[level], data)
        : fn(`${tag} ${message} ${meta}`, CONSOLE_STYLE[level]);
    }

    if (level === "error" && this.cfg.report) {
      try {
        this.cfg.onReport?.(entry);
      } catch {
        /* a broken sink must not break the app */
      }
    }
  }

  debug(scope: string, message: string, data?: unknown) {
    this.write("debug", scope, message, data);
  }
  info(scope: string, message: string, data?: unknown) {
    this.write("info", scope, message, data);
  }
  warn(scope: string, message: string, data?: unknown) {
    this.write("warn", scope, message, data);
  }
  error(scope: string, message: string, data?: unknown) {
    this.write("error", scope, message, data);
  }

  /** Return a copy of the current trace buffer. */
  dump(): LogEntry[] {
    return [...this.buffer];
  }

  /** Clear the buffer + persisted store. */
  clear() {
    this.buffer = [];
    if (isBrowser && this.cfg.persist) {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }

  /** Install global error handlers + console helpers. Idempotent. */
  install() {
    if (!isBrowser || this.installed) return;
    this.installed = true;

    window.addEventListener("error", (e) => {
      this.error("window.onerror", e.message, {
        source: e.filename,
        line: e.lineno,
        col: e.colno,
        stack: e.error?.stack,
      });
    });

    window.addEventListener("unhandledrejection", (e) => {
      this.error("unhandledrejection", String(e.reason?.message ?? e.reason), {
        stack: e.reason?.stack,
      });
    });

    // Console handle for live debugging in prod.
    (window as unknown as Record<string, unknown>).__invotica = {
      traceId: this.traceId,
      dump: () => this.dump(),
      clear: () => this.clear(),
      logger: this,
    };

    this.info("logger", "trace session started");
  }
}

export const logger = new Logger();
