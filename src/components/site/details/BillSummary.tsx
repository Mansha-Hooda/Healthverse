import { Collapsible } from "./Collapsible";
import type { ProgramDetails } from "@/components/site/programs/catalog";

type Bill = NonNullable<ProgramDetails["bill"]>;

/**
 * Bill Summary — Figma node 1163:26027.
 *
 * Figma splits every amount into a fixed-width ₹ and the digits so the column
 * aligns; `tabular-nums` does the same job without the extra element.
 */
export function BillSummary({ bill }: { bill: Bill }) {
  return (
    <Collapsible title="Bill Summary">
      <dl className="flex flex-col gap-lg">
        {bill.lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between">
            <dt className="m-body-s-regular text-textcolor-grey-900-primary">
              {line.label}
            </dt>
            <dd className="m-title-m-medium tabular-nums text-textcolor-grey-900-primary">
              ₹{line.amount}
            </dd>
          </div>
        ))}

        <span
          aria-hidden
          className="h-px w-full border-t border-dashed border-gray-light-mode-100"
        />

        <div className="flex items-center justify-between">
          <dt className="m-body-s-regular text-textcolor-grey-900-primary">
            Total Amount
          </dt>
          <dd className="m-title-l-semibold tabular-nums text-textcolor-grey-900-primary">
            ₹{bill.total}
          </dd>
        </div>
      </dl>
    </Collapsible>
  );
}
