import { notFound } from "next/navigation";
import { PROGRAMS, findProgram } from "@/components/site/programs/catalog";
import { PaymentHandoff } from "@/components/site/details/PaymentHandoff";

export function generateStaticParams() {
  return PROGRAMS.map(({ slug }) => ({ slug }));
}

/**
 * Stand-in for the third-party payment screen.
 *
 * There is no Figma node for this step and there cannot be one — it is the
 * provider's own hosted page, outside our control and our design system. This
 * route exists so the flow is walkable end to end: it holds for a moment, as
 * a real redirect would, then lands on the confirmation screen. Replace the
 * whole route with the provider's SDK handoff when there is one.
 */
export default async function PaymentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = findProgram(slug);
  if (!program) notFound();

  return <PaymentHandoff slug={slug} amount={program.details.buy?.now ?? ""} />;
}
