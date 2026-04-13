import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";
import { buildBroadcastEmail } from "@/lib/newsletterEmail";
import { getResend } from "@/lib/resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prachitantia.com";
const ADMIN_SECRET = process.env.NEWSLETTER_ADMIN_SECRET;
const BATCH_SIZE = 50;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function sendBroadcast(subject: string, bodyHtml: string): Promise<{ sent: number; failed: number }> {
  const snapshot = await db
    .collection("newsletter_subscribers")
    .where("status", "==", "active")
    .get();

  if (snapshot.empty) return { sent: 0, failed: 0 };

  type Subscriber = { email: string; unsubscribeToken: string };
  const subscribers: Subscriber[] = snapshot.docs.map((doc) => ({
    email: doc.data().email as string,
    unsubscribeToken: doc.data().unsubscribeToken as string,
  }));

  let sent = 0;
  let failed = 0;
  const resend = getResend();

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(({ email, unsubscribeToken }) => {
        const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;
        return resend.emails.send({
          from: "Prachi Tantia <prachi@avyuktacircle.com>",
          to: email,
          subject,
          html: buildBroadcastEmail(subject, bodyHtml, unsubscribeUrl),
        });
      }),
    );
    for (const result of results) {
      if (result.status === "fulfilled") { sent++; }
      else { failed++; console.error("[broadcast] Failed:", result.reason); }
    }
    if (i + BATCH_SIZE < subscribers.length) await sleep(500);
  }

  await db.collection("newsletter_broadcasts").add({
    subject,
    bodyHtml,
    sentAt: new Date().toISOString(),
    recipientCount: sent,
    failedCount: failed,
  });

  return { sent, failed };
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("x-admin-secret");
  if (!ADMIN_SECRET || authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  // ── Scheduled draft mode (triggered by Cloud Scheduler) ──────────────────
  if (b.useScheduledDraft === true) {
    const snap = await db
      .collection("newsletter_drafts")
      .where("status", "==", "pending")
      .get();

    if (snap.empty) {
      return NextResponse.json({ ok: false, error: "No pending draft found." }, { status: 404 });
    }

    const sorted = snap.docs.sort((a, c) => {
      const aTime = a.data().createdAt as string ?? "";
      const cTime = c.data().createdAt as string ?? "";
      return cTime.localeCompare(aTime);
    });
    const draftDoc = sorted[0]!;
    const draft = draftDoc.data();
    const subject = draft.subject as string;
    const bodyHtml = draft.bodyHtml as string;

    const result = await sendBroadcast(subject, bodyHtml);

    await draftDoc.ref.update({ status: "sent", sentAt: new Date().toISOString() });

    return NextResponse.json({ ok: true, ...result });
  }

  // ── Manual broadcast mode ────────────────────────────────────────────────
  const subject =
    typeof b.subject === "string" ? b.subject.trim() : "";
  const bodyHtml =
    typeof b.bodyHtml === "string" ? b.bodyHtml.trim() : "";

  if (!subject || !bodyHtml) {
    return NextResponse.json(
      { ok: false, error: "subject and bodyHtml are required." },
      { status: 400 },
    );
  }

  const result = await sendBroadcast(subject, bodyHtml);
  return NextResponse.json({ ok: true, ...result });
}
