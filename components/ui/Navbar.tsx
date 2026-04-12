"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "Connect", href: "/connect" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-ink/98 shadow-lg shadow-black/40 backdrop-blur-md"
          : "bg-gradient-to-b from-black/70 to-transparent backdrop-blur-none",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Logo / wordmark */}
        <Link
          className="leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-goldLight focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="font-sans text-lg font-semibold tracking-wide text-white sm:text-xl">
            Prachi<span className="ml-2">Tantia</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
          {links.map(({ label, href, external }) => (
            <li key={label}>
              <Link
                className="group relative rounded px-3 py-2 font-sans text-sm font-semibold text-white/80 transition-colors hover:text-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-goldLight"
                href={href}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {label}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-brand-goldLight transition-transform duration-200 group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded p-2 text-white/80 transition-colors hover:text-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-goldLight lg:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? (
            <X aria-hidden className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Menu aria-hidden className="h-6 w-6" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
        id="mobile-menu"
      >
        <ul className="flex flex-col border-t border-white/10 bg-brand-ink/99 px-4 pb-6 pt-2">
          {links.map(({ label, href, external }) => (
            <li key={label}>
              <Link
                className="flex items-center py-3 font-sans text-base font-semibold text-white/80 transition-colors hover:text-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-goldLight"
                href={href}
                onClick={() => setOpen(false)}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
