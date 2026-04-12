import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "9+", label: "Years", description: "Deep expertise in Yoga Psychology" },
  { value: "10,000+", label: "Lives Impacted", description: "Professionals, students, and seekers transformed" },
  { value: "Avyukta", label: "Circle", description: "Founder of Avyukta Circle" },
  { value: "500+", label: "Coaches Mentored", description: "Trained and certified across India and beyond" },
];

export function AboutStats() {
  return (
    <Reveal
      as="section"
      className="border-y border-white/10 bg-brand-ink py-12"
    >
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map(({ value, label, description }, i) => (
            <Reveal delay={i * 0.07} key={label}>
              <div className="flex flex-col items-center text-center">
                <span className="font-sans text-3xl font-bold text-brand-goldLight md:text-4xl">
                  {value}
                </span>
                <span className="mt-1 font-sans text-base font-bold text-white">
                  {label}
                </span>
                <span className="mt-2 font-body text-sm leading-snug text-neutral-400">
                  {description}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
