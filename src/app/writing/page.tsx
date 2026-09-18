import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: `Notes on shipping software, coming soon from ${siteConfig.name}.`,
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-11 sm:py-32">
      <span className="text-accent-ink font-mono text-[11.5px] tracking-[.08em] uppercase">
        Writing
      </span>
      <h1 className="font-display text-ink mt-4 text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[54px]">
        Coming soon.
      </h1>
      <p className="text-ink-66 mx-auto mt-4 max-w-[42ch] text-lg leading-[1.6] font-light">
        Notes on shipping products, AI integration, and the decisions behind the case studies on
        this site. Nothing published yet — check back soon.
      </p>
    </section>
  );
}
