"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { WidgetStats } from "@/sanity/types";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/utils";

function WidgetCard({ widgetStats }: { widgetStats: WidgetStats }) {
  return (
    <div className="bg-ink rounded-[14px] p-[22px] shadow-[0_26px_62px_-20px_rgba(20,19,15,.5)]">
      <div className="flex items-center justify-between">
        <span className="text-paper-58 font-mono text-[10.5px] font-medium tracking-[.08em] uppercase">
          Client rating
        </span>
        <span className="text-accent font-mono text-[10.5px] font-medium">Upwork</span>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <span className="font-display text-paper text-[62px] leading-[.9] tracking-[-.02em]">
          {widgetStats.rating}
        </span>
        <span className="text-paper-58 pb-[9px] font-mono text-[13px]">/ 5.00</span>
      </div>
      <Stars rating={5} className="text-accent mt-3 text-base tracking-[.16em]" />
      <div className="mt-[18px] flex flex-col gap-[9px]">
        <div className="flex items-center justify-between">
          <span className="text-paper-58 font-mono text-xs">Reviews</span>
          <span className="text-paper font-mono text-xs font-medium">{widgetStats.reviews}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-paper-58 font-mono text-xs">Job success</span>
          <span className="text-paper font-mono text-xs font-medium">{widgetStats.jobSuccess}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-paper-58 font-mono text-xs">On-time delivery</span>
          <span className="text-paper font-mono text-xs font-medium">
            {widgetStats.onTimeDelivery}
          </span>
        </div>
      </div>
    </div>
  );
}

function WidgetChip({ widgetStats, className }: { widgetStats: WidgetStats; className?: string }) {
  return (
    <div
      className={cn(
        "bg-paper border-ink-10 rounded-[11px] border px-[15px] py-[11px] shadow-[0_14px_34px_-14px_rgba(20,19,15,.3)]",
        className
      )}
    >
      <div className="text-ink-62 font-mono text-[10px] font-medium tracking-[.07em] uppercase">
        {widgetStats.shippedCaption}
      </div>
      <div className="font-display text-ink mt-[3px] text-[26px] leading-none">
        {widgetStats.shippedValue}
      </div>
    </div>
  );
}

export function RatingWidget({ widgetStats }: { widgetStats: WidgetStats }) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      if (floatRef.current) {
        gsap.to(floatRef.current, {
          y: -10,
          rotate: -1.4,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (chipRef.current) {
        gsap.to(chipRef.current, {
          y: -8,
          rotate: 2,
          duration: 4.25,
          delay: 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: parallaxRef }
  );

  return (
    <>
      {/* Desktop: absolute, overlapping the masthead, with the chip hanging off the corner */}
      <div
        ref={parallaxRef}
        className="absolute top-[132px] right-11 z-[3] hidden w-[300px] lg:block"
      >
        <div ref={floatRef} className="relative" style={{ transform: "rotate(-2.4deg)" }}>
          <WidgetCard widgetStats={widgetStats} />
          <div ref={chipRef} className="absolute -bottom-6 -left-[34px]" style={{ transform: "rotate(3deg)" }}>
            <WidgetChip widgetStats={widgetStats} />
          </div>
        </div>
      </div>

      {/* Tablet/mobile: de-absoluted, full width up to 360px, chip inline, no rotation */}
      <div className="mt-10 flex flex-wrap items-start gap-4 lg:hidden">
        <div className="w-full max-w-[360px]">
          <WidgetCard widgetStats={widgetStats} />
        </div>
        <WidgetChip widgetStats={widgetStats} />
      </div>
    </>
  );
}
