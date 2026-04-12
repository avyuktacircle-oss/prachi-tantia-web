import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";
import { getResend } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const subscribedAt = new Date().toISOString();

  // Run Firestore write and admin notification concurrently.
  // Promise.allSettled ensures one failure does not block the other.
  const [firestoreResult, emailResult] = await Promise.allSettled([
    db.collection("newsletter_subscribers").add({ email, subscribedAt }),
    getResend().emails.send({
      from: "Prachi Tantia Website <noreply@avyuktacircle.com>",
      to: "prachi@avyuktacircle.com",
      subject: "New newsletter subscriber",
      html: `<p>A new subscriber just signed up for your newsletter.</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Time:</strong> ${subscribedAt}</p>`,
    }),
  ]);

  if (firestoreResult.status === "rejected") {
    console.error("[newsletter] Firestore write failed:", firestoreResult.reason);
    return NextResponse.json(
      { ok: false, error: "Could not save your subscription. Please try again." },
      { status: 500 },
    );
  }

  if (emailResult.status === "rejected") {
    // Log but do not surface to the user — subscription succeeded.
    console.error("[newsletter] Admin notification email failed:", emailResult.reason);
  }

  return NextResponse.json({ ok: true });
}
