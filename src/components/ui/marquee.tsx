"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Seamless GSAP x-loop: duplicated track, paused on hover/focus-within and
 * while offscreen, with a brief speed-up while the page is being scrolled.
 */
export function Marquee({
  children,
  duration = 26,
  gap = 40,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  duration?: number;
  gap?: number;
  className?: string;
  trackClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!trackRef.current || !rootRef.current || prefersReducedMotion()) return;

      const root = rootRef.current;
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tween.play();
          else tween.pause();
        },
        { threshold: 0 }
      );
      io.observe(root);

      const pause = () => tween.pause();
      const resume = () => tween.play();
      root.addEventListener("mouseenter", pause);
      root.addEventListener("mouseleave", resume);
      root.addEventListener("focusin", pause);
      root.addEventListener("focusout", resume);

      let scrollTimeout: ReturnType<typeof setTimeout>;
      const onScroll = () => {
        tween.timeScale(2.2);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => tween.timeScale(1), 300);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        io.disconnect();
        root.removeEventListener("mouseenter", pause);
        root.removeEventListener("mouseleave", resume);
        root.removeEventListener("focusin", pause);
        root.removeEventListener("focusout", resume);
        window.removeEventListener("scroll", onScroll);
        clearTimeout(scrollTimeout);
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className={cn("flex w-max", trackClassName)}>
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
