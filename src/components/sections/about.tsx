import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const timeline = [
  {
    period: "2025",
    title: "B.Sc. Information Systems Engineering / Computer Science",
    description:
      "Graduated while already running a freelance engineering practice — coursework and client work fed into each other.",
  },
  {
    period: "2022 — Present",
    title: "30+ projects delivered as a freelance engineer",
    description:
      "Built and shipped production software for startups, agencies, and government-affiliated clients across React/Next.js, Node.js, and ERP customization.",
  },
  {
    period: "Ongoing",
    title: "Top Rated on Upwork · 5.0 average rating",
    description:
      "$14K+ earned with a track record of repeat clients — the kind of proof that only comes from consistently delivering.",
  },
  {
    period: "Now",
    title: "Open to full-time, contract, and freelance engagements",
    description:
      "Looking for a team that ships fast and cares about the craft, or clients with problems worth solving properly.",
  },
];

export function About() {
  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  Engineer first,{" "}
                  <span className="text-gradient">freelancer by trade.</span>
                </>
              }
              description={`${siteConfig.name} is a full-stack software engineer based in ${siteConfig.location}, specializing in React/Next.js product engineering and business-workflow automation. Comfortable owning a feature end to end — from client conversation to production deploy.`}
            />
          </Reveal>

          <Reveal className="relative space-y-10 border-l border-border pl-8" stagger={0.12}>
            {timeline.map((item) => (
              <div key={item.title} className="relative">
                <span className="bg-accent absolute -left-[2.31rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg" />
                <p className="eyebrow text-accent-2">{item.period}</p>
                <h3 className="font-display mt-2 text-lg font-semibold text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
