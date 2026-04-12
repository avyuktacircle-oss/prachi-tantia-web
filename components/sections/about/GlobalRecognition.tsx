import { accolades } from "@/lib/accolades";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GlobalRecognition() {
  return (
    <Reveal as="section" className="bg-brand-sky/[0.06] py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="From 'No Use' to Global Influence—Leading the Shift to Clarity Culture."
          title="A Mission Validated by the World."
        />
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {accolades.map(({ label, Icon }, i) => (
            <Reveal delay={i * 0.07} key={label}>
              <div className="flex w-32 flex-col items-center gap-3 text-center md:w-36">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon
                    aria-hidden
                    className="h-8 w-8 text-brand-navy opacity-50 grayscale"
                    strokeWidth={1.25}
                  />
                </div>
                <span className="font-body text-xs font-semibold leading-snug text-brand-navy/70">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
