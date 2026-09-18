import { getSiteSettings } from "@/sanity/queries";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { SelectedWork } from "@/components/sections/selected-work";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactBlock } from "@/components/sections/contact-block";
import { ClosingCta } from "@/components/sections/closing-cta";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero settings={settings} />
      <TechMarquee items={settings.techStack} />
      <SelectedWork />
      <Testimonials />
      <ContactBlock />
      <ClosingCta />
    </>
  );
}
