import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { BrowserChrome } from "@/components/ui/browser-chrome";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: AI products, MVPs, and internal tools shipped end to end.",
  alternates: { canonical: "/work" },
};

export default async function WorkIndexPage() {
  const projects = await getAllProjects();

  return (
    <section className="bg-bg mx-auto max-w-[1440px] px-5 py-14 sm:px-11 sm:py-[72px]">
      <h1 className="font-display text-ink mb-8 text-[34px] leading-[1.05] tracking-[-.02em] sm:mb-10 sm:text-[46px]">
        Selected work
      </h1>

      <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const coverUrl = urlFor(project.coverImage)?.width(960).height(540).fit("crop").url();

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={cn(
                "group border-ink-10 overflow-hidden rounded-lg border transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-18px_rgba(20,19,15,.28)]",
                project.featured ? "bg-ink" : "bg-white"
              )}
            >
              <BrowserChrome dark={project.featured} />
              <div
                className="relative flex aspect-[16/9] items-center justify-center"
                style={
                  coverUrl
                    ? undefined
                    : {
                        backgroundImage: project.featured
                          ? "repeating-linear-gradient(135deg, rgba(250,248,244,.1) 0 7px, rgba(250,248,244,.04) 7px 14px)"
                          : "repeating-linear-gradient(135deg, #e9e5dc 0 7px, #f2efe8 7px 14px)",
                      }
                }
              >
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[.06em] uppercase",
                      project.featured ? "text-paper-58" : "text-ink-62"
                    )}
                  >
                    Shot — 1920×1080
                  </span>
                )}
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
          );
        })}
      </div>
    </section>
  );
}
