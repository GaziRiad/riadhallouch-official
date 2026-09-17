"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const filters = ["All", "Freelance / Upwork", "Product Build", "Confidential Client"] as const;
type Filter = (typeof filters)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-7 transition-colors hover:border-border-strong",
        project.featured && "md:col-span-2"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow text-accent">{project.type}</span>
        <span className="text-xs text-muted-2">{project.year}</span>
      </div>

      <h3 className="font-display mt-4 text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="eyebrow text-muted-2">Problem</p>
          <p className="mt-1.5 text-sm text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="eyebrow text-muted-2">Solution</p>
          <p className="mt-1.5 text-sm text-muted">{project.solution}</p>
        </div>
        <div>
          <p className="eyebrow text-muted-2">Outcome</p>
          <p className="mt-1.5 text-sm text-foreground">{project.outcome}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Projects that solved{" "}
                <span className="text-gradient">real problems.</span>
              </>
            }
            description="A mix of freelance client engagements and product builds, chosen because each one had a clear problem to solve — not just a UI to ship."
          />
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                filter === f
                  ? "border-foreground bg-foreground text-bg"
                  : "border-border text-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 transition-opacity duration-300 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
