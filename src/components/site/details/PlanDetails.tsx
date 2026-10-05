import {
  IconPlanAtHome,
  IconPlanCredits,
  IconPlanUnlimited,
  IconPlanWorkout,
} from "@/components/icons/program-details";
import type { PlanFeature } from "@/components/site/programs/catalog";

/** The 40px icons carry their own tinted backdrop, straight from Figma. */
const PLAN_ICONS = {
  unlimited: IconPlanUnlimited,
  credits: IconPlanCredits,
  workout: IconPlanWorkout,
  athome: IconPlanAtHome,
} as const;

/** Plan Details — Figma node 1050:14703. */
export function PlanDetails({ features }: { features: PlanFeature[] }) {
  return (
    <section aria-labelledby="plan-details" className="flex flex-col gap-xl">
      <h2
        id="plan-details"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        Plan Details
      </h2>
      <ul className="flex flex-col gap-lg">
        {features.map((feature) => {
          const Icon = PLAN_ICONS[feature.icon];
          return (
            <li
              key={feature.title}
              className="flex w-full items-center gap-md py-px"
            >
              <Icon className="size-10 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="m-title-s-medium text-textcolor-grey-900-primary">
                  {feature.title}
                </p>
                <p className="m-body-s-regular text-textcolor-grey-700-secondary">
                  {feature.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
