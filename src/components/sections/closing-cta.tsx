import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { BookingTrigger } from "@/components/ui/booking-trigger";
import { ContactForm } from "@/components/sections/contact-form";

const currentlyItems = [
  { label: "2 freelance slots open", accent: true },
  { label: "Open to full-time, remote", accent: true },
  { label: "GMT+1 · overlaps US mornings", accent: false },
];

export function ClosingCta() {
  return (
    <section id="contact" className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-11 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-paper max-w-[22ch] text-[38px] leading-[1.02] tracking-[-.025em] sm:text-[62px]">
                Tell me what you&apos;re building.
              </h2>
              <p className="text-paper-70 mt-[22px] max-w-[44ch] text-base leading-[1.6] font-light sm:text-[17px]">
                Freelance projects and full-time roles both welcome. A short note about scope
                and timeline is enough to start.
              </p>
              <div className="mt-[34px] flex flex-wrap items-center gap-[14px]">
                <BookingTrigger className="bg-paper text-ink flex items-center gap-[9px] rounded-full px-[26px] py-[15px] text-sm font-medium transition-opacity hover:opacity-90">
                  Book a 20-min call
                  <span aria-hidden="true" className="text-accent-ink">
                    →
                  </span>
                </BookingTrigger>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-paper-70 font-mono text-[13px]"
                >
                  {siteConfig.email}
                </a>
              </div>
            </Reveal>

            <Reveal className="border-paper-14 mt-14 border-t pt-12">
              <span className="text-paper-58 font-mono text-[11px] tracking-[.06em] uppercase">
                Or send a message
              </span>
              <div className="mt-6">
                <ContactForm dark />
              </div>
            </Reveal>
          </div>

          <Reveal className="border-paper-14 bg-paper-05 h-fit flex-none rounded-xl border p-6 lg:sticky lg:top-28">
            <div className="text-paper-58 font-mono text-[10.5px] font-medium tracking-[.07em] uppercase">
              Currently
            </div>
            <div className="mt-[14px] flex flex-col gap-[11px]">
              {currentlyItems.map((item) => (
                <div key={item.label} className="flex items-center gap-[9px]">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${item.accent ? "bg-accent" : "bg-paper-35"}`}
                  />
                  <span className="text-paper-80 text-[13px] font-normal">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
