import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import { MAP_EMBED_SRC } from "@/lib/site";

export default function ContactColumns({ formId }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      <div className="flex flex-col gap-8">
        <ContactInfo tone="dark" />

        {/* Grows to end level with the Send Us a Message container. */}
        <div className="relative h-72 overflow-hidden rounded-xl border border-white/10 shadow-md transition-shadow duration-300 hover:shadow-gold-glow sm:h-96 lg:h-auto lg:min-h-[18rem] lg:flex-1">
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

      <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md sm:p-8">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-pearl">
          Send Us a Message
        </h3>
        <div className="jbc-gold-rule mt-4" />
        <p className="mt-5 text-sm leading-relaxed text-pearl/55">
          All fields are required. Once validated, your request opens in your email app addressed to
          our team.
        </p>
        <div className="mt-7">
          <ContactForm id={formId} />
        </div>
      </div>
    </div>
  );
}