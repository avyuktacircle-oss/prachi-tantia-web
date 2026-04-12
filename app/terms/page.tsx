import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-28 font-body text-brand-teal">
      <h1 className="font-sans text-3xl font-bold text-brand-navy">
        Terms of Use
      </h1>
      <p className="mt-6 leading-relaxed">
        These terms will govern use of this site and related services. Final
        legal copy is forthcoming.
      </p>
      <p className="mt-6">
        <Link className="font-semibold text-brand-navy underline" href="/">
          ← Back home
        </Link>
      </p>
    </main>
  );
}
