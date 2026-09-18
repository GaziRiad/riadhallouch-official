import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { SelectedWork } from "@/components/sections/selected-work";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactBlock } from "@/components/sections/contact-block";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <SelectedWork />
      <Testimonials />
      <ContactBlock />
      <ClosingCta />
    </>
  );
}
