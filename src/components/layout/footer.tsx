import { siteConfig } from "@/data/site";

const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Upwork", href: siteConfig.links.upwork },
  // RSS will link to /feed.xml once /writing has real posts to serve.
  { label: "RSS", href: "/writing" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ink-09 bg-bg flex flex-col items-start gap-3 border-t px-5 py-[26px] sm:flex-row sm:items-center sm:justify-between sm:px-11">
      <span className="text-ink-62 font-mono text-[11.5px]">
        © {year} {siteConfig.name}
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
