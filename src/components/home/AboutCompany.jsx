import { Check } from "lucide-react";

const HIGHLIGHTS = [
  "Quality Craftsmanship",
  "On-Time Delivery",
  "Transparent Pricing",
  "Safety First",
];

const BLOCKS = [
  {
    title: "Mission",
    text: "To provide superior construction and specialized pool services rooted in honesty and excellence — delivering quality craftsmanship, transparent partnerships, and spaces that inspire and endure.",
  },
  {
    title: "Vision",
    text: "To be a premier and trusted leader in the general construction industry, recognized for transforming vision into reality through exceptional craftsmanship and innovation — driven by faith and integrity.",
  },
];

export default function AboutCompany() {
  return (
    <section id="about" className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="jbc-eyebrow text-gold-deep">About Our Company</p>
            <h2 className="jbc-title mt-4 text-3xl text-basalt sm:text-4xl lg:text-[2.6rem]">
              Building Stronger Foundations for Your Future
            </h2>
            <div className="jbc-gold-rule mt-6" />

            <p className="mt-7 text-[15px] leading-relaxed text-slate-600">
              Established on September 27, 2019, Jecaliha Builders Corporation began as a
              specialized swimming pool construction company. Today, we have expanded into a
              full-service general contractor — bringing the same standard of excellence to
              residential homes, commercial spaces, cafés, restaurants, and condo fit-outs.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
              Led by Founder &amp; CEO Warden L. Geraldo, we serve clients across Metro Manila,
              North Luzon, South Luzon, and the Visayas — committed to quality, transparency, and
              faith-based values.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-8">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                >
                  <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-basalt">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{block.text}</p>
                </article>
              ))}
            </div>

            <article className="rounded-2xl border border-slate-200 bg-basalt p-6 shadow-md transition-shadow duration-300 hover:shadow-gold-glow sm:p-8">
              <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Why Choose JBC?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pearl/70">
                We simplify the construction process from concept to completion — delivering
                reliable results, clear communication, and peace of mind for homeowners, business
                owners, and developers who demand the best.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}