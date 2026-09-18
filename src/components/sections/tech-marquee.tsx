import { Marquee } from "@/components/ui/marquee";
import { techStack } from "@/data/stats";

export function TechMarquee() {
  return (
    <div className="bg-ink overflow-hidden py-4">
      <Marquee speed={55} gap={40}>
        {techStack.map((item) => (
          <span key={item} className="contents">
            <span className="text-paper-58 font-mono text-[13px] whitespace-nowrap">{item}</span>
            <span aria-hidden="true" className="text-accent">
              /
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
