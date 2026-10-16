import { Navigation } from "lucide-react";
import { COMPANY, MAP_EMBED_SRC } from "@/lib/site";

const DIRECTIONS_SRC =
  "https://www.google.com/maps/search/?api=1&query=Jecaliha+Builders+Corporation";

export default function LocationSection() {
  return (
    <section className="border-t border-white/10 bg-basalt pb-20 pt-14 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="jbc-eyebrow text-gold">Find Us</p>
        <h2 className="jbc-title mt-3 text-2xl text-pearl sm:text-3xl">
          Our <span className="text-gold">Location</span>
        </h2>
        <div className="jbc-gold-rule mt-5" />

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-md transition-shadow duration-300 hover:shadow-gold-glow">
              <iframe
                title="Jecaliha Builders Corporation on Google Maps"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="jbc-eyebrow text-pearl/50">Visit Us</h3>

            <address className="mt-5 not-italic text-sm leading-relaxed text-pearl/85">
              {COMPANY.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <dl className="mt-5 space-y-1 text-sm text-pearl/70">
              {COMPANY.hours.map((entry) => (
                <div key={entry.day} className="flex justify-between gap-6">
                  <dt>{entry.day}</dt>
                  <dd className={entry.time === "Closed" ? "text-pearl/45" : "text-gold"}>
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-pearl/55">
              Our office is open for consultations and project discussions. We welcome site visits
              by appointment.
            </p>

            <a
              href={DIRECTIONS_SRC}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-gold px-6 py-3 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}