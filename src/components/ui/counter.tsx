"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
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
  prefix: prefixProp,
  suffix: suffixProp,
  decimals: decimalsProp,
  duration = 1.4,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Default params only cover `undefined` — CMS data can hand us an
  // explicit `null` for an unset field, which `${null}` would otherwise
  // stringify to the literal text "null".
  const prefix = prefixProp ?? "";
  const suffix = suffixProp ?? "";
  const decimals = decimalsProp ?? 0;

  useGSAP(
    () => {
      registerGsap();
      if (!ref.current) return;

      if (prefersReducedMotion()) {
        ref.current.textContent = `${prefix}${value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
        return;
      }

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
          ref.current.textContent = `${prefix}${counter.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
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
