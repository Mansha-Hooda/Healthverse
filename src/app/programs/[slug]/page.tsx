import Image from "next/image";
import { notFound } from "next/navigation";
import { BillSummary } from "@/components/site/details/BillSummary";
import { BuyBar } from "@/components/site/details/BuyBar";
import { Collapsible } from "@/components/site/details/Collapsible";
import { DetailsHeader } from "@/components/site/details/DetailsHeader";
import { DetailsReviews } from "@/components/site/details/DetailsReviews";
import { PlanDetails } from "@/components/site/details/PlanDetails";
import { PROGRAMS, findProgram } from "@/components/site/programs/catalog";
import { CityPicker } from "@/components/city/CityPicker";

export function generateStaticParams() {
  return PROGRAMS.map(({ slug }) => ({ slug }));
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = findProgram(slug);
  if (!program) notFound();

  const { details } = program;

  return (
    <>
      <DetailsHeader title={details.headerTitle} />

      {/* pb-40 keeps the last element clear of the sticky bar. */}
      <main className="flex flex-col gap-3xl px-xl pt-3xl pb-40">
        <div className="flex flex-col gap-xl">
          <Image
            src={details.banner.src}
            alt={details.banner.alt}
            width={984}
            height={336}
            sizes="328px"
            priority
            className="h-28 w-[328px] rounded-md"
          />
          <div className="flex w-full items-center gap-xl">
            <h1 className="m-title-l-semibold flex-1 text-textcolor-grey-900-primary">
              {details.title}
            </h1>
            <CityPicker />
          </div>
        </div>

        {details.features.length > 0 && (
          <PlanDetails features={details.features} />
        )}

        {details.terms.length > 0 && (
          <Collapsible title="Terms and Conditions">
            <ol className="m-body-s-regular flex list-decimal flex-col gap-md ps-[18px] text-textcolor-grey-700-secondary">
              {details.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ol>
          </Collapsible>
        )}

        {details.bill && <BillSummary bill={details.bill} />}

        {details.reviews.length > 0 && (
          <DetailsReviews reviews={details.reviews} />
        )}

        <a
          href="tel:"
          className="flex w-full items-center justify-center gap-sm rounded-md bg-base-white px-xl py-md text-brand-blue-600 shadow-xs inset-ring-1 inset-ring-brand-blue-300"
        >
          {/* Figma's button nests a 2px vertical "Text padding" frame inside
              the 8px one, which is what makes the control 40px rather than 36. */}
          <span className="m-title-m-semibold py-xxs">
            Still Have Questions? Call Us
          </span>
        </a>
      </main>

      {details.buy && <BuyBar buy={details.buy} slug={slug} />}
    </>
  );
}
