import { cn } from "@/lib/utils";

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute left-1/2 top-[-15%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px] animate-float" />
      <div className="absolute right-[-12%] top-[15%] h-[420px] w-[420px] rounded-full bg-accent-2/15 blur-[110px] animate-float [animation-delay:-2s]" />
      <div className="absolute left-[-12%] bottom-[-15%] h-[480px] w-[480px] rounded-full bg-accent/15 blur-[130px] animate-float [animation-delay:-4s]" />
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />
    </div>
  );
}
