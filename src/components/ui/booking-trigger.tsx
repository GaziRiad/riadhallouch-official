"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() =>
  import("./booking-modal").then((mod) => mod.BookingModal)
);

/**
 * Renders its children as the click target and lazy-loads the booking
 * modal (and its iframe) only on first click — never in the initial bundle.
 */
export function BookingTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open ? <BookingModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
