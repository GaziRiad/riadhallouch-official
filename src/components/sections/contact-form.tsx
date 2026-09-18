"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";

const reasons = [
  { value: "project", label: "I have a project" },
  { value: "full-time", label: "I'm hiring full-time" },
  { value: "other", label: "Something else" },
] as const;

const inputClass =
  "border-ink-16 text-ink placeholder:text-ink-62/70 focus:border-ink mt-2 w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors";

const DEFAULT_ERROR = "Something went wrong — email me directly instead.";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);
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
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setErrorMessage(body?.error || DEFAULT_ERROR);
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setErrorMessage(DEFAULT_ERROR);
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="border-ink-10 rounded-2xl border p-8 text-center sm:p-12">
        <p className="font-display text-ink text-2xl">Message sent.</p>
        <p className="text-ink-62 mt-3 text-sm">
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
          <label htmlFor="name" className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
            Name
          </label>
          <input id="name" {...register("name")} className={inputClass} placeholder="Jane Doe" />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-red-700">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
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
            <p className="mt-1.5 text-xs text-red-700">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
          What&apos;s this about?
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {reasons.map((r) => (
            <label key={r.value} className="cursor-pointer">
              <input
                type="radio"
                value={r.value}
                {...register("reason")}
                className="peer sr-only"
              />
              <span className="border-ink-16 text-ink-62 peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink block rounded-full border px-4 py-2 font-mono text-[12.5px] transition-colors">
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-ink-62 font-mono text-[10.5px] tracking-[.06em] uppercase">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={inputClass}
          placeholder="Scope, timeline, and anything else useful..."
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-700">{errors.message.message}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting} variant="dark">
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        {status === "error" ? (
          <span className="text-sm text-red-700">{errorMessage}</span>
        ) : null}
      </div>
    </form>
  );
}
