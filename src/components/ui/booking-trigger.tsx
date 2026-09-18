"use client";

import { openBooking } from "@/lib/cal";
import { cn } from "@/lib/utils";

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
    <button
      type="button"
      onClick={() => openBooking()}
      className={cn("cursor-pointer transition-transform duration-200 active:scale-[0.97]", className)}
    >
      {children}
    </button>
  );
}
