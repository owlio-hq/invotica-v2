/* ============================================================================
   Invotica — single source of truth
   All copy/config that repeats or may change lives here. Components import from
   this file; no duplicated hardcoded strings across the site.
   NOTE: items tagged `DUMMY` are placeholders to swap for real data later.
   ========================================================================== */

export const site = {
  name: "Invotica",
  domain: "invotica.com",
  url: "https://invotica.com",
  tagline: "Custom websites for Canadian businesses — built fast, built to convert.",
  description:
    "Invotica builds agency-quality custom websites for Canadian businesses — fast, mobile-first, SEO-ready, and yours to keep. No templates, no hostage situations.",
  email: "vasu.invotica@gmail.com",
  phone: "+1 (403) 431-8228",
  phoneHref: "+14034318228", // tel: link (digits only, with country code)
  location: "Canada-wide · Remote",
  // Contact form delivery — FormSubmit (no signup/key; forwards to the email
  // below). NOTE: the first submission triggers a one-time activation email to
  // that inbox — click the link in it once to start receiving messages.
  formEndpoint: "https://formsubmit.co/ajax/vasu.invotica@gmail.com",
  social: [
    // Empty for now — footer hides the social row until these are provided.
    // { label: "Instagram", href: "https://instagram.com/..." },
  ] as { label: string; href: string }[],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/** Marquee belt items under the hero. */
export const marquee = [
  { big: "4 Days", small: "To your first design preview" },
  { big: "100%", small: "Mobile responsive" },
  { big: "Fully Custom", small: "No templates, ever" },
  { big: "Canada-Wide", small: "We serve any industry" },
  { big: "81%", small: "Customers research online first" },
  { big: "SEO Ready", small: "Google-optimised from day one" },
];

export const problems = [
  {
    title: "They searched. You weren't there.",
    body: "Most people look up a business before they call or visit. If they can't find you — or what they find looks bad — they move on. Simple as that.",
  },
  {
    title: "Your competitor got the client. Not you.",
    body: "When two similar businesses show up online and one has a clean, professional website, the choice is obvious. People trust whoever looks more credible.",
  },
  {
    title: "You don't have time for this.",
    body: "You're running a business. Figuring out websites, hosting, and tech problems is not your job. It shouldn't be your problem. That's ours.",
  },
];

export const numbers = {
  main: [
    {
      stat: "81%",
      body: "Of customers research a business online before buying or visiting. If they can't find you, they'll find your competitor.",
    },
    {
      stat: "75%",
      body: "Of people judge a company's credibility entirely based on website design. First impressions happen online, not at the door.",
    },
  ],
  supporting: [
    { stat: "57%", body: "Won't recommend a business with a poorly designed mobile site" },
    { stat: "40%", body: "Of Google Business Profile performance is driven by your website" },
    { stat: "2x", body: "Faster growth for businesses with a strong online presence" },
  ],
};

export const realDifference = {
  found: {
    tagline: "about being found",
    tiers: "Starter",
    body: "A customer hears about your business or walks past your shop. They Google you. Your site is clean, fast, and professional — and they tap to call or message you directly.",
  },
  trusted: {
    tagline: "about being trusted & scaled",
    tiers: "Growth & Pro",
    body: "A growing business lives on trust — renovation, legal, medical, consulting, or simply standing out from the shop next door. People read about you before they reach out. Growth and Pro give them every reason to choose you.",
  },
  note: "Not sure which plan? Start with Starter — you can always upgrade and we'll credit your previous payments toward the new plan.",
};

export const process = [
  {
    n: "01",
    title: "The Brief",
    body: "We start by understanding your business, your goals, and what makes your customers click.",
  },
  {
    n: "02",
    title: "Design & Build",
    body: "We design a clean, modern aesthetic and build it on a lightning-fast framework.",
  },
  {
    n: "03",
    title: "Review & Polish",
    body: "You review the site. We tweak the copy, perfect the mobile view, and ensure it's ready.",
  },
  {
    n: "04",
    title: "Launch & Grow",
    body: "We flip the switch, connect your domain, and hand you the keys with zero ongoing hostages.",
  },
];

export interface PlanVariant {
  price: string;
  /** "" for one-time, "/month" for managed. */
  cadence: string;
  /** Small accent line under the price (e.g. value framing or setup fee). */
  priceNote: string;
  /** One-line description of who/what this variant is for. */
  tagline: string;
  features: string[];
  /** Fine-print line under the features. */
  footnote: string;
}

export interface Plan {
  id: string;
  name: string;
  featured?: boolean;
  /** Example businesses this plan suits (shown as tags on home teasers). */
  examples: string[];
  /** Pay-once build. */
  oneTime: PlanVariant;
  /** Ongoing managed subscription. */
  managed: PlanVariant;
}

/* DRAFT pricing — confirm before launch. One-time = pay-once build you own;
   managed = monthly subscription (we build, host & maintain) + a setup fee. */
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    examples: ["Barbershop", "Café", "Salon", "Retail shop"],
    oneTime: {
      price: "$999 CAD",
      cadence: "",
      priceNote: "Pay once · yours forever",
      tagline: "Pay once, own your site forever. All files handed over.",
      features: [
        "Fully custom-designed website",
        "Up to 5 pages",
        "Mobile responsive",
        "Basic SEO setup",
        "Contact form + WhatsApp",
        "Delivered in 7–14 days",
        "Source files included",
      ],
      footnote: "One round of revisions. Additional pages at $100 CAD/page.",
    },
    managed: {
      price: "$259 CAD",
      cadence: "/month",
      priceNote: "+ $700 CAD setup",
      tagline: "We build it, host it, and keep it running. You focus on business.",
      features: [
        "Everything in the one-time Starter",
        "Managed hosting, domain & SSL",
        "Monthly content & photo updates",
        "Security, backups & uptime monitoring",
        "Email support, response in hours",
        "Cancel anytime — the site stays yours",
      ],
      footnote: "No long-term contract. Cancel anytime.",
    },
  },
  {
    id: "growth",
    name: "Growth",
    featured: true,
    examples: ["Restaurant", "Gym", "Clinic", "Trades"],
    oneTime: {
      price: "$1,499 CAD",
      cadence: "",
      priceNote: "Best value for growing businesses",
      tagline: "A professional site built to earn trust and drive enquiries.",
      features: [
        "Fully custom professional design",
        "Up to 8 pages",
        "Local SEO + Google Business setup",
        "Services layout + testimonials",
        "Google Maps integration",
        "Contact form + WhatsApp",
        "Delivered in 10–18 days",
        "Source files included",
      ],
      footnote: "Two rounds of revisions. Additional pages at $120 CAD/page.",
    },
    managed: {
      price: "$359 CAD",
      cadence: "/month",
      priceNote: "+ $1,200 CAD setup",
      tagline: "Full-service management. We design, build, host, and maintain.",
      features: [
        "Everything in the one-time Growth",
        "Managed hosting, domain & SSL",
        "Bi-weekly updates & content edits",
        "Ongoing SEO + monthly reporting",
        "Priority support (email + chat)",
        "Quarterly performance review",
      ],
      footnote: "No long-term contract. Cancel anytime.",
    },
  },
  {
    id: "pro",
    name: "Pro",
    examples: ["Law firm", "Dental practice", "Consultant", "Multi-location"],
    oneTime: {
      price: "From $1,999",
      cadence: "",
      priceNote: "Scoped to your project",
      tagline: "Custom-built for businesses that need more than a standard site.",
      features: [
        "Everything in Growth",
        "Booking / scheduling systems",
        "E-commerce functionality",
        "Custom integrations",
        "Unlimited pages",
        "Delivered in 3–6 weeks",
      ],
      footnote: "We scope every project individually and give you a clear, honest quote.",
    },
    managed: {
      price: "From $499",
      cadence: "/month",
      priceNote: "+ Custom setup fee",
      tagline: "Your ongoing web partner. We handle everything so you don't have to.",
      features: [
        "Everything in one-time Pro, managed",
        "Dedicated partner, response in hours",
        "Unlimited updates & new pages",
        "Bookings / e-commerce maintained",
        "Monthly strategy & growth calls",
        "Advanced analytics & A/B testing",
      ],
      footnote: "Tailored retainer, scoped to your needs.",
    },
  },
];

