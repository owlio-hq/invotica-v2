/* ============================================================================
   Industry landing pages — one entry per niche, rendered by
   src/pages/website-design-for-[slug].astro. Keep FAQ content distinct per
   industry (no copy-pasting the pricing FAQ) to avoid duplicate-content issues.
   ========================================================================== */

export interface IndustryPainPoint {
  title: string;
  body: string;
}

export interface Industry {
  slug: string;
  /** Short label used in nav-style links, e.g. footer/homepage strip. */
  label: string;
  /** Plural search-facing phrase, e.g. "restaurants & cafés". */
  audience: string;
  /** Singular noun for mid-sentence copy, e.g. "a {singular} site". */
  singular: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: [string, string]; // [plain lead-in, marker-highlighted close]
  intro: string;
  /** Closing CTA headline — written per industry so it always reads naturally. */
  ctaTitle: string;
  painPoints: IndustryPainPoint[];
  mustHaves: string[];
  recommendedPlanId: "starter" | "growth" | "pro";
  recommendedReason: string;
  faq: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: "restaurants",
    label: "Restaurants & Cafés",
    audience: "restaurants & cafés",
    singular: "restaurant",
    metaTitle: "Website Design for Restaurants & Cafés",
    metaDescription:
      "Custom restaurant & café websites built for Canadian businesses — real menus, Maps integration, mobile-first, and local SEO from day one.",
    kicker: "Website design for restaurants & cafés",
    h1: ["A website that gets people in the door, not just", "browsing."],
    intro:
      "Hungry customers check your menu, hours, and reviews before they ever call. If your site is slow, outdated, or missing from Google, they order from whoever shows up first.",
    ctaTitle: "Ready for a website that fills tables?",
    painPoints: [
      {
        title: "Your menu is a screenshot",
        body: "PDFs and photos of menus are slow to load, impossible to update quickly, and don't get indexed by Google the way real text does.",
      },
      {
        title: "No one can find your hours",
        body: "Buried contact info costs you walk-ins during exactly the hours people are deciding where to eat.",
      },
      {
        title: "Mobile visitors bounce",
        body: "Most people search for restaurants standing outside, deciding where to eat right now. A clunky mobile site loses them in seconds.",
      },
    ],
    mustHaves: [
      "Menu built as real, editable text — not a PDF — fast to load and actually searchable on Google",
      "Hours, address, and phone visible on every page, plus one-tap call and directions",
      "Embedded Google Maps and ordering/reservation links front and centre",
      "Photo-first design that makes the food look as good as it tastes",
      "Local SEO setup so you show up for \"[cuisine] near me\" searches",
    ],
    recommendedPlanId: "growth",
    recommendedReason:
      "Most restaurants land in Growth: local SEO + Google Business setup and a Maps-integrated layout matter more here than for a simple info site.",
    faq: [
      {
        q: "Can you add online ordering or reservations?",
        a: "Yes — we can integrate with whatever platform you already use, or recommend one, and link it directly from your homepage and menu.",
      },
      {
        q: "Can I update the menu myself?",
        a: "On managed plans we handle updates for you. On one-time plans, we build the menu so it's simple to hand off — no code required for basic text or price changes.",
      },
      {
        q: "Do you handle photography?",
        a: "We design around photos you provide. If you don't have any yet, we'll tell you exactly what shots to get — it makes the biggest visual difference on a restaurant site.",
      },
    ],
  },
  {
    slug: "salons-barbershops",
    label: "Salons & Barbershops",
    audience: "salons & barbershops",
    singular: "salon",
    metaTitle: "Website Design for Salons & Barbershops",
    metaDescription:
      "Custom salon & barbershop websites built for Canadian businesses — booking links, real work galleries, and mobile-first design that converts.",
    kicker: "Website design for salons & barbershops",
    h1: ["Look as good online as your", "chair does."],
    intro:
      "Most people choose a salon or barbershop based on the first thing they see — Instagram, then Google. If your website doesn't match that first impression, you lose the booking before they ever call.",
    ctaTitle: "Ready for a website that fills the chair?",
    painPoints: [
      {
        title: "You're relying on Instagram alone",
        body: "Social profiles get buried in algorithms and don't rank on Google. A real website is the one thing you fully own and control.",
      },
      {
        title: "Booking friction",
        body: "If people have to call during business hours to book, some will just pick whoever lets them book online instead.",
      },
      {
        title: "No proof of your work",
        body: "Without a clean gallery of your actual work — cuts, colour, styles — new customers have no way to judge quality before walking in.",
      },
    ],
    mustHaves: [
      "Booking link or embedded scheduler front and centre — works with Fresha, Vagaro, Square, or whatever you already use",
      "A real photo gallery of your work, not stock photos",
      "Services and pricing laid out clearly, so people know what to expect",
      "One-tap call, directions, and hours on every page",
      "Mobile-first, since most bookings start on a phone between other things",
    ],
    recommendedPlanId: "starter",
    recommendedReason:
      "Starter covers most salons and barbershops well — a clean, fast site with basic SEO. Upgrade to Growth once you want deeper local SEO and testimonials built in.",
    faq: [
      {
        q: "Can you link my booking system?",
        a: "Yes — we'll embed or link whatever booking tool you use so clients can book directly from the site.",
      },
      {
        q: "Can I add new staff or services later?",
        a: "On one-time plans, small text or price edits are simple to make yourself once handed off. Bigger changes are quoted separately or covered under a managed plan.",
      },
      {
        q: "Do you build the gallery from my Instagram photos?",
        a: "We can use your existing photos, but we'll help you pick and present the strongest ones — a good gallery is often the single biggest factor in booking decisions.",
      },
    ],
  },
  {
    slug: "dental-clinics",
    label: "Dental & Medical Clinics",
    audience: "dental & medical clinics",
    singular: "clinic",
    metaTitle: "Website Design for Dental & Medical Clinics",
    metaDescription:
      "Custom dental & medical clinic websites for Canadian practices — clear service pages, appointment booking, local SEO, and a design that earns trust.",
    kicker: "Website design for dental & medical clinics",
    h1: ["The trust your practice has earned,", "built into your site."],
    intro:
      "Patients research a clinic online before ever calling — checking credentials, services, and whether the practice feels professional. A dated or confusing website undoes trust you've spent years earning in person.",
    ctaTitle: "Ready for a website your practice deserves?",
    painPoints: [
      {
        title: "Your site doesn't match your practice",
        body: "An outdated or generic-looking website makes a well-run clinic look less credible than it is.",
      },
      {
        title: "New patients can't tell what you offer",
        body: "Buried or vague service pages send confused visitors elsewhere, especially for anything beyond a basic cleaning or check-up.",
      },
      {
        title: "Booking isn't obvious",
        body: "If the path to book an appointment isn't immediate, most visitors won't hunt for it.",
      },
    ],
    mustHaves: [
      "Clear service pages (general, cosmetic, emergency, etc.) that match how patients actually search",
      "Prominent appointment booking or request-a-call form, above the fold",
      "Insurance, new-patient info, and credentials laid out plainly",
      "Local SEO + Google Business setup, since most searches are \"[service] near me\"",
      "Accessible, fast, mobile-first — many patients search in a hurry or in pain",
    ],
    recommendedPlanId: "pro",
    recommendedReason:
      "Clinics usually need more structure than a simple site — multiple service pages, sometimes booking integrations. Pro is scoped individually so it fits exactly what your practice needs.",
    faq: [
      {
        q: "Can you integrate our booking or patient system?",
        a: "Yes — we scope this per clinic depending on the software you use or want to use, which is part of why clinic sites are quoted as Pro projects.",
      },
      {
        q: "Can you write the service page content?",
        a: "We can guide the structure and help refine copy — but for anything medical or clinical, we'll ask you or your team to confirm accuracy before it goes live.",
      },
      {
        q: "Do you handle multi-location practices?",
        a: "Yes, Pro plans support multiple locations with their own address, hours, and contact details.",
      },
    ],
  },
  {
    slug: "contractors",
    label: "Trades & Contractors",
    audience: "trades & contractors",
    singular: "contractor",
    metaTitle: "Website Design for Trades & Contractors",
    metaDescription:
      "Custom websites for Canadian trades & contractors — click-to-call, service-area SEO, before/after galleries, and fast mobile-first pages.",
    kicker: "Website design for trades & contractors",
    h1: ["Be the first call, not the", "third quote."],
    intro:
      "When something breaks, people search, call the first few results, and go with whoever answers first and looks legit. If you're not showing up — or your site looks like it's from 2010 — that call goes to a competitor.",
    ctaTitle: "Ready to be the first call?",
    painPoints: [
      {
        title: "You're invisible on Google",
        body: "Word-of-mouth is great until it isn't. Without a real website, you're missing every customer who starts with a search instead of a referral.",
      },
      {
        title: "No way to show proof of work",
        body: "Trades live and die by trust. Without photos of past jobs and clear service areas, you look like a risk instead of a sure thing.",
      },
      {
        title: "Slow response loses the job",
        body: "If someone can't find your number or a contact form in seconds, they've already called the next name on the list.",
      },
    ],
    mustHaves: [
      "Click-to-call front and centre — most searches happen when something's urgently broken",
      "Clear service list and service area, so you rank for \"[service] near [city]\"",
      "Before/after photos or past job examples to prove the work",
      "Simple quote-request form for non-urgent jobs",
      "Fast-loading, mobile-first — a lot of these searches happen on-site, on a phone, mid-job",
    ],
    recommendedPlanId: "growth",
    recommendedReason:
      "Growth fits most trades well: local SEO, Maps integration, and a services layout built to convert urgent searches into calls.",
    faq: [
      {
        q: "Can you set up a Google Business Profile too?",
        a: "Growth and Pro plans include Google Business Profile setup alongside the website, since for trades that's often just as important as the site itself.",
      },
      {
        q: "I cover multiple cities or areas — can the site reflect that?",
        a: "Yes — we can structure service-area pages so you show up for searches across each area you actually work in.",
      },
      {
        q: "What if I don't have photos of past jobs yet?",
        a: "Start collecting a few on your next jobs — even phone photos work well. We can launch with a placeholder layout and add real photos as you send them.",
      },
    ],
  },
];
