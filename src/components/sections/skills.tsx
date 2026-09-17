import { skillGroups, marqueeSkills } from "@/data/skills";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Marquee } from "@/components/ui/marquee";

export function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Stack"
            title={
              <>
                Tools I reach for to{" "}
                <span className="text-gradient">actually ship.</span>
              </>
            }
            description="Full-stack by necessity — freelance work rarely stays in one lane. Deep in React/Next.js, comfortable owning the backend and the business logic underneath it."
          />
        </Reveal>

        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {skillGroups.map((group) => (
            <GlassCard key={group.label} className="h-full">
              <p className="eyebrow text-accent-2">{group.label}</p>
              <ul className="mt-4 space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </Reveal>
      </div>

      <div className="mt-16 border-y border-border py-6">
        <Marquee items={marqueeSkills} />
      </div>
    </section>
  );
}
