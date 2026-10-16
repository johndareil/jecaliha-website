import { useState } from "react";
import { Play } from "lucide-react";
import ModalFrame from "@/components/projects/ModalFrame";
import ShareMenu from "@/components/projects/ShareMenu";
import EventLightbox from "@/components/events/EventLightbox";
import { eventShareUrl } from "@/lib/share";
import { formatEventDate } from "@/lib/eventDate";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "images", label: "Images" },
  { id: "videos", label: "Videos" },
];

const INITIAL_VISIBLE = 6;
const PAGE_SIZE = 6;

export default function EventModal({ event, onClose }) {
  const [tab, setTab] = useState("images");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items =
    tab === "images"
      ? event.images.map((url) => ({ type: "image", url }))
      : event.videos.map((url) => ({ type: "video", url }));
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  const selectTab = (id) => {
    setTab(id);
    setVisible(INITIAL_VISIBLE);
  };

  return (
    <ModalFrame
      onClose={onClose}
      size="max-w-6xl"
      fullScreenMobile
      closeLabel="Close event details"
      header={
        <>
          <h2 className="min-w-0 truncate font-heading text-sm font-semibold uppercase tracking-[0.14em] text-pearl sm:text-base">
            {event.title}
          </h2>
          <ShareMenu url={eventShareUrl(event.folder)} title={event.title} />
        </>
      }
    >
      <div className="space-y-8 p-4 pb-10 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-3">
              <div className="aspect-video overflow-hidden rounded-lg bg-ink">
                <img
                  src={event.cover}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {event.date && (
              <>
                <p className="jbc-eyebrow text-gold/70">Date</p>
                <p className="mt-2 text-sm text-pearl/85">{formatEventDate(event.date)}</p>
              </>
            )}
            {event.location && (
              <>
                <p className="jbc-eyebrow mt-6 text-gold/70">Location</p>
                <p className="mt-2 text-sm text-pearl/85">{event.location}</p>
              </>
            )}
            <p className="jbc-eyebrow mt-6 text-gold/70">Description</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-pearl/70">
              {event.description || "Details available on request."}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-pearl">
              Event Gallery
            </h3>
            <div className="flex items-center gap-2">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTab(item.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                    tab === item.id
                      ? "border-gold bg-gold text-basalt"
                      : "border-white/15 text-pearl/65 hover:border-gold hover:text-gold"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {items.length === 0 && (
            <p className="mt-5 text-sm text-pearl/50">
              No {tab} for this event yet.
            </p>
          )}

          {items.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {shown.map((item, index) => (
                <button
                  key={item.url}
                  type="button"
                  aria-label={`Open ${item.type} ${index + 1} of ${items.length}`}
                  onClick={() => setLightboxIndex(index)}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-ink shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={`${event.title} photo ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="relative block aspect-video w-full">
                      <video
                        src={item.url}
                        preload="metadata"
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-black/45 backdrop-blur-sm">
                          <Play className="h-4 w-4 translate-x-[1px] text-pearl" />
                        </span>
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisible(items.length)}
                className="rounded-lg bg-gold px-6 py-3 font-display text-[10px] uppercase tracking-[0.22em] text-basalt transition-colors duration-300 hover:bg-gold-soft"
              >
                View All ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setVisible((value) => value + PAGE_SIZE)}
                className="rounded-lg border border-gold/50 px-6 py-3 font-display text-[10px] uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <EventLightbox
          items={items}
          index={lightboxIndex}
          label={event.title}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </ModalFrame>
  );
}