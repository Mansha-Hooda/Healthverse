"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { IconAdd01, IconCancel01 } from "@/components/icons/buy-sheet";
import { Avatar } from "@/components/site/reviews/Avatar";
import { BottomSheet } from "@/components/ui/BottomSheet";

export type Beneficiary = {
  name: string;
  /** Figma renders these as "Self | 30 | F". */
  relation: string;
  age: string;
  gender: string;
  avatar: string;
  /** Purple corner badge; only shown when set. */
  badge?: string;
};

/**
 * PLACEHOLDER. Figma (1050:14266) draws two people with these exact details.
 * They are clearly sample data — replace with the signed-in user's real
 * beneficiaries.
 */
const BENEFICIARIES: Beneficiary[] = [
  {
    name: "Supriya Rathi",
    relation: "Self",
    age: "30",
    gender: "F",
    avatar: "/reviews/avatar-placeholder.svg",
    badge: "Sponsored",
  },
  {
    name: "Ramesh Gaikwad",
    relation: "Brother",
    age: "30",
    gender: "M",
    avatar: "/reviews/avatar-alt.svg",
    badge: "Sponsored",
  },
];

const DEFAULT_MOBILE = "8897137606";
const DEFAULT_EMAIL = "rameshgaikwad@gmail.com";

/**
 * A required field's label, with Figma's red asterisk.
 *
 * Figma also places an info glyph after each label, but that node carries
 * `opacity: 0` — the designer hid it, and it renders as nothing in Figma's
 * own export. Omitted rather than reproduced as an invisible 16px box that
 * would only shift the row.
 */
function FieldLabel({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="m-title-m-medium text-textcolor-grey-900-primary"
    >
      {children}
      <span className="text-red-600">*</span>
    </label>
  );
}

/** User Details — Figma node 1050:14266, opened by the details page's Buy Now. */
export function UserDetailsSheet({
  slug,
  onDismiss,
}: {
  slug: string;
  onDismiss: () => void;
}) {
  const router = useRouter();
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [mobile, setMobile] = useState(DEFAULT_MOBILE);
  const [email, setEmail] = useState(DEFAULT_EMAIL);

  return (
    <BottomSheet
      labelledBy={`${id}-title`}
      onDismiss={onDismiss}
      dismissOnOutsideClick
    >
      <div className="flex min-h-0 flex-1 flex-col gap-xl overflow-y-auto px-xl">
        <div className="flex flex-col gap-xl">
          <div className="flex items-center gap-2xl">
            <h2
              id={`${id}-title`}
              className="m-title-l-semibold flex-1 truncate text-textcolor-grey-900-primary"
            >
              User Details
            </h2>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Close"
              className="shrink-0"
            >
              <IconCancel01 className="size-5 text-textcolor-grey-900-primary" />
            </button>
          </div>
          <span aria-hidden className="h-px w-full bg-border-secondary" />
        </div>

        {/* min-w-0 is load-bearing: a fieldset defaults to
            `min-width: min-content`, so without it the two 244px cards force
            it to 512px and the whole sheet gains a horizontal scrollbar. */}
        <fieldset className="flex min-w-0 flex-col gap-lg">
          <div className="flex items-center justify-between">
            <legend className="m-title-m-medium float-left text-textcolor-grey-900-primary">
              Who is it for?<span className="text-red-600">*</span>
            </legend>
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-sm rounded-sm px-lg py-md drop-shadow-xs"
            >
              <span className="m-title-m-semibold text-brand-blue-700">
                Add
              </span>
              <IconAdd01 className="size-4 shrink-0 text-brand-blue-700" />
            </button>
          </div>

          {/* 244px cards in the 328px content width, so the next one peeks.
              Deliberately NOT bled to the screen edge the way the review
              carousels are: this sits inside the sheet's scroll container, so
              a negative margin there overflows the sheet itself rather than
              just painting past the gutter. */}
          <div className="flex gap-md overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BENEFICIARIES.map((person, i) => {
              const active = i === selected;
              return (
                <label
                  key={person.name}
                  className={`relative flex w-[244px] shrink-0 items-center gap-lg overflow-clip rounded-md bg-base-white px-xl py-2xl shadow-elevation-1 inset-ring-1 ${
                    active
                      ? "inset-ring-brand-blue-600"
                      : "inset-ring-gray-light-mode-50"
                  }`}
                >
                  <Avatar size={40} src={person.avatar} />

                  <span className="flex min-w-0 flex-1 flex-col justify-center gap-xs">
                    <span
                      className={`truncate ${active ? "m-title-m-semibold text-textcolor-grey-900-primary" : "m-title-m-medium text-textcolor-grey-700-secondary"}`}
                    >
                      {person.name}
                    </span>
                    <span className="m-body-s-regular flex items-center gap-xs text-textcolor-grey-700-secondary">
                      <span>{person.relation}</span>
                      <span>|</span>
                      <span>{person.age}</span>
                      <span className="truncate">{person.gender}</span>
                    </span>
                  </span>

                  <input
                    type="radio"
                    name={`${id}-who`}
                    checked={active}
                    onChange={() => setSelected(i)}
                    className="sr-only"
                  />
                  {/* Figma's radio: filled brand circle with a white dot when
                      on, a 1px grey ring when off. */}
                  <span
                    aria-hidden
                    className={`grid size-5 shrink-0 place-items-center rounded-full ${
                      active
                        ? "bg-brand-blue-600"
                        : "inset-ring-1 inset-ring-gray-light-mode-300"
                    }`}
                  >
                    {active && (
                      <span className="size-2 rounded-full bg-base-white" />
                    )}
                  </span>

                  {person.badge && (
                    <span className="m-caption-xs-regular absolute top-0 right-0 rounded-tr-md rounded-bl-md bg-purple-50 px-xl py-xxs text-purple-700">
                      {person.badge}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        <span
          aria-hidden
          className="h-px w-full border-t border-dashed border-gray-light-mode-100"
        />

        <div className="flex flex-col gap-3xl">
          <div className="flex flex-col gap-lg">
            <FieldLabel htmlFor={`${id}-mobile`}>Mobile Number</FieldLabel>
            <div className="flex h-11 w-full items-center gap-lg rounded-md bg-base-white px-[0.875rem] py-[0.625rem] drop-shadow-xs inset-ring-1 inset-ring-gray-light-mode-300">
              <span className="m-body-m-regular shrink-0 text-textcolor-grey-700-secondary">
                +91
              </span>
              <input
                id={`${id}-mobile`}
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                className="m-body-m-regular min-w-0 flex-1 bg-transparent text-textcolor-grey-900-primary outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-lg">
            <FieldLabel htmlFor={`${id}-email`}>E-mail ID</FieldLabel>
            <div className="flex h-11 w-full items-center gap-md rounded-md bg-base-white px-[0.875rem] py-[0.625rem] drop-shadow-xs inset-ring-1 inset-ring-gray-light-mode-300">
              <input
                id={`${id}-email`}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="m-body-m-regular min-w-0 flex-1 bg-transparent text-textcolor-grey-900-primary outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3xl flex w-full shrink-0 items-center gap-md bg-base-white px-xl py-xs">
        <button
          type="button"
          onClick={() => router.push(`/programs/${slug}/payment`)}
          className="flex flex-1 items-center justify-center gap-sm rounded-md bg-brand-blue-600 px-xl py-md shadow-xs"
        >
          <span className="m-title-m-semibold py-xxs text-base-white">
            Continue
          </span>
        </button>
      </div>
    </BottomSheet>
  );
}
