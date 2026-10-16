import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@/components/PageHero";
import EventCard from "@/components/events/EventCard";
import EventModal from "@/components/events/EventModal";
import { useEvents } from "@/hooks/useEvents";
import useReveal from "@/hooks/useReveal";

export default function Events() {
  const { events, loading } = useEvents();
  const { search } = useLocation();
  const [openEvent, setOpenEvent] = useState(null);

  // Deep link: /events?event=folder-name
  useEffect(() => {
    if (!events.length) return;
    const folder = new URLSearchParams(search).get("event");
    if (!folder) return;
    const match = events.find((event) => event.folder === folder);
    if (match) setOpenEvent(match);
  }, [events, search]);

  const revealRef = useReveal([events.length, loading]);

  return (
    <>
      <PageHero
        eyebrow="Our Company"
        title="Events"
        subtitle="Moments that build stronger people, stronger projects, and a stronger future."
      >
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-pearl/55">
          From groundbreaking ceremonies to team-building days, our events are where the Jecaliha family
          gathers — celebrating milestones, sharing what we learn on site, and strengthening the bonds
          behind every project we deliver.
        </p>
      </PageHero>

      <section className="bg-basalt pb-20 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={revealRef}>
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className="aspect-[3/1] animate-pulse rounded-xl bg-white/[0.05]"
                  />
                ))}
              </div>
            )}

            {!loading && events.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {events.map((event) => (
                  <EventCard
                    key={event.folder}
                    event={event}
                    onOpen={() => setOpenEvent(event)}
                  />
                ))}
              </div>
            )}

            {!loading && events.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-pearl">
                  No events yet
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-pearl/55">
                  Company events will appear here as soon as they are added to our gallery.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {openEvent && <EventModal event={openEvent} onClose={() => setOpenEvent(null)} />}
    </>
  );
}