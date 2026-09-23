import {
  ART_CULT,
  ART_FITPASS,
} from "@/components/site/programs/constants";
import {
  ProgramCard,
  type ProgramCardProps,
} from "@/components/site/programs/ProgramCard";

const CULT_LOGO = {
  src: "/programs/cultfit-logo.png",
  width: 66.722,
  height: 25.121,
  alt: "cult.fit",
};

const PROGRAMS: ProgramCardProps[] = [
  {
    theme: "cyan",
    partner: { logo: CULT_LOGO, tier: "Pro" },
    name: "Cult Pro + OnePass",
    duration: "12 months",
    price: "₹9,297 (including taxes)",
    art: ART_CULT,
    partnerOffset: 0.44,
  },
  {
    theme: "pink",
    partner: {
      logo: {
        src: "/programs/fitpass-logo.png",
        width: 102.292,
        height: 16,
        alt: "FITPASS",
      },
    },
    name: "FITPASS",
    duration: "12 months",
    price: "₹10,724 (including taxes)",
    art: ART_FITPASS,
  },
  {
    theme: "purple",
    partner: { logo: CULT_LOGO, tier: "Elite" },
    name: "Cult Elite",
    duration: "12 months",
    price: "₹15,225 (including taxes)",
    art: ART_CULT,
    partnerOffset: 0.44,
  },
];

/** Featured Programs — Figma node 1050:6683. */
export function FeaturedPrograms() {
  return (
    <section
      aria-labelledby="featured-programs"
      className="flex flex-col gap-xl px-xl pt-4xl"
    >
      <h2
        id="featured-programs"
        className="text-style-md font-semibold text-text-primary"
      >
        Featured Programs
      </h2>

      <div className="flex flex-col gap-2xl">
        {PROGRAMS.map((program) => (
          <ProgramCard key={program.name} {...program} />
        ))}

        {/* Inset ring rather than a border, so the button stays 44px tall —
            Figma draws its stroke inside the frame. */}
        <a
          href="#"
          className="flex w-full items-center justify-center gap-sm rounded-md bg-bg-primary px-xl py-[10px] shadow-figma-xs inset-ring-1 inset-ring-blue-300"
        >
          <span className="px-xxs text-style-md font-semibold text-brand">
            See All
          </span>
        </a>
      </div>
    </section>
  );
}
