import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/HeroSection";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { VisionSection } from "@/components/sections/VisionSection";

export const metadata: Metadata = {
  title: "Prachi Tantia | Clarity Culture & Yoga Psychology",
  description:
    "From school failure to yoga psychologist: mastering mental clarity. Founder of Avyukta Circle — Superminds Tribe, coaching, sanctuary, and retreats.",
  openGraph: {
    title: "Prachi Tantia | Clarity Culture",
    description:
      "Building a global movement for the mind — raw, unfiltered, and real.",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VisionSection />
      <PillarsSection />
      <LeadMagnet />
    </main>
  );
}
