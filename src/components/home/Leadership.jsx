import { Check, Facebook, Youtube } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY, HOME_MEDIA } from "@/lib/site";

const CREDENTIALS = [
  "Forbes Park, Dasmariñas Village & Rockwell Center, Makati",
  "High-rise buildings in BGC & prestigious Metro Manila villages",
  "Northern regions: Bulacan, Tarlac, Nueva Ecija, Zambales, La Union",
  "Southern regions: Laguna, Cavite, Batangas, Samar & beyond",
  "PCAB Licensed & legally registered since 2019",
  "Integrity-led leadership guided by faith and full transparency",
];

export default function Leadership() {
  return (
    <section className="relative overflow-hidden bg-basalt py-12 sm:py-14 lg:py-16">
      <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Leadership" title="Meet Our CEO" />

        <div className="mt-16 grid items-center gap-20 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            {/* Photo, badge and socials live in one box so they move together. */}
            <div className="relative w-full max-w-[20rem] pb-16">
              <div className="flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-200 shadow-2xl">
                <img
                  src={HOME_MEDIA.president}
                  alt="Warden L. Geraldo, President of Jecaliha Builders Corporation"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute bottom-11 -right-3 rounded-xl bg-gold px-5 py-3 text-center shadow-lg sm:-right-5">
                <p className="font-heading text-sm font-semibold text-basalt">
                  Warden L. Geraldo
                </p>
                <p className="font-display text-[9px] uppercase tracking-[0.22em] text-basalt/70">
                  President
                </p>
              </div>

              <div className="absolute bottom-1 left-0 flex items-center gap-3">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Warden L. Geraldo on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/[0.04] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={COMPANY.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Jecaliha Builders on YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/[0.04] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[15px] leading-relaxed text-pearl/70">
              With 17+ years of mastery in high-end construction and pool engineering, Warden is
              the technical heartbeat of Jecaliha Builders Corporation. His career is defined by a
              “zero-failure” mindset, having successfully led over 100 projects across the
              Philippines&apos; most prestigious neighborhoods — from Forbes Park and BGC to
              resorts across Luzon and the Visayas.
            </p>

            <ul className="mt-8 space-y-4">
              {CREDENTIALS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                  <span className="text-sm leading-relaxed text-pearl/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}