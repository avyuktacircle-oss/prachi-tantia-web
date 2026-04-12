import type { Metadata } from "next";

import { BookPrachiForm } from "@/components/forms/BookPrachiForm";
import { SpeakingAuthorityStrip } from "@/components/sections/SpeakingAuthorityStrip";
import { SpeakingHero } from "@/components/sections/SpeakingHero";
import { SpeakingOfferingsSection } from "@/components/sections/SpeakingOfferingsSection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Speaking | Prachi Tantia",
  description:
    "Book Prachi Tantia for keynotes, workshops, sound journeys, and retreats. The voice of Clarity Culture for global audiences.",
};

export default function SpeakingPage() {
  return (
    <main>
      <SpeakingHero />
      <SpeakingAuthorityStrip />
      <SpeakingOfferingsSection />
      <Reveal as="section" className="bg-brand-ink py-20 md:py-28" id="book-prachi">
        <Container>
          <BookPrachiForm />
        </Container>
      </Reveal>
    </main>
  );
}
