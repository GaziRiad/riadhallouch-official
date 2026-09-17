"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Reveal } from "@/components/ui/reveal";
import { Quote } from "lucide-react";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass flex w-[320px] shrink-0 snap-start flex-col justify-between rounded-3xl p-7 sm:w-[380px]">
      <div>
        <Quote className="h-6 w-6 text-accent" />
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="mt-8 border-t border-border pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-2">{testimonial.role}</p>
          </div>
          <span className="eyebrow text-muted-2">{testimonial.source}</span>
        </div>
        <StarRating rating={testimonial.rating} className="mt-3" />
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!sectionRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!trackRef.current || !sectionRef.current) return;
        const track = trackRef.current;

        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 96),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 96}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:h-screen lg:py-0"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Client feedback"
            title={
              <>
                5-star reviews,{" "}
                <span className="text-gradient">every single time.</span>
              </>
            }
          />
        </Reveal>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
          <div className="w-px shrink-0 lg:w-24" aria-hidden />
        </div>
      </div>
    </section>
  );
}
