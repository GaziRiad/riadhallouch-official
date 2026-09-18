"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/data/site";

export function BookingModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
      className="bg-ink/50 fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper relative h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking dialog"
          className="border-ink-10 text-ink bg-paper absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border"
        >
          <X className="h-4 w-4" />
        </button>
        <iframe
          src={`${siteConfig.bookingUrl}?embed=true&theme=light`}
          title="Book a call"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
