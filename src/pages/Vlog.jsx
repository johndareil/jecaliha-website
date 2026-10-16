import { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import VideoFrame from "@/components/VideoFrame";
import { useYoutubeFeed } from "@/hooks/useSiteData";
import { COMPANY } from "@/lib/site";

const PAGE_SIZE = 10;

export default function Vlog() {
  const { videos, loading } = useYoutubeFeed();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = videos.slice(0, visible);
  const hasMore = visible < videos.length;

  return (
    <>
      <PageHero
        eyebrow="Our Channel"
        title="Vlog"
        subtitle="Site progress, pool builds, and behind-the-scenes footage from our projects across the Philippines."
      />

      <section className="bg-basalt pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="aspect-video animate-pulse rounded-xl bg-white/[0.05]" />
              ))}
            </div>
          )}

          {!loading && shown.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {shown.map((video) => (
                <div
                  key={video.id}
                  className="aspect-video overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                >
                  <VideoFrame videoId={video.id} title={video.title} />
                </div>
              ))}
            </div>
          )}

          {!loading && shown.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-pearl">
                Videos are unavailable right now
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pearl/60">
                Our channel feed could not be reached at this moment. You can watch every build on
                our YouTube channel.
              </p>
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-lg border border-gold/50 px-6 py-3 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
              >
                Visit Our Channel
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisible((value) => value + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-8 py-4 font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-basalt hover:shadow-gold-glow"
              >
                Load More
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}