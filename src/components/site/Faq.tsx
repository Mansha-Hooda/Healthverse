"use client";

import { useId, useState } from "react";
import { IconChevronDown } from "@/components/icons/faq";

type FaqEntry = {
  question: string;
  answer: string;
};

/**
 * PLACEHOLDER — replace before launch.
 *
 * Only the first answer exists in the design. The other four are awaiting
 * copy and are marked below rather than invented: they are statements of
 * MediBuddy policy (refunds, cancellation, corporate wallet, checkup
 * preparation) that have to come from the business, not from a guess.
 */
const ANSWER_PENDING = "[Answer copy pending]";

const FAQS: FaqEntry[] = [
  {
    question:
      "How long does it take to activate the subscription after payment?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  { question: "What is the refund policy?", answer: ANSWER_PENDING },
  {
    question: "Can I use my corporate wallet as a mode of payment?",
    answer: ANSWER_PENDING,
  },
  {
    question: "What if I want to cancel my subscription?",
    answer: ANSWER_PENDING,
  },
  {
    question: "What should I do before a Health Checkup?",
    answer: ANSWER_PENDING,
  },
];

/** FAQ — Figma node 1050:6950. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelPrefix = useId();

  return (
    <section
      aria-labelledby="faq"
      className="flex flex-col gap-xl px-xl pt-4xl"
    >
      <h2
        id="faq"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        Frequently Asked Questions
      </h2>

      <ul className="flex flex-col gap-lg">
        {FAQS.map(({ question, answer }, index) => {
          const isOpen = openIndex === index;
          const panelId = `${panelPrefix}-panel-${index}`;

          return (
            <li
              key={question}
              /* Every row but the first carries a divider above it, with the
                 24px of breathing room inside the row. The rule is drawn as
                 an inset shadow rather than a border: Figma keeps the stroke
                 inside the frame, so a border would add 1px to each row's
                 auto height. */
              className={
                index === 0
                  ? ""
                  : "pt-3xl shadow-[inset_0_1px_0_0_var(--color-border-secondary)]"
              }
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start gap-md text-left"
              >
                <span className="m-title-s-semibold flex-1 text-textcolor-grey-700-secondary">
                  {question}
                </span>
                <span className="shrink-0 pt-xxs">
                  <IconChevronDown
                    className={`size-6 text-brand-blue-600 transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {isOpen && (
                /* 32px right inset keeps the answer in the same column as the
                   question: 8px gap plus the 24px chevron. */
                <div id={panelId} className="mt-md pr-4xl">
                  <p className="m-body-s-regular text-textcolor-grey-700-secondary">
                    {answer}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