export const guarantees = [
  {
    title: "You own everything",
    body: "No hostage situations. We hand over all files and code. Even if you choose our managed plan and cancel later, your site is yours to keep.",
  },
  {
    title: "No hidden fees",
    body: "The price we quote is the price you pay. If the scope changes, we discuss it before any work happens. Honest, transparent pricing.",
  },
  {
    title: "Fast communication",
    body: "When you message us, you get a response in hours, not days. We act as your true digital partner.",
  },
];

export const about = {
  headline: "Why I started Invotica.",
  paragraphs: [
    "A few years ago, I noticed a frustrating trend in the web design industry. Canadian small businesses were being forced to choose between two terrible options.",
    "Option one: Pay a massive agency $10,000+ for a custom site. Option two: Hire someone cheap, wait months for delivery, and end up with a broken template and a developer who ghosts you.",
    "I built Invotica to fix this. We provide agency-quality, custom websites for a fraction of the cost, and we do it fast. No templates, no hostage situations, and no ghosting. Just clean code, beautiful design, and a partner you can actually reach when you need them.",
  ],
  signoff: `— ${"Alex Morgan"}, Founder`, // DUMMY
};

/* DRAFT — pricing comparison matrix. `true` = included, `false`/string otherwise.
   Columns map to plan ids: [starter, growth, pro]. Review/confirm. */
export const comparison: { label: string; values: (boolean | string)[] }[] = [
  { label: "Fully custom design (no templates)", values: [true, true, true] },
  { label: "Pages included", values: ["Up to 3", "Up to 7", "Unlimited"] },
  { label: "Mobile-first & performance-tuned", values: [true, true, true] },
  { label: "Contact form & click-to-call", values: [true, true, true] },
  { label: "On-page SEO", values: ["Basic", "Advanced", "Advanced+"] },
  { label: "Copywriting support", values: [false, true, true] },
  { label: "Analytics & conversion tracking", values: [false, true, true] },
  { label: "Blog / services structure", values: [false, true, true] },
  { label: "Bookings, integrations, dynamic content", values: [false, false, true] },
  { label: "Ongoing updates & priority support", values: [false, false, true] },
  { label: "Quarterly strategy reviews", values: [false, false, true] },
  { label: "You own all files & code", values: [true, true, true] },
];

/* DRAFT — pricing FAQ. Review/expand as needed. */
export const faq = [
  {
    q: "How long does a website take?",
    a: "You'll see a first design preview within about 4 working days of sending us your content. From there we refine it together with your feedback. Most Starter sites launch in 7–14 days and Growth in 10–18 days; Pro timelines depend on scope and we'll give you a clear schedule up front.",
  },
  {
    q: "Do I own the website?",
    a: "Always. We hand over all files and code. Even on a managed plan, if you ever leave, the site is yours to keep — no hostage situations.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Start with Starter and move up whenever you're ready — we credit your previous payments toward the new plan.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your logo (if you have one), a sense of your goals, and any text or photos you'd like to feature. No content ready? We'll guide you and can help write it.",
  },
  {
    q: "Are there ongoing fees?",
    a: "One-time plans are one-time. Hosting and domain are low monthly costs you control. Pro includes managed updates if you want a hands-off partner.",
  },
];
