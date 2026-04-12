import { speakingRecognition } from "@/lib/speakingRecognition";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function SpeakingAuthorityStrip() {
  return (
    <Reveal
      as="section"
      className="border-y border-white/10 bg-brand-inkLight py-10"
    >
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {speakingRecognition.map(({ title, subtitle, Icon }) => (
            <div
              key={title}
              className="flex w-36 flex-col items-center gap-2 text-center sm:w-40"
            >
              <Icon
                aria-hidden
                className="h-9 w-9 text-brand-goldLight opacity-60"
                strokeWidth={1.25}
              />
              <span className="font-sans text-sm font-bold leading-snug text-white">
                {title}
              </span>
              {subtitle ? (
                <span className="font-body text-xs leading-snug text-neutral-400">
                  {subtitle}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button className="px-8 py-4" href="#book-prachi" variant="primary">
            Inquire for 2026 engagements
          </Button>
        </div>
      </Container>
    </Reveal>
  );
}
