import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export function ContactBlock() {
  return (
    <section id="contact" className="bg-bg scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-11">
        <Reveal className="mx-auto max-w-2xl">
          <span className="text-accent-ink font-mono text-[11.5px] tracking-[.08em] uppercase">
            Get in touch
          </span>
          <h2 className="font-display text-ink mt-4 text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[54px]">
            Tell me what you&apos;re building.
          </h2>
          <p className="text-ink-66 mt-4 max-w-[46ch] text-lg leading-[1.6] font-light">
            Freelance projects and full-time roles both welcome. A short note about scope and
            timeline is enough to start.
          </p>

          <div className="mt-12">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
