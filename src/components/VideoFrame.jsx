import { useState } from "react";
import { Play } from "lucide-react";
import { useVideoPlayback } from "@/lib/VideoPlayback";
import { cn } from "@/lib/utils";

// Thumbnail first; the iframe is created only after a click. Only the active
// video id renders an iframe, so switching unmounts the previous one entirely.
export default function VideoFrame({ videoId, title, className, thumbClassName, onPlay }) {
  const { activeId, play } = useVideoPlayback();
  const [useFallbackThumb, setUseFallbackThumb] = useState(false);
  const active = activeId === videoId;

  // Only one id can be active, so starting this one unmounts any other iframe
  // (and restores that card to its thumbnail) before this iframe mounts.
  const startPlayback = () => {
    play(videoId);
    if (onPlay) onPlay();
  };

  if (active) {
    return (
      <div className={cn("relative h-full w-full bg-black", className)}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title || "Jecaliha Builders video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startPlayback}
      aria-label={title ? `Play video: ${title}` : "Play video"}
      className={cn(
        "group/video relative block h-full w-full overflow-hidden bg-basalt text-left",
        className
      )}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/${
          useFallbackThumb ? "hqdefault" : "maxresdefault"
        }.jpg`}
        alt={title || "Jecaliha Builders video thumbnail"}
        loading="lazy"
        decoding="async"
        onError={() => setUseFallbackThumb(true)}
        className={cn(
          "h-full w-full object-cover transition-transform duration-700 group-hover/video:scale-[1.06]",
          thumbClassName
        )}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-300 group-hover/video:opacity-80" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 bg-black/45 backdrop-blur-sm transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-gold group-hover/video:text-basalt">
          <Play className="h-5 w-5 translate-x-[1px] text-pearl transition-colors duration-300 group-hover/video:text-basalt" />
        </span>
      </span>
    </button>
  );
}