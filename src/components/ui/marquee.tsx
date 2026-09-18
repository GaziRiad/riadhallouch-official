"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Seamless GSAP x-loop at a constant px/sec speed (not a fixed duration),
 * so pace feels consistent regardless of content width or viewport.
 * Paused on hover/focus-within and while offscreen.
 */
export function Marquee({
  children,
  speed = 60,
  gap = 40,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  speed?: number;
  gap?: number;
  className?: string;
  trackClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!trackRef.current || !rootRef.current || !halfRef.current || prefersReducedMotion()) {
        return;
      }

      const root = rootRef.current;
      const track = trackRef.current;
      const half = halfRef.current;
      let tween: gsap.core.Tween | null = null;

      const build = () => {
        tween?.kill();
        // The loop distance is one half's width plus the track's own gap
        // (the seam between the two halves) — without adding that seam gap
        // here, the two duplicated sets would touch with no spacing at the
        // loop point.
        const loopDistance = half.getBoundingClientRect().width + gap;
        if (!loopDistance) return;
        gsap.set(track, { x: 0 });
        tween = gsap.to(track, {
          x: -loopDistance,
          duration: loopDistance / speed,
          ease: "none",
          repeat: -1,
        });
      };

      build();

      const ro = new ResizeObserver(() => build());
      ro.observe(half);

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tween?.play();
          else tween?.pause();
        },
        { threshold: 0 }
      );
      io.observe(root);

      const pause = () => tween?.pause();
      const resume = () => tween?.play();
      root.addEventListener("mouseenter", pause);
      root.addEventListener("mouseleave", resume);
      root.addEventListener("focusin", pause);
      root.addEventListener("focusout", resume);

      return () => {
        ro.disconnect();
        io.disconnect();
        tween?.kill();
        root.removeEventListener("mouseenter", pause);
        root.removeEventListener("mouseleave", resume);
        root.removeEventListener("focusin", pause);
        root.removeEventListener("focusout", resume);
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn("flex w-max", trackClassName)}
        style={{ gap: `${gap}px` }}
      >
        <div ref={halfRef} className="flex shrink-0 items-stretch" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-stretch" aria-hidden="true" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
