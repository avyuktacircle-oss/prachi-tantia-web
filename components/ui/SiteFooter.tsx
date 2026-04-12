import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteSocialLinks } from "@/lib/siteSocial";

const quickLinks: { label: string; href: string; note?: string }[] = [
  {
    label: "Home",
    href: "/",
    note: "Teaching videos & community moments",
  },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Speaking", href: "/speaking" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Connect", href: "/connect" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-brand-ink text-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-sans text-xl font-semibold tracking-wide text-white">
              Prachi<span className="ml-2">Tantia</span>
            </p>
            <address className="mt-5 not-italic font-body text-sm leading-relaxed text-neutral-500">
              Surat, Gujarat
              <br />
              India
            </address>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2 font-body text-sm">
              {quickLinks.map(({ label, href, note }) => (
                <li key={href + label}>
                  <Link
                    className="text-neutral-300 underline-offset-4 transition-colors hover:text-brand-goldLight hover:underline"
                    href={href}
                  >
                    {label}
                  </Link>
                  {note ? (
                    <span className="mt-0.5 block text-xs text-neutral-600">
                      {note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* Social + tagline */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">
              Connect
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {siteSocialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-brand-goldLight hover:text-brand-goldLight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-goldLight"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-sans text-base font-semibold italic text-brand-goldLight">
              &ldquo;Your Clarity is Your Superpower.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="font-body text-xs text-neutral-600">
            © {new Date().getFullYear()} Prachi Tantia · Avyukta Circle
          </p>
          <div className="flex gap-6 font-body text-xs text-neutral-600">
            <Link className="hover:text-neutral-300" href="/privacy">Privacy</Link>
            <Link className="hover:text-neutral-300" href="/terms">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
