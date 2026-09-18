import { homepageProjects } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { WorkRow } from "@/components/sections/work-row";

export function SelectedWork() {
  return (
    <section id="work" className="bg-bg scroll-mt-20 px-5 py-16 sm:px-11 sm:py-[88px]">
      <Reveal className="mb-11 flex items-baseline justify-between sm:mb-[52px]">
        <h2 className="font-display text-ink text-[34px] leading-[1.05] tracking-[-.02em] sm:text-[46px]">
          Selected work
        </h2>
        <span className="text-ink-62 hidden font-mono text-[11.5px] tracking-[.06em] uppercase sm:block">
          2023 — 2026
        </span>
      </Reveal>

      <div>
        {homepageProjects.map((project, i) => (
          <WorkRow key={project.slug} project={project} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="flex flex-col items-start gap-5 pt-9 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-ink-60 text-base font-light sm:text-[17px]">
          Eight more case studies, including three under NDA.
        </span>
        <Button variant="outline" href="/work" className="px-[22px] py-[13px] text-[13.5px]">
          All work
          <span aria-hidden="true" className="text-accent-ink">
            →
          </span>
        </Button>
      </div>
    </section>
  );
}
