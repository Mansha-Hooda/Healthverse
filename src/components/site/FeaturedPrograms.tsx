import { ProgramCard } from "@/components/site/programs/ProgramCard";
import { PROGRAMS } from "@/components/site/programs/catalog";

/** Featured Programs — Figma node 1050:6683; the card list is 1050:6689. */
export function FeaturedPrograms() {
  return (
    <section
      aria-labelledby="featured-programs"
      className="flex flex-col gap-xl pt-4xl"
    >
      <h2
        id="featured-programs"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        Featured Programs
      </h2>

      <div className="flex flex-col gap-xl">
        {PROGRAMS.map(({ slug, card }) => (
          <ProgramCard key={slug} {...card} />
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
