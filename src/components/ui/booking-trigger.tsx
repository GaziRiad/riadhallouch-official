"use client";

import { openBooking } from "@/lib/cal";

/**
 * Renders its children as the click target and opens the Cal.com booking
 * modal. The embed SDK is lazy-loaded on first click (see src/lib/cal.ts) —
 * never in the initial bundle.
 */
export function BookingTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openBooking()} className={className}>
      {children}
    </button>
  );
}
