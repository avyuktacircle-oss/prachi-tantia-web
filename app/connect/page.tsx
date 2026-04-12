import type { Metadata } from "next";

import { ConnectForm } from "@/components/forms/ConnectForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Connect | Prachi Tantia",
  description:
    "Contact Prachi’s team for press, partnerships, speaking, podcasts, and general inquiries.",
};

export default function ConnectPage() {
  return (
    <main className="pb-8 pt-24 md:pt-28">
      <Reveal as="section" className="bg-gradient-to-b from-brand-sky/10 to-white py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-sans text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
              Have a question?
            </h1>
            <p className="mt-4 font-body text-lg leading-relaxed text-brand-teal">
              For all other inquiries, use the form below to reach Prachi’s team.
              We read every message.
            </p>
          </div>
        </Container>
      </Reveal>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ConnectForm />
          </div>

          <Reveal className="mx-auto mt-14 max-w-2xl rounded-2xl border border-brand-sky/25 bg-brand-navy/5 p-8 text-center">
            <h2 className="font-sans text-lg font-bold text-brand-navy">
              Media &amp; press
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-brand-teal">
              For all media and press enquiries, please email{" "}
              <a
                className="font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold"
                href="mailto:prachi@avyuktacircle.com"
              >
                prachi@avyuktacircle.com
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
