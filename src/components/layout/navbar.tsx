"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";
import { BookingTrigger } from "@/components/ui/booking-trigger";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-paper/86 border-ink-07 sticky top-0 z-40 border-b backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-[18px] sm:px-11">
        <Link href="#top" className="flex items-center gap-[11px]">
          <span
            aria-hidden="true"
            className="bg-accent inline-block h-[9px] w-[9px] rounded-full"
            style={{ boxShadow: "0 0 0 4px rgba(0,192,139,.18)" }}
          />
          <span className="text-ink text-sm font-medium tracking-[-0.01em]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-[30px] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-60 hover:text-ink text-[13px] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.cv}
            target="_blank"
            rel="noreferrer"
            className="text-ink-60 hover:text-ink text-[13px] transition-colors"
          >
            CV
          </a>
          <BookingTrigger className="bg-ink flex items-center gap-2 rounded-full px-4 py-[9px] transition-opacity hover:opacity-90">
            <span className="text-paper text-[12.5px] font-medium">Book a call</span>
            <span aria-hidden="true" className="text-accent text-[12.5px]">
              →
            </span>
          </BookingTrigger>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <BookingTrigger className="bg-ink flex h-11 items-center gap-2 rounded-full px-4">
            <span className="text-paper text-[12.5px] font-medium">Book a call</span>
            <span aria-hidden="true" className="text-accent text-[12.5px]">
              →
            </span>
          </BookingTrigger>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-ink flex h-11 w-11 items-center justify-center rounded-full"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-ink-07 bg-paper border-t px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-ink-60 hover:bg-bg-alt hover:text-ink flex min-h-11 items-center rounded-xl px-3 text-sm"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.links.cv}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="text-ink-60 hover:bg-bg-alt hover:text-ink flex min-h-11 items-center rounded-xl px-3 text-sm"
            >
              CV
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
