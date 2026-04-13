import { NextResponse } from "next/server";

import { db } from "@/lib/firebaseAdmin";

const ADMIN_SECRET = process.env.NEWSLETTER_ADMIN_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get("x-admin-secret");
  if (!ADMIN_SECRET || authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const subscribersSnap = await db
    .collection("newsletter_subscribers")
    .where("status", "==", "active")
    .get();

  const subscribers = subscribersSnap.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email as string,
    subscribedAt: doc.data().subscribedAt as string,
  })).sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));

  // orderBy requires a composite index — fall back gracefully while it builds
  let broadcasts: { id: string; subject: string; sentAt: string; recipientCount: number; failedCount: number }[] = [];
  try {
    const broadcastsSnap = await db
      .collection("newsletter_broadcasts")
      .orderBy("sentAt", "desc")
      .limit(10)
      .get();
    broadcasts = broadcastsSnap.docs.map((doc) => ({
      id: doc.id,
      subject: doc.data().subject as string,
      sentAt: doc.data().sentAt as string,
      recipientCount: doc.data().recipientCount as number,
      failedCount: doc.data().failedCount as number,
    }));
  } catch (err) {
    console.error("[stats] broadcasts query failed (index may still be building):", err);
  }

  return NextResponse.json({
    ok: true,
    activeSubscribers: subscribersSnap.size,
    subscribers,
    broadcasts,
  });
}
