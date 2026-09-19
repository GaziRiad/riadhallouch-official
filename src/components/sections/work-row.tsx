"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function WorkRow({ project, reverse }: { project: Project; reverse?: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const coverUrl = urlFor(project.coverImage)?.width(1120).height(700).fit("crop").url();

  useGSAP(
    () => {
      registerGsap();
      if (!imageRef.current || prefersReducedMotion()) return;

      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 0 0 100%)", scale: 1.06 },
        {
          clipPath: "inset(0 0 0 0%)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: imageRef }
  );

  return (
    <div
      className={cn(
        "group border-ink-10 relative flex flex-col gap-8 border-b py-9 sm:gap-11 lg:flex-row lg:py-11",
        reverse && "lg:flex-row-reverse"
      )}
    >
      <div
        ref={imageRef}
        className="border-ink-09 relative aspect-[16/10] flex-none overflow-hidden rounded border lg:w-[560px]"
        style={
          coverUrl
            ? undefined
            : { backgroundImage: "repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)" }
        }
      >
        {coverUrl ? (
          <Image src={coverUrl} alt={project.title} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
              Project shot — 1600×1000
            </span>
          </div>
        )}
      </div>

      <Reveal className="relative flex flex-1 flex-col" y={24}>
        <div className="flex items-center gap-3">
          <span className="text-ink-62 font-mono text-xs">{project.index}</span>
          <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
            {project.meta}
          </span>
        </div>
        <h3 className="font-display text-ink mt-4 text-[28px] leading-[1.1] tracking-[-.02em] group-hover:underline sm:text-[38px]">
          {project.title}
        </h3>
        <p className="text-ink-64 mt-3.5 max-w-[46ch] text-base leading-[1.65] font-light">
          {project.body}
        </p>
        <div className="mt-[22px] flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border-ink-16 text-ink-60 rounded-full border px-3 py-1.5 font-mono text-[11.5px]"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.metrics.length ? (
          <div className="mt-auto flex flex-wrap gap-8 pt-[26px]">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-ink text-[26px] leading-none">
                  {metric.value}
                </div>
                <div className="text-ink-62 mt-1.5 font-mono text-[10.5px] tracking-[.05em] uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-accent-ink relative z-20 mt-[22px] inline-flex w-fit cursor-pointer items-center gap-1.5 font-mono text-[11.5px] font-medium hover:underline"
          >
            Visit site
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </Reveal>

      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`View case study: ${project.title}`}
      />
    </div>
  );
}
