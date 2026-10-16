import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import VideoGrid from "@/components/home/VideoGrid";
import SectionHeading from "@/components/SectionHeading";
import VideoFrame from "@/components/VideoFrame";
import { useYoutubeFeed } from "@/hooks/useSiteData";

export default function FeaturedVideos() {
  const { videos, loading } = useYoutubeFeed();
  const latest = videos.slice(0, 4);

  return (
    <section className="bg-[#0B0D11] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="On Site" title="Featured Videos" />

        <div className="mt-14">
          {loading && <SkeletonBento />}

          {!loading && latest.length > 0 && (
            <VideoGrid
              items={latest.map((video) => ({ key: video.id, video }))}
              renderItem={({ video }, { isWide, promote }) => (
                <div className="group relative h-full w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-gold-glow">
                  <VideoFrame
                    videoId={video.id}
                    title={video.title}
                    onPlay={isWide ? undefined : promote}
                  />
                </div>
              )}
            />
          )}

          {!loading && latest.length === 0 && (
            <p className="text-center text-sm text-pearl/50">
              Videos are unavailable right now. Please check back shortly.
            </p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/vlog"
            className="group inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-gold-soft"
          >
            View All Videos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SkeletonBento() {
  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-5">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={[
            "animate-pulse rounded-xl bg-white/[0.05]",
            index % 3 === 0 ? "lg:col-span-3" : "lg:col-span-2",
          ].join(" ")}
        />
      ))}
    </div>
  );
}