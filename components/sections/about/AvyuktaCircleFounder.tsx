import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AvyuktaCircleFounder() {
  return (
    <Reveal as="section" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-gold">
              Founder
            </p>
            <h2 className="mt-3 font-sans text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              Avyukta Circle
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-brand-teal">
              Avyukta Circle is a global sanctuary for mental clarity—a space
              where science meets spirituality and structure meets soul. Built on
              the principles of Yoga Psychology, it is Prachi&apos;s life work:
              a platform, a community, and a movement dedicated to helping one
              million people reclaim their minds.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-brand-teal">
              From immersive retreats and teacher training programs to digital
              memberships and sound healing sessions, Avyukta Circle is the home
              of Clarity Culture—where every offering is designed to help you
              go from mental chaos to unshakeable focus.
            </p>
            <div className="mt-8">
              <Button
                href="https://avyuktacircle.org"
                rel="noopener noreferrer"
                target="_blank"
                variant="secondary"
              >
                Visit Avyukta Circle
                <ExternalLink aria-hidden className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Image placeholder */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-navy via-brand-teal to-brand-sky" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="font-sans text-2xl font-bold text-white">
                  Avyukta Circle
                </span>
                <span className="font-body text-sm text-white/80">
                  Add{" "}
                  <code className="rounded bg-black/20 px-1 text-brand-goldLight">
                    public/images/about/avyukta-circle.jpg
                  </code>{" "}
                  to display your space or logo here.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Reveal>
  );
}
