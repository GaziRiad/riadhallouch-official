"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";

const reasons = [
  { value: "project", label: "I have a project" },
  { value: "full-time", label: "I'm hiring full-time" },
  { value: "other", label: "Something else" },
] as const;

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-border-strong";

export function ContactForm() {
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

  const onSubmit = async (data: ContactInput) => {
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
  };

  return (
    // handleSubmit(onSubmit) builds a submit handler; onSubmit only runs on
    // actual form submission, so reading honeypotRef.current inside it is
    // safe despite the static lint warning.
    // eslint-disable-next-line react-hooks/refs
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-muted-2">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className={inputClass}
            placeholder="Jane Doe"
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-muted-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={inputClass}
            placeholder="jane@company.com"
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="eyebrow text-muted-2">What&apos;s this about?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {reasons.map((r) => (
            <label key={r.value} className="cursor-pointer">
              <input
                type="radio"
                value={r.value}
                {...register("reason")}
                className="peer sr-only"
              />
              <span className="block rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-bg">
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow text-muted-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={inputClass}
          placeholder="Tell me a bit about the project or role..."
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Send message
        </Button>
        {status === "success" ? (
          <span className="text-success flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="h-4 w-4" /> Sent — I&apos;ll reply within a day.
          </span>
        ) : null}
        {status === "error" ? (
          <span className="flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> Something went wrong — email me directly instead.
          </span>
        ) : null}
      </div>
    </form>
  );
}
