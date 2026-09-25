import type { IconProps } from "@/components/icons/how-it-works";
import {
  IconCouponPercent,
  IconInvoice01,
  IconSearch01,
} from "@/components/icons/how-it-works";
import { STEP_PATTERN } from "@/components/site/how-it-works/constants";

type Step = {
  label: string;
  description: string;
  Icon: (props: IconProps) => React.JSX.Element;
  /** Describes the glyph for assistive tech, since the label is just "STEP n". */
  iconLabel: string;
};

const STEPS: Step[] = [
  {
    label: "STEP 1",
    description: "Select city to view offers near you",
    Icon: IconSearch01,
    iconLabel: "Search",
  },
  {
    label: "STEP 2",
    description: "Choose from the best of the best offers",
    Icon: IconCouponPercent,
    iconLabel: "Offers",
  },
  {
    label: "STEP 3",
    description: "Pay and start your fitness journey",
    Icon: IconInvoice01,
    iconLabel: "Pay",
  },
];

/** How It Works — Figma node 1050:6818. */
export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works"
      className="flex flex-col gap-xl px-xl pt-4xl"
    >
      <h2
        id="how-it-works"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        How It Works
      </h2>

      {/* The row is 330px against a 328px content box, so it runs 2px past
          the right gutter — matching the Figma frame, where the steps sit at
          x=16 with a 14px right margin. */}
      <ol className="flex items-stretch gap-lg">
        {STEPS.map(({ label, description, Icon, iconLabel }) => (
          <li
            key={label}
            /* Inset ring, not a border: Figma draws the stroke inside the
               frame, so a border would eat 2px of the 102px box and wrap the
               description onto an extra line. */
            className="relative flex w-[102px] shrink-0 flex-col gap-xl overflow-clip rounded-md px-md py-lg inset-ring-1 inset-ring-creatives-banners-cyan-surface"
          >
            <span
              aria-hidden
              className="absolute bg-no-repeat"
              style={{
                left: `${STEP_PATTERN.left}px`,
                top: `${STEP_PATTERN.top}px`,
                width: `${STEP_PATTERN.width}px`,
                height: `${STEP_PATTERN.height}px`,
                backgroundImage: `url(${STEP_PATTERN.src})`,
                backgroundSize: `${STEP_PATTERN.width}px ${STEP_PATTERN.height}px`,
              }}
            />

            <Icon
              className="relative size-8 shrink-0 text-creatives-banners-cyan-tag"
              label={iconLabel}
            />

            <span className="relative flex flex-col gap-xxs">
              <span className="m-label-s-medium text-textcolor-grey-500-disabled">
                {label}
              </span>
              <span className="m-body-s-regular text-textcolor-grey-900-primary">
                {description}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
