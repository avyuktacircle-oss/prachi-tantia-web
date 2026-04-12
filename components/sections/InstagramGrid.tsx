"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { InstagramPost } from "@/app/api/instagram/route";

import { Reveal } from "@/components/ui/Reveal";

interface ApiResponse {
  ok: boolean;
  posts: InstagramPost[];
  error?: string;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className="aspect-square animate-pulse rounded-lg bg-neutral-100 ring-1 ring-neutral-200"
        />
      ))}
    </div>
  );
}

export function InstagramGrid() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((data) => {
        if (data.ok) {
          setPosts(data.posts);
        } else {
          setError(data.error ?? "Could not load feed.");
        }
      })
      .catch(() => setError("Could not load feed."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonGrid />;

  if (error || posts.length === 0) {
    return (
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-10 text-center">
        <p className="font-body text-sm text-neutral-400">
          {error
            ? "Instagram feed unavailable. Check back soon."
            : "No posts yet — follow along at "}
          {!error && (
            <a
              className="text-brand-teal underline underline-offset-2"
              href="https://www.instagram.com/prachi.avyuktacircle/"
              rel="noopener noreferrer"
              target="_blank"
            >
              @prachi.avyuktacircle
            </a>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {posts.map((post, i) => {
        const imgSrc =
          post.media_type === "VIDEO"
            ? (post.thumbnail_url ?? post.media_url)
            : post.media_url;

        return (
          <Reveal delay={i * 0.04} key={post.id}>
            <a
              aria-label={`Instagram post from ${new Date(post.timestamp).toLocaleDateString()}`}
              className="group relative block aspect-square overflow-hidden rounded-lg ring-1 ring-neutral-200"
              href={post.permalink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt=""
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 22vw, 220px"
                src={imgSrc}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-brand-ink/0 transition-colors duration-300 group-hover:bg-brand-ink/25"
              />
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
