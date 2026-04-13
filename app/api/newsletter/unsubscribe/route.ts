import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing token." }, { status: 400 });
  }

  const snapshot = await db
    .collection("newsletter_subscribers")
    .where("unsubscribeToken", "==", token)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 404 });
  }

  const doc = snapshot.docs[0]!;

  if (doc.data().status === "unsubscribed") {
    return NextResponse.json({ ok: true, alreadyUnsubscribed: true });
  }

  await doc.ref.update({ status: "unsubscribed", unsubscribedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
