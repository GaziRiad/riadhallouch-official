import { cn } from "@/lib/utils";

/**
 * Window bar shown above a site screenshot. A viewport capture always cuts
 * the page off at the fold; framing it as a browser window makes that edge
 * read as the bottom of a window rather than a broken image.
 */
export function BrowserChrome({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-[26px] items-center gap-[5px] border-b px-3",
        dark ? "border-paper-10 bg-paper-05" : "border-ink-09 bg-bg-alt"
      )}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("h-[7px] w-[7px] rounded-full", dark ? "bg-paper-14" : "bg-ink-16")}
        />
      ))}
    </div>
  );
}
