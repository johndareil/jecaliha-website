import { useState } from "react";
import ModalFrame from "@/components/projects/ModalFrame";
import ShareMenu from "@/components/projects/ShareMenu";
import Lightbox from "@/components/projects/Lightbox";
import VideoFrame from "@/components/VideoFrame";
import { useProjectImages } from "@/hooks/useSiteData";
import { projectShareUrl } from "@/lib/share";

export default function ProjectModalGallery({ project, onClose }) {
  const { images, loading } = useProjectImages(project.folder);
  const [visible, setVisible] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <ModalFrame
      onClose={onClose}
      size="max-w-6xl"
      fullScreenMobile
      header={
        <>
          <span className="bg-gold px-2.5 py-1 font-heading text-[10px] font-semibold uppercase leading-none tracking-wide text-basalt">
            {project.category}
          </span>
          <ShareMenu url={projectShareUrl(project.folder)} title={project.location} />
        </>
      }
    >
      <div className="space-y-7 p-4 pb-10 sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:gap-6">
          <div className="w-full md:w-65 md:shrink-0">
            <p className="jbc-eyebrow text-gold/70">Location</p>
            <p className="mt-2 text-sm leading-relaxed text-pearl/85">{project.location}</p>
          </div>
          <div className="min-w-0 flex-1 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="jbc-eyebrow text-gold/70">Description</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-pearl/70">
              {project.description || "Details available on request."}
            </p>
          </div>
          <div className="w-full border-t border-white/10 pt-5 md:w-65 md:shrink-0 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="jbc-eyebrow text-gold/70">Status</p>
            <p className="mt-2 text-sm text-pearl/85">{project.status}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-lg bg-ink">
            <img
              src={project.cover}
              alt={`${project.location} cover`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            {project.videoId ? (
              <VideoFrame videoId={project.videoId} title={project.location} />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center font-display text-[10px] uppercase tracking-[0.2em] text-pearl/40">
                No video for this project
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="jbc-eyebrow text-gold/70">Gallery</p>

          {loading && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="aspect-video animate-pulse rounded-lg bg-white/[0.05]" />
              ))}
            </div>
          )}

          {!loading && images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.slice(0, visible).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Open photo ${index + 1} of ${images.length}`}
                  onClick={() => setLightboxIndex(index)}
                  className="group overflow-hidden rounded-lg border border-white/10 shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                >
                  <img
                    src={image}
                    alt={`${project.location} photo ${index + 1}`}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          )}

          {!loading && images.length === 0 && (
            <p className="mt-4 text-sm text-pearl/50">
              Photo gallery for this project is coming soon.
            </p>
          )}

          {!loading && visible < images.length && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisible((value) => value + 6)}
                className="rounded-lg border border-gold/50 px-6 py-3 font-display text-[10px] uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
              >
                Load More
              </button>
              <button
                type="button"
                onClick={() => setVisible(images.length)}
                className="rounded-lg bg-gold px-6 py-3 font-display text-[10px] uppercase tracking-[0.22em] text-basalt transition-colors duration-300 hover:bg-gold-soft"
              >
                View All ({images.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </ModalFrame>
  );
}