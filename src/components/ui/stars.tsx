import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating.toFixed(2)} out of 5`}
      className={cn("font-mono", className)}
    >
      {"★★★★★".slice(0, Math.max(0, Math.min(5, Math.round(rating))))}
    </div>
  );
}
