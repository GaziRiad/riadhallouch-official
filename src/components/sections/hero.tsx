"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { siteConfig } from "@/data/site";
import { heroStats } from "@/data/stats";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { RatingWidget } from "@/components/sections/rating-widget";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!containerRef.current || prefersReducedMotion()) return;
      const lines = containerRef.current.querySelectorAll<HTMLElement>("[data-line]");

      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="top" ref={containerRef} className="bg-bg relative overflow-hidden px-5 pt-[54px] sm:px-11">
      <div className="flex items-center justify-between">
        <span className="text-ink-62 font-mono text-[11px] tracking-[.08em] uppercase sm:text-[11.5px]">
          Portfolio — 2026
        </span>
        <span className="text-accent-ink font-mono text-[11px] tracking-[.08em] uppercase sm:text-[11.5px]">
          Available for work
        </span>
      </div>

      <div className="relative">
        <h1 className="font-display text-ink relative z-[2] mt-[30px] text-[clamp(56px,13vw,168px)] leading-[.86] tracking-[-.04em]">
          <span className="block overflow-hidden pb-[2%]">
            <span data-line className="block">
              Riad
            </span>
          </span>
          <span className="block overflow-hidden pb-[2%]">
            <span data-line className="ml-[.06em] block italic">
              Hallouch
            </span>
          </span>
        </h1>

        <RatingWidget />
      </div>

      <div
        id="about"
        className="mt-11 flex scroll-mt-24 flex-col gap-10 border-b border-[rgba(20,19,15,.14)] pb-10 md:flex-row md:items-end md:justify-between"
      >
        <p className="text-ink-66 max-w-[40ch] text-lg leading-[1.6] font-light">
          {siteConfig.tagline}
        </p>
        <div className="flex flex-none flex-wrap items-center gap-3">
          <Button variant="dark" href="/contact">
            Start a project
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </Button>
          <Button variant="outline" href={siteConfig.links.cv}>
            Download CV
          </Button>
        </div>
      </div>

      <div className="bg-ink-12 grid grid-cols-2 gap-px sm:grid-cols-4">
        {heroStats.map((stat, i) => (
          <div key={stat.label} className={cn("bg-bg pt-6 pb-[34px]", i > 0 && "sm:pl-6")}>
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              className={cn(
                "font-display block text-[36px] leading-none sm:text-[44px]",
                stat.accent ? "text-accent-ink" : "text-ink"
              )}
            />
            <div className="text-ink-62 mt-2 font-mono text-[10.5px] tracking-[.06em] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
