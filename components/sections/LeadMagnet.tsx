import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { LeadMagnetForm } from "@/components/ui/LeadMagnetForm";
import { Reveal } from "@/components/ui/Reveal";

export function LeadMagnet() {
  return (
    <Reveal as="section" className="bg-brand-ink py-20 md:py-24">
      <Container className="text-center">
        <h2 className="font-sans text-3xl font-bold text-white md:text-4xl">
          The Inner Circle: A Weekly Note from Prachi
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-white/85">
          Every Monday, I go beyond the frameworks to share raw insights, personal
          lessons, and practical tips on how to get un-stuck and live with absolute
          clarity.
        </p>
        <LeadMagnetForm />
        <p className="mx-auto mt-8 max-w-xl font-body text-xs leading-relaxed text-white/65">
          [By clicking, I agree to the{" "}
          <Link className="underline underline-offset-2 hover:text-brand-goldLight" href="/privacy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="underline underline-offset-2 hover:text-brand-goldLight" href="/terms">
            Terms of Use
          </Link>
          .] Frequency: Delivered to your inbox every Monday at 6 AM.
        </p>
      </Container>
    </Reveal>
  );
}
