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
  // DUMMY contact details — replace with real ones.
  email: "hello@invotica.com",
  phone: "+1 (000) 000-0000",
  location: "Canada-wide · Remote",
  founder: "Alex Morgan", // DUMMY founder name
  // Web3Forms access key — paste your real key from https://web3forms.com (free).
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
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
  { big: "3 Days", small: "From brief to live" },
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
    tiers: "Starter & Growth",
    body: "A customer hears about your business or walks past your shop. They Google you. Your site is clean, fast, and professional — and they tap to call or message you directly.",
  },
  trusted: {
    tagline: "about being trusted & scaled",
    tiers: "Pro",
    body: "A client needs a service that requires real trust — renovation, legal, medical, consulting. They spend time reading about you before they ever reach out. Pro gives them everything they need to say yes.",
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

export interface Plan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  teaser: string;
  best: string;
  features: string[];
  featured?: boolean;
}

/* DRAFT pricing — confirm prices & feature lists. Teasers come from the brief;
   feature lists are a reasonable first draft to be reviewed. */
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "from $999",
    cadence: "CAD · one-time",
    teaser:
      "You need to get online, look professional, and make it easy for customers to reach you — without a big spend.",
    best: "Best for: getting found",
    features: [
      "Up to 3 pages, fully custom design",
      "Mobile-first & lightning fast",
      "Click-to-call / message + contact form",
      "Google Business + basic on-page SEO",
      "Domain connection & launch",
      "You own all files & code",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "from $1,499",
    cadence: "CAD · one-time",
    teaser:
      "Your business is growing. You need a site that earns trust, ranks on Google, and drives real enquiries.",
    best: "Best for: being chosen",
    featured: true,
    features: [
      "Up to 7 pages, fully custom design",
      "Everything in Starter, plus:",
      "Advanced SEO & performance tuning",
      "Copywriting support & lead-capture forms",
      "Analytics & conversion tracking setup",
      "Blog / services structure ready to grow",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Custom",
    cadence: "tailored to scope",
    teaser:
      "You need something custom — bookings, dynamic features, weekly updates, or an ongoing partner who handles it all.",
    best: "Best for: being trusted & scaled",
    features: [
      "Unlimited pages & custom features",
      "Bookings, integrations, dynamic content",
      "Ongoing updates & priority support",
      "Dedicated partner, response in hours",
      "Quarterly strategy & growth reviews",
      "Everything in Growth, fully managed",
    ],
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

/* DRAFT — pricing FAQ. Review/expand as needed. */
export const faq = [
  {
    q: "How long does a website take?",
    a: "Most Starter and Growth sites go from brief to live in about 3 working days once we have your content. Pro timelines depend on scope and we'll give you a clear schedule up front.",
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
