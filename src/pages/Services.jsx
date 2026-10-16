import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SERVICES, COMPANY } from "@/lib/site";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services"
        subtitle="One contractor for the whole scope — from specialized pool engineering to complete design-and-build delivery."
      />

      <section className="bg-basalt pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <article
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md transition-shadow duration-300 hover:shadow-gold-glow sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-basalt">
                  <service.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-6 font-heading text-base font-semibold uppercase leading-snug tracking-wide text-pearl">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-pearl/60">{service.blurb}</p>
                <span className="mt-6 font-display text-[10px] uppercase tracking-[0.3em] text-gold/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}

            <article className="flex h-full flex-col justify-between rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/12 to-transparent p-6 shadow-md transition-shadow duration-300 hover:shadow-gold-glow sm:p-7">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-basalt/60 text-gold">
                  <Phone className="h-5 w-5" />
                </span>
                <h2 className="mt-6 font-heading text-base font-semibold uppercase leading-snug tracking-wide text-pearl">
                  Not sure which service you need?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-pearl/65">
                  Tell us about your lot, budget, and timeline — we&apos;ll recommend the right
                  scope. Reach us at{" "}
                  <span className="text-pearl">{COMPANY.phone}</span>.
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-basalt transition-all duration-300 hover:bg-gold-soft hover:shadow-gold-glow"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}