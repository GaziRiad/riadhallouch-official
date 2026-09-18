import Image from "next/image";
import { siteConfig } from "@/data/site";
import { testimonials, moneyLine } from "@/data/testimonials";
import { linkedinPanel } from "@/data/linkedin";
import { Reveal } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/stars";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-bg-alt overflow-hidden py-14 sm:py-[72px]">
      <Reveal className="mx-auto mb-9 max-w-[1280px] px-5 sm:mb-[38px] sm:px-11">
        <h2 className="font-display text-ink text-[30px] leading-[1.05] tracking-[-.02em] sm:text-[46px]">
          Twenty-four reviews. All five stars.
        </h2>
      </Reveal>

      <Marquee speed={70} gap={20}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-bg border-ink-10 flex h-[240px] w-[300px] flex-none flex-col justify-between rounded-[10px] border p-[26px] sm:w-[360px]"
          >
            <div>
              <Stars rating={5} className="text-accent-ink text-[13px] tracking-[.14em]" />
              <p className="font-display text-ink mt-4 line-clamp-4 text-lg leading-[1.5]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="text-ink-62 font-mono text-[11px]">
              {t.name} · {t.role}
            </div>
          </div>
        ))}
      </Marquee>

      <div className="mx-auto mt-6 flex max-w-[1280px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-11">
        <span className="text-ink-62 text-sm font-light sm:text-[15px]">{moneyLine}</span>
        <Button
          variant="outline"
          href={siteConfig.links.upwork}
          target="_blank"
          rel="noreferrer"
          className="flex-none px-5 py-[11px] text-[12.5px]"
        >
          Verify on Upwork
          <span aria-hidden="true" className="text-accent-ink">
            ↗
          </span>
        </Button>
      </div>

      <div className="mx-auto mt-7 max-w-[1280px] px-5 sm:px-11">
        <div className="bg-bg border-ink-10 flex flex-col items-start gap-5 rounded-[10px] border p-[26px] sm:flex-row sm:items-center sm:gap-6 sm:p-[26px_28px]">
          <div className="border-ink-10 relative h-16 w-16 flex-none overflow-hidden rounded-full border">
            <Image
              src="/images/riad.jpg"
              alt={siteConfig.name}
              fill
              sizes="64px"
              className="object-cover"
              style={{ objectPosition: "44% 38%" }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-ink text-paper flex h-4 w-4 items-center justify-center rounded-[3px] text-[9px] font-semibold">
                in
              </span>
              <span className="text-ink text-[12.5px] font-medium">
                {linkedinPanel.recommendations} recommendations · {linkedinPanel.followers} followers
              </span>
            </div>
            <p className="text-ink-62 mt-2 text-sm leading-[1.55] font-light">
              {linkedinPanel.blurb}
            </p>
          </div>
          <Button
            variant="dark"
            href={linkedinPanel.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-none px-5 py-3 text-[12.5px]"
          >
            Read them
            <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
