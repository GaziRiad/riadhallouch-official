"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  delay?: number;
  stagger?: number;
  start?: string;
};

/**
 * Reveals direct children on scroll. The hidden state is applied via GSAP
 * at mount, never as a static className — so if JS never runs, the
 * server-rendered content stays fully visible and readable.
 */
export function Reveal({
  children,
  className,
  style,
  y = 24,
  delay = 0,
  stagger = 0.08,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || prefersReducedMotion()) return;
      const targets = ref.current.children.length
        ? Array.from(ref.current.children)
        : [ref.current];

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
