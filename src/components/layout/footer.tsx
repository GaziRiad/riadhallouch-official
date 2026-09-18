import { getSiteSettings } from "@/sanity/queries";

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: "GitHub", href: settings.links.github },
    { label: "LinkedIn", href: settings.links.linkedin },
    { label: "Upwork", href: settings.links.upwork },
    // RSS will link to /feed.xml once /writing has real posts to serve.
    { label: "RSS", href: "/writing" },
  ];

  return (
    <footer className="border-ink-09 bg-bg mx-auto flex max-w-[1440px] flex-col items-start gap-3 border-t px-5 py-[26px] sm:flex-row sm:items-center sm:justify-between sm:px-11">
      <span className="text-ink-62 font-mono text-[11.5px]">
        © {year} {settings.name}
      </span>
      <div className="flex flex-wrap items-center gap-[22px]">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="text-ink-62 hover:text-ink font-mono text-[11.5px] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
