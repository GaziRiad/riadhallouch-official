"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reasons = [
  { value: "project", label: "I have a project" },
  { value: "full-time", label: "I'm hiring full-time" },
  { value: "other", label: "Something else" },
] as const;

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { reason: "project" },
  });

  // handleSubmit(onSubmit) builds a submit handler; onSubmit only runs on
  // actual form submission, so reading honeypotRef.current inside it is
  // safe despite the static lint warning.
  // eslint-disable-next-line react-hooks/refs
  const submit = handleSubmit(async (data) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: honeypotRef.current?.value ?? "" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  const inputClass = cn(
    "mt-2 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors",
    dark
      ? "border-paper-14 text-paper placeholder:text-paper-58 focus:border-paper-35"
      : "border-ink-16 text-ink placeholder:text-ink-62/70 focus:border-ink"
  );
  const labelClass = cn(
    "font-mono text-[10.5px] tracking-[.06em] uppercase",
    dark ? "text-paper-58" : "text-ink-62"
  );
  const errorClass = dark ? "text-red-400" : "text-red-700";
  const reasonPillClass = cn(
    "block rounded-full border px-4 py-2 font-mono text-[12.5px] transition-colors",
    dark
      ? "border-paper-14 text-paper-70 peer-checked:bg-paper peer-checked:text-ink peer-checked:border-paper"
      : "border-ink-16 text-ink-62 peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink"
  );

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border p-8 text-center sm:p-12", dark ? "border-paper-14" : "border-ink-10")}>
        <p className={cn("font-display text-2xl", dark ? "text-paper" : "text-ink")}>Message sent.</p>
        <p className={cn("mt-3 text-sm", dark ? "text-paper-70" : "text-ink-62")}>
          Thanks for reaching out — I reply within a day. In the meantime feel free to email
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" {...register("name")} className={inputClass} placeholder="Jane Doe" />
          {errors.name ? <p className={cn("mt-1.5 text-xs", errorClass)}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={inputClass}
            placeholder="jane@company.com"
          />
          {errors.email ? <p className={cn("mt-1.5 text-xs", errorClass)}>{errors.email.message}</p> : null}
        </div>
      </div>

      <div>
        <p className={labelClass}>What&apos;s this about?</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {reasons.map((r) => (
            <label key={r.value} className="cursor-pointer">
              <input
                type="radio"
                value={r.value}
                {...register("reason")}
                className="peer sr-only"
              />
              <span className={reasonPillClass}>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={inputClass}
          placeholder="Scope, timeline, and anything else useful..."
        />
        {errors.message ? <p className={cn("mt-1.5 text-xs", errorClass)}>{errors.message.message}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting} variant={dark ? "paper" : "dark"}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        {status === "error" ? (
          <span className={cn("text-sm", errorClass)}>
            Something went wrong — email me directly instead.
          </span>
        ) : null}
      </div>
    </form>
  );
}
