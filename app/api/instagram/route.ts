import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramApiResponse {
  data: InstagramPost[];
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Instagram token not configured.", posts: [] },
      { status: 200 },
    );
  }

  const params = new URLSearchParams({
    fields: "id,media_type,media_url,thumbnail_url,permalink,timestamp",
    limit: "12",
    access_token: token,
  });

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?${params.toString()}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[instagram] API error:", res.status, text);
      return NextResponse.json(
        { ok: false, error: "Failed to fetch Instagram posts.", posts: [] },
        { status: 200 },
      );
    }

    const json = (await res.json()) as InstagramApiResponse;

    return NextResponse.json({ ok: true, posts: json.data ?? [] });
  } catch (err) {
    console.error("[instagram] fetch error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error.", posts: [] },
      { status: 200 },
    );
  }
}
