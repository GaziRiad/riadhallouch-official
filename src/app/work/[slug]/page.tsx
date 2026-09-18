import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title === "Project name" ? `Case study — ${project.gridCategory}` : project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-11 sm:py-[72px]">
      <Link href="/work" className="text-ink-62 hover:text-ink font-mono text-[11.5px]">
        ← All work
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <span className="text-ink-62 font-mono text-xs">{project.index}</span>
        <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
          {project.meta}
        </span>
        <span className="text-ink-62 font-mono text-xs">{project.year}</span>
      </div>

      <h1 className="font-display text-ink mt-4 text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[54px]">
        {project.title}
      </h1>

      <div
        className="border-ink-09 mt-9 flex aspect-[16/10] items-center justify-center overflow-hidden rounded border"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)",
        }}
      >
        <span className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
          Project shot — 1600×1000
        </span>
      </div>

      <p className="text-ink-64 mt-9 max-w-[62ch] text-lg leading-[1.65] font-light">
        {project.body}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="border-ink-16 text-ink-60 rounded-full border px-3 py-1.5 font-mono text-[11.5px]"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.metrics.length ? (
        <div className="border-ink-10 mt-10 flex flex-wrap gap-10 border-t pt-8">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-ink text-[28px] leading-none">{metric.value}</div>
              <div className="text-ink-62 mt-1.5 font-mono text-[10.5px] tracking-[.05em] uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
