import crypto from "crypto";

import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";
import { buildWelcomeEmail } from "@/lib/newsletterEmail";
import { getResend } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prachitantia.com";

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
  const unsubscribeToken = crypto.randomBytes(32).toString("hex");
  const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

  const [firestoreResult, adminEmailResult, welcomeEmailResult] = await Promise.allSettled([
    db.collection("newsletter_subscribers").add({
      email,
      subscribedAt,
      status: "active",
      unsubscribeToken,
    }),
    getResend().emails.send({
      from: "Prachi Tantia <noreply@avyuktacircle.com>",
      to: "prachi@avyuktacircle.com",
      subject: "New newsletter subscriber",
      html: `<p>A new subscriber just signed up for your newsletter.</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Time:</strong> ${subscribedAt}</p>`,
    }),
    getResend().emails.send({
      from: "Prachi Tantia <prachi@avyuktacircle.com>",
      to: email,
      subject: "Welcome to the Circle | Your Monday ritual starts now",
      html: buildWelcomeEmail(unsubscribeUrl),
    }),
  ]);

  if (firestoreResult.status === "rejected") {
    console.error("[newsletter] Firestore write failed:", firestoreResult.reason);
    return NextResponse.json(
      { ok: false, error: "Could not save your subscription. Please try again." },
      { status: 500 },
    );
  }

  if (adminEmailResult.status === "rejected") {
    console.error("[newsletter] Admin notification email failed:", adminEmailResult.reason);
  }

  if (welcomeEmailResult.status === "rejected") {
    console.error("[newsletter] Welcome email failed:", welcomeEmailResult.reason);
  }

  return NextResponse.json({ ok: true });
}
