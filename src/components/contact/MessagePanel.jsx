import ContactForm from "@/components/ContactForm";

export default function MessagePanel({ formId }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md sm:p-10">
      <p className="jbc-eyebrow text-gold">Inquire Now</p>
      <h2 className="jbc-title mt-3 text-2xl text-pearl sm:text-3xl">
        Send Us a <span className="text-gold">Message</span>
      </h2>
      <div className="jbc-gold-rule mt-5" />
      <p className="mt-6 max-w-md text-sm leading-relaxed text-pearl/55">
        Tell us about your project and our team will get back to you as soon as possible.
      </p>

      <div className="mt-8">
        <ContactForm id={formId} />
      </div>
      <p className="mt-4 text-center text-xs text-pearl/40">
        No spam · We reply within 24 hours
      </p>
    </div>
  );
}