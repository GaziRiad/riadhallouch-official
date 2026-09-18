import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCta } from "@/components/sections/project-cta";

const placeholderPattern = (dark = false) =>
  dark
    ? "repeating-linear-gradient(135deg, rgba(250,248,244,.1) 0 7px, rgba(250,248,244,.04) 7px 14px)"
    : "repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const coverUrl = urlFor(project.coverImage)?.width(1920).height(1080).fit("crop").url();
  const detailUrls = project.detailImages
    .map((img) => urlFor(img)?.width(1200).height(900).fit("crop").url())
    .filter((url): url is string => Boolean(url));

  const timeline = project.meta.split(" · ")[1] ?? project.meta;
  const overview = [
    { label: "Category", value: project.gridCategory },
    { label: "Timeline", value: timeline },
    { label: "Year", value: project.year },
    { label: "Stack", value: `${project.stack.length} technologies` },
  ];

  return (
    <article>
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-11 sm:py-[72px]">
        <Link href="/work" className="text-ink-62 hover:text-ink font-mono text-[11.5px]">
          ← All work
        </Link>

        <Reveal>
          <div className="mt-8 flex items-center gap-3">
            <span className="text-ink-62 font-mono text-xs">{project.index}</span>
            <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
              {project.meta}
            </span>
            <span className="text-ink-62 font-mono text-xs">{project.year}</span>
          </div>

          <h1 className="font-display text-ink mt-4 max-w-[18ch] text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[58px]">
            {project.title}
          </h1>

          <p className="text-ink-66 mt-5 max-w-[52ch] text-lg leading-[1.6] font-light">
            {project.summary}
          </p>
        </Reveal>

        <Reveal
          className="border-ink-09 relative mt-10 flex aspect-[16/9] items-center justify-center overflow-hidden rounded border sm:mt-12"
          style={coverUrl ? undefined : { backgroundImage: placeholderPattern() }}
        >
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <span className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
              Project shot — 1920×1080
            </span>
          )}
        </Reveal>

        <Reveal className="bg-ink-12 mt-10 grid grid-cols-2 gap-px sm:mt-12 sm:grid-cols-4">
          {overview.map((item, i) => (
            <div key={item.label} className={`bg-bg py-5 ${i > 0 ? "sm:pl-6" : ""}`}>
              <div className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
                {item.label}
              </div>
              <div className="text-ink mt-2 text-base font-medium">{item.value}</div>
            </div>
          ))}
        </Reveal>

        <div className="mx-auto mt-16 max-w-[68ch] sm:mt-20">
          <Reveal>
            <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
              Overview
            </span>
            <p className="text-ink-64 mt-4 text-lg leading-[1.65] font-light">{project.body}</p>
          </Reveal>

          {project.narrativeProblem ? (
            <Reveal className="mt-14">
              <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
                The problem
              </span>
              <p className="text-ink-64 mt-4 text-lg leading-[1.65] font-light">
                {project.narrativeProblem}
              </p>
            </Reveal>
          ) : null}

          {project.narrativeApproach ? (
            <Reveal className="mt-14">
              <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
                The approach
              </span>
              <p className="text-ink-64 mt-4 text-lg leading-[1.65] font-light">
                {project.narrativeApproach}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2">
          {[0, 1].map((i) => {
            const detailUrl = detailUrls[i];
            return (
              <div
                key={i}
                className="border-ink-09 relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded border"
                style={detailUrl ? undefined : { backgroundImage: placeholderPattern() }}
              >
                {detailUrl ? (
                  <Image
                    src={detailUrl}
                    alt={`${project.title} detail ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
                    Detail shot — 1200×900
                  </span>
                )}
              </div>
            );
          })}
        </Reveal>

        <div className="mx-auto mt-14 max-w-[68ch] sm:mt-16">
          {project.narrativeResult ? (
            <Reveal>
              <span className="text-accent-ink font-mono text-[11px] font-medium tracking-[.06em] uppercase">
                The result
              </span>
              <p className="text-ink-64 mt-4 text-lg leading-[1.65] font-light">
                {project.narrativeResult}
              </p>
            </Reveal>
          ) : null}

          {project.metrics.length ? (
            <Reveal className="border-ink-10 mt-8 flex flex-wrap gap-10 border-t pt-8">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-ink text-[28px] leading-none">
                    {metric.value}
                  </div>
                  <div className="text-ink-62 mt-1.5 font-mono text-[10.5px] tracking-[.05em] uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </Reveal>
          ) : null}

          <Reveal className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border-ink-16 text-ink-60 rounded-full border px-3 py-1.5 font-mono text-[11.5px]"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <ProjectCta />
    </article>
  );
}
