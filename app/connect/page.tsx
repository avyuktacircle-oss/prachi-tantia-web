import type { Metadata } from "next";

import { ConnectForm } from "@/components/forms/ConnectForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Connect | Prachi Tantia",
  description:
    "Contact Prachi's team for coaching, press, partnerships, speaking, tribe support, and general inquiries.",
};

const supportCards = [
  {
    title: "New to the Circle",
    description:
      "For program details, bookings, or visiting our sanctuary.",
    email: "hello@avyuktacircle.com",
  },
  {
    title: "Coaching & Mentorship",
    description:
      "Personal clarity coaching and one-on-one mentorship inquiries.",
    email: "coaching@avyuktacircle.com",
  },
  {
    title: "The Tribe Desk",
    description:
      "Already a member of the Circle? Dedicated support for our active Tribe members.",
    email: "tribe@avyuktacircle.com",
  },
  {
    title: "Press, Media & Brand Partnerships",
    description:
      "For brand collaborations, speaking, and press inquiries.",
    email: "media@avyuktacircle.com",
  },
  {
    title: "Corporate & Team Solutions",
    description:
      "Transform your organizational culture. For leadership retreats, office immersions, and B2B partnerships.",
    email: "works@avyuktacircle.com",
  },
];

export default function ConnectPage() {
  return (
    <main className="bg-brand-ink">
      {/* Hero */}
      <Reveal
        as="section"
        className="bg-brand-ink pb-16 pt-32 md:pb-20 md:pt-40"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-goldLight">
              Connect
            </p>
            <h1 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
              Whether you are stepping into a journey of mind clarity, looking
              to elevate your corporate team, or wishing to share a personal
              breakthrough — you are in the right space.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-neutral-400">
              As a Yoga Psychology Educator and Mind Clarity Coach, my goal is
              to hold space for deep, structured transformation. To ensure your
              message reaches the right part of our ecosystem quickly, please
              select the path that best describes your intention below.
            </p>
          </div>
        </Container>
      </Reveal>

      {/* Support directory */}
      <section className="bg-brand-ink pb-20 md:pb-28">
        <Container>
          <Reveal>
            <h2 className="mb-10 text-center font-sans text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">
              Support
            </h2>
          </Reveal>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportCards.map(({ title, description, email }, i) => {
              const isLastOdd =
                supportCards.length % 3 !== 0 &&
                i === supportCards.length - 1;
              return (
                <Reveal
                  as="li"
                  className={isLastOdd ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
                  delay={i * 0.07}
                  key={email}
                >
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-brand-inkLight p-8">
                    <h3 className="font-sans text-lg font-bold text-white">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-neutral-400">
                      {description}
                    </p>
                    <a
                      className="mt-6 inline-block font-body text-sm font-semibold text-brand-goldLight underline-offset-4 transition-colors hover:underline"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Contact form */}
      <section className="bg-brand-inkLight pb-28 pt-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ConnectForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
