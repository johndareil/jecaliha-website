import { Facebook } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { HOME_MEDIA, TEAM } from "@/lib/site";

export default function TeamSection() {
  return (
    <section className="bg-pearl py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Team"
          title="The People Behind Our Success"
          subtitle="Engineers, architects, and construction professionals with decades of combined experience — building every project as if it were our own."
          tone="light"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {TEAM.map((member) => (
            <article key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-md transition-shadow duration-300 group-hover:shadow-gold-glow">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on Facebook`}
                  className="absolute bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-white/85 text-basalt opacity-0 shadow-sm transition-opacity duration-150 hover:bg-gold focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-3 text-center">
                <p className="text-[10px] font-semibold leading-tight text-basalt sm:text-[11px] xl:text-xs">
                  {member.name}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-wide text-slate-500 xl:text-[10px]">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <div className="relative flex h-56 items-end overflow-hidden rounded-2xl bg-basalt shadow-xl sm:h-72">
            <img
              src={HOME_MEDIA.family}
              alt="Jecaliha Builders Corporation team"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-basalt/55" />
            <div className="relative px-6 pb-6 text-left sm:px-8 sm:pb-8">
              <p className="jbc-eyebrow text-gold">Our Family</p>
              <p className="mt-3 font-heading text-lg font-semibold uppercase leading-snug tracking-wide text-pearl sm:text-2xl">
                Jecaliha Builders Corporation Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}