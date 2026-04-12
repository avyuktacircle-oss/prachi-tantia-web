import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const chapters = [
  {
    label: "The Struggle",
    title: "Redefining \u201cFailure\u201d",
    body: `I\u2019ve been there\u2014as a failure. My school days weren\u2019t lived in the classroom\u2014they were spent standing outside of it. I was the child who lived in constant fear of result day. My marksheets were a sea of red: 16/100 in Maths, 0/10 in Chemistry, and 23/100 in Accounts. I remember the sting of teachers telling my parents, \u2018Your child is of no use.\u2019 Failing almost every subject while my friends excelled, I grew up believing the lie that I wasn\u2019t enough. I was a student lost in a system that only valued grades.`,
  },
  {
    label: "The First Meditation",
    title: "Grit on the Court",
    body: `While the classroom felt like a dead end, I found my fire on the State-level Table Tennis court. I would skip every tuition class just to play for 8 hours straight. Under the high pressure of tournaments, I learned split-second focus and the grit to stay steady. Long before I found a meditation mat, the discipline of the game was my first meditation.`,
  },
  {
    label: "The Professional Search",
    title: "From Diamonds to Design",
    body: `Searching for my place, I followed the \u2018safe\u2019 path. I spent three years studying Jewelry Design, Gemology, and Diamond Grading, eventually launching my own brand, Prachi Tantia Fine Jewellery. On paper, I was a successful diamond merchant. But inside, the noise of overthinking was louder than the sparkle of the industry.`,
  },
  {
    label: "The Turning Point",
    title: "A Calling at 18",
    body: `At 18, one moment changed everything. Listening to my spiritual mentor, something cracked open. I realized my purpose wasn\u2019t in grading diamonds; it was in understanding the human mind. My family viewed this shift with protective love. Their doubts came from a place of wanting my security, but I knew I had to prove this path was real. I chose to start from zero\u2014funding my own education and building my own foundation.`,
  },
  {
    label: "The Global Classroom",
    title: "Purposeful Travel",
    body: `Determined to learn from the source, I began traveling to every corner of the world at 18. I saved every penny to seek out great masters, embarking on solo, independent journeys that took me to unknown places for months at a time. It was in these quiet corners of the globe, meeting conscious, like-minded souls, that I discovered what purposeful travel means. It wasn\u2019t an escape; it was an evolution that gave my life its true meaning.`,
  },
  {
    label: "The Discipline",
    title: "The Grit of the Monastery",
    body: `The shift was radical: from luxury design to 4 AM monastery wake-ups. I saved every rupee and even lived without a roof over my head at times. But the universe showed up through the kindness of strangers, like the 80-year-old Parsi couple who gave me shelter. I wasn\u2019t running away from my roots; I was using the grit I learned on the court and the wisdom from my travels to master the science of the mind.`,
  },
  {
    label: "The Vision",
    title: "Returning to Your Power",
    body: `By 20, I stood before 300 students and realized my \u2018failures\u2019 in school were actually my greatest teachers in empathy. Today, with 9 years of experience and over 10,000 lives impacted, I lead Avyukta Circle. I help professionals, students, and seekers realize that you don\u2019t need a perfect background to create a powerful life.`,
  },
];

export function StoryNarrative() {
  return (
    <Reveal as="section" className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-gold">
            The Story
          </p>
          <h2 className="mt-3 font-sans text-3xl font-bold leading-tight text-brand-ink md:text-4xl">
            In Her Own Words.
          </h2>

          <div className="mt-14 space-y-16">
            {chapters.map(({ label, title, body }, i) => (
              <Reveal delay={i * 0.06} key={label}>
                <article className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-full before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-brand-goldLight before:to-brand-gold/20">
                  {/* Dot */}
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-[6px] h-[13px] w-[13px] rounded-full border-2 border-brand-goldLight bg-white"
                  />
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-gold">
                    {label}
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-bold text-neutral-900 md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-[1.85] text-neutral-600 md:text-[1.05rem]">
                    {body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Invitation block */}
          <Reveal delay={0.1}>
            <div className="mt-20 rounded-2xl border-l-4 border-brand-goldLight bg-neutral-50 px-8 py-10">
              <p className="font-body text-sm font-bold uppercase tracking-widest text-brand-gold">
                Your Invitation
              </p>
              <h3 className="mt-2 font-sans text-2xl font-bold text-neutral-900">
                Return to Your Power
              </h3>
              <p className="mt-5 font-body text-base leading-relaxed text-neutral-600">
                If you are walking an unconventional road right now, let this be
                your reminder: you are not lost\u2014you are being called. You
                are being asked to evolve, not escape. You don\u2019t need a
                different background to create a meaningful life; you simply
                need the courage to believe your vision deserves space.
              </p>
              <p className="mt-5 font-body text-base leading-relaxed text-neutral-600">
                Mind transformation isn\u2019t about changing who you are.
                It\u2019s about returning to the power of who you\u2019ve
                always been.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Reveal>
  );
}
