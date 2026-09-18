import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: AI products, MVPs, and internal tools shipped end to end.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  return (
    <section className="bg-bg mx-auto max-w-[1280px] px-5 py-14 sm:px-11 sm:py-[72px]">
      <h1 className="font-display text-ink mb-8 text-[34px] leading-[1.05] tracking-[-.02em] sm:mb-10 sm:text-[46px]">
        Selected work
      </h1>

      <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={cn(
              "group border-ink-10 overflow-hidden rounded-lg border transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-18px_rgba(20,19,15,.28)]",
              project.featured ? "bg-ink" : "bg-white"
            )}
          >
            <div
              className="flex aspect-[4/3] items-center justify-center"
              style={{
                backgroundImage: project.featured
                  ? "repeating-linear-gradient(135deg, rgba(250,248,244,.1) 0 7px, rgba(250,248,244,.04) 7px 14px)"
                  : "repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)",
              }}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[.06em] uppercase",
                  project.featured ? "text-paper-58" : "text-ink-62"
                )}
              >
                Shot — 1200×900
              </span>
            </div>
            <div className="p-[22px]">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-[10.5px] font-medium tracking-[.06em] uppercase",
                    project.featured ? "text-accent" : "text-accent-ink"
                  )}
                >
                  {project.gridCategory}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10.5px]",
                    project.featured ? "text-paper-58" : "text-ink-62"
                  )}
                >
                  {project.year}
                </span>
              </div>
              <h2
                className={cn(
                  "font-display mt-3 text-2xl leading-[1.15] sm:text-[26px]",
                  project.featured ? "text-paper" : "text-ink"
                )}
              >
                {project.title}
              </h2>
              <p
                className={cn(
                  "mt-2 text-sm leading-[1.6] font-light",
                  project.featured ? "text-paper-70" : "text-ink-60"
                )}
              >
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-[7px]">
                {project.stack.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full px-2.5 py-1 font-mono text-[10.5px]",
                      project.featured
                        ? "bg-paper-10 text-paper-70"
                        : "bg-bg-alt text-ink-60"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
