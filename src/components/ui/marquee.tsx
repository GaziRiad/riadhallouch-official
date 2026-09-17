import { cn } from "@/lib/utils";

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display whitespace-nowrap text-xl text-muted-2 sm:text-2xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
