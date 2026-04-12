import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const milestones = [
  {
    era: "The Early Years",
    title: "The \u201cNo Use\u201d Student",
    subtitle: "The Challenge: Survival in a system that didn\u2019t fit.",
    body: `My school days weren\u2019t lived in the classroom\u2014they were spent standing outside of it. I lived in constant fear of result day, staring at marksheets that were a sea of red: 16/100 in Maths, 0/10 in Chemistry, and 23/100 in Accounts. I remember the sting of teachers telling my parents, \u2018Your child is of no use.\u2019 Failing almost every subject while my friends excelled, I grew up believing the lie that I wasn\u2019t enough.`,
  },
  {
    era: "The First Meditation",
    title: "Grit on the Court",
    subtitle: "The Discovery: Finding focus under pressure.",
    body: `While the classroom felt like a dead end, I found my fire on the State-level Table Tennis court. I would skip every tuition class just to play for 8 hours straight. Under the high pressure of tournaments, I learned split-second focus and the grit to stay steady. Long before I found a meditation mat, the discipline of the game was my first meditation.`,
  },
  {
    era: "Age 18\u201321",
    title: "The Sparkle of the \u2018Safe\u2019 Path",
    subtitle: "The Pivot: From Diamonds to Design.",
    body: `Following the \u2018safe\u2019 expectations of my traditional Marwari roots, I spent three years studying Gemology and Diamond Grading. I eventually launched my own brand, Prachi Tantia Fine Jewellery. On paper, I was a successful diamond merchant. But inside, the noise of overthinking was louder than the sparkle of the industry. I was grading diamonds, but I was losing myself.`,
  },
  {
    era: "The Seeking Years",
    title: "The Global Classroom",
    subtitle: "The Evolution: Purposeful Solo Travel.",
    body: `At 18, one moment changed everything. Listening to my spiritual mentor, something cracked open. I realized my purpose wasn\u2019t in luxury; it was in the human mind. I saved every penny to travel solo to unknown corners of the globe, learning from masters of consciousness. Staying for months in unknown places, I discovered what purposeful travel means\u2014it wasn\u2019t an escape; it was an evolution.`,
  },
  {
    era: "The Deep Dive",
    title: "The Grit of the Monastery",
    subtitle: "The Discipline: Starting from Zero.",
    body: `The shift was radical: from luxury design to 4 AM monastery wake-ups. To honor my family\u2019s value of self-reliance, I funded my own education and started from zero. I lived with nothing, even staying with a kind Parsi couple when I had no roof over my head. I wasn\u2019t running away from my roots; I was using the grit from the court and the wisdom from my travels to master the science of the mind.`,
  },
  {
    era: "Present Day",
    title: "Returning to Power",
    subtitle: "The Impact: Founding Avyukta Circle.",
    body: `By age 20, I stood before 300 students and realized my \u2018failures\u2019 in school were my greatest teachers in empathy. Today, with 9 years of experience and 10,000+ lives impacted, I lead a movement to replace \u2018Hustle Culture\u2019 with \u2018Clarity Culture.\u2019 I am proof that you don\u2019t need a perfect background to create a powerful life.`,
  },
];

export function TimelineSection() {
  return (
    <Reveal as="section" className="bg-brand-ink py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
            A Timeline of Transformation
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-400 md:text-xl">
            Six defining moments that turned a school failure into a global movement.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical spine — visible on md+ */}
          <div
            aria-hidden
            className="absolute left-1/2 hidden h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-goldLight via-brand-gold/50 to-brand-gold/10 md:block"
          />

          <div className="space-y-12 md:space-y-0">
            {milestones.map(({ era, title, subtitle, body }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal delay={i * 0.07} key={title}>
                  <div
                    className={`relative flex flex-col md:flex-row md:items-start md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`w-full rounded-2xl border border-white/10 bg-brand-inkLight p-8 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <span className="inline-block rounded-full bg-brand-goldLight/20 px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-brand-gold">
                        {era}
                      </span>
                      <h3 className="mt-3 font-sans text-xl font-bold text-white">
                        {title}
                      </h3>
                      <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-brand-goldLight/70">
                        {subtitle}
                      </p>
                      <p className="mt-4 font-body text-sm leading-[1.9] text-neutral-300 md:text-base">
                        {body}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div
                      aria-hidden
                      className={`absolute hidden h-5 w-5 rounded-full border-[3px] border-brand-goldLight bg-brand-ink shadow-md md:block ${
                        isLeft
                          ? "left-1/2 top-8 -translate-x-1/2"
                          : "left-1/2 top-8 -translate-x-1/2"
                      }`}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
