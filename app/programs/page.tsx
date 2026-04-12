import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-28 font-body text-brand-teal">
      <h1 className="font-sans text-3xl font-bold text-brand-navy">Programs</h1>
      <p className="mt-4 text-lg leading-relaxed">Superminds Tribe, Coaching Collective, and more.</p>
      <p className="mt-2">Full content coming soon.</p>
      <p className="mt-8">
        <Link className="font-semibold text-brand-navy underline" href="/">
          ← Back home
        </Link>
      </p>
    </main>
  );
}
