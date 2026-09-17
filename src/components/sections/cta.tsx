import { Briefcase, UserRound, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/sections/contact-form";

export function Cta() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Get in touch"
            title={
              <>
                Two ways to{" "}
                <span className="text-gradient">work together.</span>
              </>
            }
            description="Whichever you're here for, I reply within a day."
          />
        </Reveal>

        <Reveal className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2" stagger={0.12}>
          <GlassCard className="flex h-full flex-col">
            <Briefcase className="h-6 w-6 text-accent" />
            <h3 className="font-display mt-4 text-lg font-semibold text-foreground">
              Hiring for a project
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">
              Freelance or contract work — fixed-scope builds, ongoing engagements, or a team
              that needs an extra senior engineer.
            </p>
            <Button
              href={siteConfig.links.upwork}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-6 w-full"
            >
              Start on Upwork
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </GlassCard>

          <GlassCard className="flex h-full flex-col">
            <UserRound className="text-accent-2 h-6 w-6" />
            <h3 className="font-display mt-4 text-lg font-semibold text-foreground">
              Hiring full-time
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">
              Looking for a full-stack engineer to join your team. Open to remote roles and
              relocation-friendly positions.
            </p>
            <Button
              href={siteConfig.links.resume}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-6 w-full"
            >
              Download resume
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </GlassCard>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <GlassCard>
            <p className="font-display text-lg font-semibold text-foreground">
              Or just send a message
            </p>
            <p className="mt-1 text-sm text-muted">
              I&apos;ll get back to you at {siteConfig.email}.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
