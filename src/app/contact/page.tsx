import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project or ask about a full-time role. ${siteConfig.name} replies within a day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-11 sm:py-24">
      <span className="text-accent-ink font-mono text-[11.5px] tracking-[.08em] uppercase">
        Get in touch
      </span>
      <h1 className="font-display text-ink mt-4 text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[54px]">
        Tell me what you&apos;re building.
      </h1>
      <p className="text-ink-66 mt-4 max-w-[46ch] text-lg leading-[1.6] font-light">
        Freelance projects and full-time roles both welcome. A short note about scope and
        timeline is enough to start.
      </p>

      <div className="mt-12">
        <ContactForm />
      </div>
    </section>
  );
}
