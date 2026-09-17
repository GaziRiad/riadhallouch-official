import { ArrowUpRight, Quote } from "lucide-react";
import { linkedinRecommendations, linkedinStats } from "@/data/recommendations";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/ui/social-icons";

export function LinkedInSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Professional network"
            title={
              <>
                Recommended by people{" "}
                <span className="text-gradient">I&apos;ve worked with.</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[340px_1fr] lg:items-start">
          <Reveal>
            <GlassCard className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A66C2]">
                  <LinkedinIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">LinkedIn</p>
                  <p className="text-xs text-muted">Open to opportunities</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-2xl font-semibold text-foreground">
                    {linkedinStats.connections}
                  </p>
                  <p className="mt-1 text-xs text-muted">Connections</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-foreground">
                    {linkedinStats.recommendations}+
                  </p>
                  <p className="mt-1 text-xs text-muted">Recommendations</p>
                </div>
              </div>

              <Button
                href={linkedinStats.profileUrl}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="mt-6 w-full"
              >
                View full profile
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </GlassCard>
          </Reveal>

          <Reveal className="grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {linkedinRecommendations.map((rec) => (
              <GlassCard key={rec.name}>
                <Quote className="h-5 w-5 text-accent" />
                <p className="mt-4 text-sm text-muted">&ldquo;{rec.quote}&rdquo;</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground">{rec.name}</p>
                  <p className="text-xs text-muted-2">
                    {rec.role} · {rec.company}
                  </p>
                </div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
