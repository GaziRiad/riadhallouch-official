import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { UpworkAchievements } from "@/components/sections/upwork-achievements";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { LinkedInSection } from "@/components/sections/linkedin";
import { About } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <UpworkAchievements />
      <Skills />
      <Projects />
      <Testimonials />
      <LinkedInSection />
      <About />
      <Cta />
    </>
  );
}
