"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { Badge } from "@/components/ui/badge";
import { RotatingText } from "@/components/ui/rotating-text";
import { cn } from "@/lib/utils";

const headlineWords: { text: string; accent?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "web" },
  { text: "products" },
  { text: "that" },
  { text: "ship", accent: true },
  { text: "—" },
  { text: "not" },
  { text: "just" },
  { text: "prototypes." },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!containerRef.current) return;
      const words = containerRef.current.querySelectorAll<HTMLElement>("[data-word]");

      gsap.set(words, { yPercent: 120, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.045,
        ease: "power4.out",
      }).from(
        "[data-hero-fade]",
        { opacity: 0, y: 18, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.45"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24"
    >
      <GradientMesh />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-6">
        <div data-hero-fade>
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Available for freelance &amp; full-time roles
          </Badge>
        </div>

        <h1 className="font-display mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-2 align-top">
              <span
                data-word
                className={cn("inline-block will-change-transform", word.accent && "text-gradient")}
              >
                {word.text}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-fade className="mt-6 max-w-xl text-lg text-muted">
          {siteConfig.tagline}
        </p>

        <div data-hero-fade className="mt-5 flex items-center gap-2 text-sm text-muted-2">
          <span>Currently focused on</span>
          <RotatingText words={siteConfig.roles} className="font-display font-medium text-foreground" />
        </div>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#work" size="lg">
            View my work
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            href={siteConfig.links.upwork}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="lg"
          >
            Upwork profile
          </Button>
        </div>
      </div>

      <a
        href="#upwork"
        aria-label="Scroll to next section"
        data-hero-fade
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-foreground sm:flex"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
