import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LeadMagnetForm } from "@/components/ui/LeadMagnetForm";
import { Reveal } from "@/components/ui/Reveal";

export function JourneyCTA() {
  return (
    <Reveal as="section" className="bg-brand-inkLight py-20 md:py-28">
      <Container className="text-center">
        <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-goldLight">
          Your Invitation
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-sans text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.5rem]">
          Are You Ready to Return to Who You&apos;ve Always Been?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/85">
          Mind transformation isn&apos;t about changing who you are. It&apos;s
          about returning to the power of who you&apos;ve always been.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            className="px-8 py-4"
            href="https://avyuktacircle.org"
            rel="noopener noreferrer"
            target="_blank"
            variant="primary"
          >
            Join the Circle
          </Button>
          <Button
            className="border-white text-white hover:border-brand-goldLight hover:text-brand-goldLight"
            href="/programs"
            variant="secondary"
          >
            Explore Programs
          </Button>
        </div>

        <div className="mx-auto my-14 max-w-xs border-t border-white/20" />

        <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
          The Inner Circle: A Weekly Note from Prachi
        </h3>
        <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-white/80">
          Every Monday, I go beyond the frameworks to share raw insights,
          personal lessons, and practical tips on how to get un-stuck and live
          with absolute clarity.
        </p>
        <LeadMagnetForm />
        <p className="mx-auto mt-8 max-w-xl font-body text-xs leading-relaxed text-white/60">
          By clicking, I agree to the{" "}
          <Link
            className="underline underline-offset-2 hover:text-brand-goldLight"
            href="/privacy"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-2 hover:text-brand-goldLight"
            href="/terms"
          >
            Terms of Use
          </Link>
          . Frequency: Delivered to your inbox every Monday at 6 AM.
        </p>
      </Container>
    </Reveal>
  );
}
