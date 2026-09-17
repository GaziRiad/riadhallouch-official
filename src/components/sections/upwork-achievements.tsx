"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { Star, BadgeCheck, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { upworkStats, upworkBadge } from "@/data/stats";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";

export function UpworkAchievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || !cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { rotate: -8, y: 60, opacity: 0 },
        {
          rotate: -4,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.to(cardRef.current, {
        rotate: 2,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="upwork"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-elevated py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-20 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Track record"
              title={
                <>
                  Proven on Upwork,{" "}
                  <span className="text-gradient">not just on paper.</span>
                </>
              }
              description="Every number below comes straight from client-rated, publicly verifiable Upwork history — no self-reported figures."
            />

            <Reveal className="mt-12 grid grid-cols-3 gap-6 sm:gap-10" stagger={0.12}>
              {upworkStats.map((stat) => (
                <div key={stat.label}>
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    className="font-display block text-3xl font-semibold text-foreground sm:text-4xl"
                  />
                  <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </Reveal>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href={siteConfig.links.upwork}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                View live Upwork profile
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center py-10 lg:justify-end">
            <div
              ref={cardRef}
              className="glass relative w-full max-w-sm rounded-3xl p-6 shadow-2xl shadow-black/40 lg:w-[420px] lg:-mr-16 xl:-mr-28"
            >
              <div className="flex items-center gap-4">
                <div className="font-display flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-lg font-semibold text-bg">
                  RH
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {siteConfig.name}
                  </p>
                  <p className="text-xs text-muted">{siteConfig.role}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-surface/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <StarRating rating={5} />
                  <span className="text-sm font-medium text-foreground">5.0</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-accent-2">
                  <BadgeCheck className="h-4 w-4" />
                  {upworkBadge.label}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border p-4">
                  <p className="font-display text-xl font-semibold text-foreground">$14K+</p>
                  <p className="mt-1 text-xs text-muted">Total earned</p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="font-display text-xl font-semibold text-foreground">30+</p>
                  <p className="mt-1 text-xs text-muted">Jobs completed</p>
                </div>
              </div>
            </div>

            <div className="glass animate-float absolute -left-2 top-4 hidden -rotate-6 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-foreground sm:flex">
              <Star className="h-3.5 w-3.5 fill-accent-2 text-accent-2" />
              100% five-star reviews
            </div>
            <div className="glass animate-float absolute -right-2 bottom-4 hidden rotate-3 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-foreground [animation-delay:-3s] sm:flex">
              <BadgeCheck className="h-3.5 w-3.5 text-success" />
              Repeat clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
