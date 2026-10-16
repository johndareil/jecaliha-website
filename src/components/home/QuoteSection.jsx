import { Quote } from "lucide-react";
import { HOME_MEDIA } from "@/lib/site";

export default function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-basalt py-12 sm:py-14 lg:py-16">
      <img
        src={HOME_MEDIA.quote}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-basalt/75" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Quote className="mx-auto h-8 w-8 text-gold/50" />
        <p className="mt-8 font-heading text-xl font-medium leading-snug text-pearl sm:text-2xl lg:text-[2.1rem]">
          “A strong foundation doesn&apos;t come from cutting costs — it comes from investing in
          quality.”
        </p>
        <div className="jbc-gold-rule mx-auto mt-9" />
      </div>
    </section>
  );
}