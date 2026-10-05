import type { ProgramCardProps } from "./ProgramCard";

export type PlanFeature = {
  /** Keys into PLAN_ICONS in PlanDetails. */
  icon: "unlimited" | "credits" | "workout" | "athome";
  title: string;
  detail: string;
};

export type ProgramReview = {
  body: string;
  /** Omitted while the copy is outstanding, so the card renders as a plain
      placeholder rather than an unattributed quote. */
  author?: {
    /** Figma masks these, e.g. "S***d* Sh****". */
    name: string;
    when: string;
    rating: string;
  };
};

export type ProgramDetails = {
  /** Top bar title, e.g. "Cultfit Pass Pro" — shorter than the page heading
      and distinct from the card's name. */
  headerTitle: string;
  /** Page heading, e.g. "Cultfit Pass Pro- 12 Months". */
  title: string;
  banner: { src: string; alt: string };
  features: PlanFeature[];
  terms: string[];
  bill: { lines: { label: string; amount: string }[]; total: string } | null;
  reviews: ProgramReview[];
  /** Sticky buy bar. */
  buy: { was: string; discount: string; now: string } | null;
};

export type Program = {
  slug: string;
  card: ProgramCardProps;
  details: ProgramDetails;
};

/**
 * Figma specifies the details page (1050:14678) for Cult Pro only. The other
 * two carry their real banner, title and card pricing; their plan features,
 * terms, bill breakdown and reviews are empty pending real copy, and the page
 * renders only the sections that have content rather than inventing any.
 */
export const PROGRAMS: Program[] = [
  {
    slug: "cult-pro",
    card: {
      banner: {
        src: "/programs/banner-cult-pro.webp",
        alt: "By partner cult.fit Pro",
      },
      offer: { was: "₹14,092", now: "₹9,297" },
      highlight: {
        label: "Most Popular",
        detail: "Bought by 8K+ people last month",
        tone: "purple",
      },
      name: "Cult Pro + OnePass",
      duration: "12 months",
      price: "₹9,297 (including taxes)",
      href: "/programs/cult-pro",
    },
    details: {
      headerTitle: "Cultfit Pass Pro",
      title: "Cultfit Pass Pro- 12 Months",
      banner: {
        src: "/programs/details-cult-pro.webp",
        alt: "By partner cult.fit Pro",
      },
      features: [
        { icon: "unlimited", title: "Unlimited Access", detail: "to all PRO gyms" },
        {
          icon: "credits",
          title: "Free Credits",
          detail: "to access ELITE gyms and group classes",
        },
        {
          icon: "workout",
          title: "Smart Workout Plan",
          detail: "customized for your fitness goals",
        },
        {
          icon: "athome",
          title: "At-home Live Workout",
          detail: "track your calorie burn and more",
        },
      ],
      terms: [
        "Membership are non-refundable and non-transferable.",
        "The package will be activated within 3-5 working days.",
        "Payments once made are non-refundable.",
      ],
      // Figma's numbers, reproduced verbatim as agreed. Note they disagree
      // with the card (₹9,297) and with the buy bar (₹8,000); only this block
      // is internally consistent, since 8,572 + 428 = 9,000.
      bill: {
        lines: [
          { label: "Original Price", amount: "10,000" },
          { label: "MediBuddy Price", amount: "8,572" },
          { label: "Taxes", amount: "428" },
        ],
        total: "9,000",
      },
      // PLACEHOLDER. The first entry is Figma's literal copy, but it
      // describes a doctor consultation, not a gym plan — it has clearly
      // been pasted in from another MediBuddy surface. The rest carry no
      // author for the same reason the landing page's do not: an invented
      // testimonial attributed to an invented person is a false claim, not
      // a placeholder. Figma's four pagination dots set the count.
      reviews: [
        {
          body:
            "The doctor is reserved won't explain the issue unless you ask it clearly. The best part that I liked is he does not mislead or misdirect, I already did extensii...",
          author: {
            name: "S***d* Sh****",
            when: "Few days ago",
            rating: "Good",
          },
        },
        { body: "[Review copy pending]" },
        { body: "[Review copy pending]" },
        { body: "[Review copy pending]" },
      ],
      // Also verbatim: 23% off ₹10,000 is ₹7,700, not ₹8,000.
      buy: { was: "10,000", discount: "23% OFF", now: "₹8,000" },
    },
  },
  {
    slug: "fitpass",
    card: {
      banner: { src: "/programs/banner-fitpass.webp", alt: "By partner FITPASS" },
      offer: { was: "₹20,949", now: "₹9999*", period: "/year" },
      highlight: {
        label: "Cost Effective",
        detail: "Bought by 3K+ people last month",
        tone: "orange",
      },
      name: "FITPASS",
      duration: "12 months",
      price: "₹10,724 (including taxes)",
      href: "/programs/fitpass",
    },
    details: {
      headerTitle: "FITPASS",
      title: "FITPASS- 12 Months",
      banner: { src: "/programs/details-fitpass.webp", alt: "By partner FITPASS" },
      features: [],
      terms: [],
      bill: null,
      reviews: [],
      buy: null,
    },
  },
  {
    slug: "cult-elite",
    card: {
      banner: {
        src: "/programs/banner-cult-elite.webp",
        alt: "By partner cult.fit Elite",
      },
      offer: { was: "₹14,092", now: "₹9,297" },
      name: "Cult Elite",
      duration: "12 months",
      price: "₹15,225 (including taxes)",
      href: "/programs/cult-elite",
    },
    details: {
      headerTitle: "Cult Elite",
      title: "Cult Elite- 12 Months",
      banner: {
        src: "/programs/details-cult-elite.webp",
        alt: "By partner cult.fit Elite",
      },
      features: [],
      terms: [],
      bill: null,
      reviews: [],
      buy: null,
    },
  },
];

export function findProgram(slug: string) {
  return PROGRAMS.find((p) => p.slug === slug);
}
