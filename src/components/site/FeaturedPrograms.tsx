import {
  ProgramCard,
  type ProgramCardProps,
} from "@/components/site/programs/ProgramCard";

const PROGRAMS: ProgramCardProps[] = [
  {
    banner: {
      src: "/programs/banner-cult-pro.webp",
      alt: "By partner cult.fit Pro",
    },
    name: "Cult Pro + OnePass",
    duration: "12 months",
    price: "₹9,297 (including taxes)",
  },
  {
    banner: {
      src: "/programs/banner-fitpass.webp",
      alt: "By partner FITPASS",
    },
    name: "FITPASS",
    duration: "12 months",
    price: "₹10,724 (including taxes)",
  },
  {
    banner: {
      src: "/programs/banner-cult-elite.webp",
      alt: "By partner cult.fit Elite",
    },
    name: "Cult Elite",
    duration: "12 months",
    price: "₹15,225 (including taxes)",
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
        className="m-title-l-semibold text-textcolor-grey-900-primary"
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
          className="flex w-full items-center justify-center gap-sm rounded-md bg-button-secondary-bg px-xl py-[10px] shadow-xs inset-ring-1 inset-ring-button-secondary-border"
        >
          <span className="body-s-semibold px-xxs text-button-secondary-fg">
            See All
          </span>
        </a>
      </div>
    </section>
  );
}
