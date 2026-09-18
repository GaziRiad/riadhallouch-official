import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { BookingTrigger } from "@/components/ui/booking-trigger";

/**
 * Repeatable closing CTA for case study pages — same visual language as the
 * homepage's closing CTA, with a personal photo in place of the
 * availability panel.
 */
export function ProjectCta() {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-16 sm:px-11 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <Reveal>
          <h2 className="font-display text-paper max-w-[20ch] text-[34px] leading-[1.05] tracking-[-.02em] sm:text-[52px]">
            Have a project like this in mind?
          </h2>
          <p className="text-paper-70 mt-[18px] max-w-[44ch] text-base leading-[1.6] font-light sm:text-[17px]">
            Freelance projects and full-time roles both welcome. A short note about scope and
            timeline is enough to start.
          </p>
          <div className="mt-[30px] flex flex-wrap items-center gap-[14px]">
            <BookingTrigger className="bg-paper text-ink flex items-center gap-[9px] rounded-full px-[26px] py-[15px] text-sm font-medium transition-opacity hover:opacity-90">
              Book a 20-min call
              <span aria-hidden="true" className="text-accent-ink">
                →
              </span>
            </BookingTrigger>
            <a href={`mailto:${siteConfig.email}`} className="text-paper-70 font-mono text-[13px]">
              {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <Reveal className="flex flex-none items-center gap-4">
          <div className="border-paper-14 relative h-20 w-20 flex-none overflow-hidden rounded-full border">
            <Image
              src="/images/riad.jpg"
              alt={siteConfig.name}
              fill
              sizes="80px"
              className="object-cover"
              style={{ objectPosition: "44% 38%" }}
            />
          </div>
          <div>
            <p className="text-paper text-sm font-medium">{siteConfig.name}</p>
            <p className="text-paper-58 mt-1 font-mono text-[11px] tracking-[.04em] uppercase">
              {siteConfig.role}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
