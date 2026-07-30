"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/analytics";

/* Click-to-load video.

   The resting state is our own design and loads nothing from YouTube: an embed
   pulls roughly a megabyte of scripts before anyone presses play, and sets
   cookies for visitors who never watch. The player is only mounted on click.

   The poster comes from the CMS rather than YouTube's thumbnail service, which
   keeps it on-brand and avoids adding a remote image host to both the image
   config and the security headers. */

export default function VideoFacade({
  videoId,
  title,
  poster,
  posterAlt,
  duration,
}: {
  videoId: string;
  title?: string | null;
  poster?: string | null;
  posterAlt?: string | null;
  duration?: string | null;
}) {
  const [playing, setPlaying] = useState(false);
  const fired = useRef(false);

  const label = title ?? "Watch the introduction";

  function play() {
    if (!fired.current) {
      fired.current = true; // first press only; repeat presses are not signal
      track("video_play", { video_id: videoId });
    }
    setPlaying(true);
  }

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(63,107,255,0.22)", boxShadow: "0 24px 60px rgba(2,8,23,0.30)" }}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={play}
          aria-label={`Play: ${label}`}
          className="group absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ background: poster ? undefined : "linear-gradient(135deg, #0B1734 0%, #061126 100%)" }}
        >
          {poster ? (
            <>
              <Image
                src={poster}
                alt={posterAlt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority={false}
              />
              <span className="absolute inset-0 bg-[#061126]/35 transition-colors duration-300 group-hover:bg-[#061126]/20" />
            </>
          ) : (
            <span
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          )}

          <span className="relative flex flex-col items-center gap-4">
            <span
              className="flex items-center justify-center w-[68px] h-[68px] rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #3f6bff, #8b5cf6)", boxShadow: "0 12px 34px rgba(63,107,255,0.42)" }}
            >
              <svg className="w-6 h-6 translate-x-[2px]" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-[14px] font-semibold text-white drop-shadow">
              {label}
              {duration && <span className="ml-2 font-normal text-white/60">{duration}</span>}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
