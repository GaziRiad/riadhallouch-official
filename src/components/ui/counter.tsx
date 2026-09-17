"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current) return;
      const counter = { val: 0 };

      gsap.to(counter, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          if (!ref.current) return;
          ref.current.textContent = `${prefix}${counter.val.toLocaleString(
            undefined,
            {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }
          )}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
