"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function RotatingText({
  words,
  className,
  hold = 1.6,
}: {
  words: readonly string[];
  className?: string;
  hold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current || words.length < 2) return;
      let index = 0;
      ref.current.textContent = words[0];

      const tl = gsap.timeline({ repeat: -1 });
      words.forEach(() => {
        tl.to(ref.current, { yPercent: -115, opacity: 0, duration: 0.4, ease: "power2.in" })
          .call(() => {
            index = (index + 1) % words.length;
            if (ref.current) ref.current.textContent = words[index];
          })
          .set(ref.current, { yPercent: 115 })
          .to(ref.current, { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
          .to({}, { duration: hold });
      });
    },
    { scope: ref }
  );

  return (
    <span className="inline-block h-[1.4em] overflow-hidden align-bottom">
      <span ref={ref} className={cn("inline-block will-change-transform", className)} />
    </span>
  );
}
