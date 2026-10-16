import { formatEventDate } from "@/lib/eventDate";

// Cover spans two of the card's three columns, details take the third.
export default function EventCard({ event, onOpen }) {
  return (
    <article
      data-reveal
      className="group grid grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
    >
      <div className="relative col-span-2 min-h-[160px] overflow-hidden bg-ink">
        <img
          src={event.cover}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="col-span-1 flex flex-col justify-between gap-4 border-l border-white/10 p-4">
        <div>
          {event.date && (
            <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold">
              {formatEventDate(event.date)}
            </p>
          )}
          <h3 className="mt-2 font-heading text-sm font-semibold uppercase leading-snug tracking-tight text-pearl sm:text-base">
            {event.title}
          </h3>
          {event.location && <p className="mt-2 text-xs text-pearl/55">{event.location}</p>}
          {event.description && (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-pearl/60">
              {event.description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(event)}
          className="w-full rounded-lg border border-gold/50 px-4 py-2.5 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
        >
          View Photos
        </button>
      </div>
    </article>
  );
}