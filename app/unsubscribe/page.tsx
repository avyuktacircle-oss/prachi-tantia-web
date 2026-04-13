"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "success" | "already" | "error";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data: { ok: boolean; alreadyUnsubscribed?: boolean; error?: string }) => {
        if (!data.ok) { setStatus("error"); return; }
        setStatus(data.alreadyUnsubscribed ? "already" : "success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="min-h-screen bg-brand-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="w-10 h-10 border-2 border-brand-goldLight border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/60 text-sm">Processing your request…</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="text-5xl">🙏</div>
            <div>
              <p className="text-xs tracking-[3px] uppercase text-brand-goldLight mb-3">Avyukta Circle</p>
              <h1 className="text-3xl font-bold text-white mb-4">You've been unsubscribed</h1>
              <p className="text-white/60 leading-relaxed">
                You will no longer receive the Weekly Mind-Alignment Note. I hope our paths cross again someday.
              </p>
            </div>
            <p className="text-white/40 text-sm italic">
              "Every ending is a new beginning in disguise."
            </p>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-brand-goldLight text-brand-ink text-sm font-bold uppercase tracking-wide rounded-md hover:bg-brand-gold transition-colors"
            >
              Return to Website
            </a>
          </div>
        )}

        {status === "already" && (
          <div className="space-y-6">
            <div className="text-5xl">✓</div>
            <div>
              <p className="text-xs tracking-[3px] uppercase text-brand-goldLight mb-3">Avyukta Circle</p>
              <h1 className="text-3xl font-bold text-white mb-4">Already unsubscribed</h1>
              <p className="text-white/60 leading-relaxed">
                This email has already been removed from the newsletter list.
              </p>
            </div>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-brand-goldLight text-brand-ink text-sm font-bold uppercase tracking-wide rounded-md hover:bg-brand-gold transition-colors"
            >
              Return to Website
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="text-5xl">⚠️</div>
            <div>
              <p className="text-xs tracking-[3px] uppercase text-brand-goldLight mb-3">Avyukta Circle</p>
              <h1 className="text-3xl font-bold text-white mb-4">Invalid link</h1>
              <p className="text-white/60 leading-relaxed">
                This unsubscribe link is invalid or has expired. Please contact{" "}
                <a href="mailto:prachi@avyuktacircle.com" className="text-brand-goldLight underline">
                  prachi@avyuktacircle.com
                </a>{" "}
                to be removed manually.
              </p>
            </div>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-brand-goldLight text-brand-ink text-sm font-bold uppercase tracking-wide rounded-md hover:bg-brand-gold transition-colors"
            >
              Return to Website
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
