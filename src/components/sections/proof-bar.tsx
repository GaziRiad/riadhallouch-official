import { ShieldCheck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const clientTypes = [
  "Startups",
  "SaaS Teams",
  "E-Commerce Brands",
  "Agencies",
  "Government-Affiliated Clients",
  "International Companies",
];

export function ProofBar() {
  return (
    <section className="border-y border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-2 text-sm text-muted">
          <ShieldCheck className="h-4 w-4 text-accent-2" />
          <span>Delivered work across</span>
        </div>
        <Marquee items={clientTypes} />
      </div>
    </section>
  );
}
