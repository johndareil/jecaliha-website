import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { HOME_MEDIA } from "@/lib/site";

export const HERO_IMAGE = HOME_MEDIA.hero;

const STATS = [
  { value: "50+", label: "Projects Completed" },
  { value: "17+", label: "Years Experience" },
  { value: "100+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-basalt pb-48 pt-28 sm:pb-40">
      <Image
        src={HERO_IMAGE}
        alt="Luxury construction site at golden hour"
        fittingType="fill"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-basalt/92 via-basalt/78 to-basalt" />

      <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="jbc-title text-[2rem] text-pearl sm:text-5xl lg:text-[4.25rem]"
        >
          Building Your Vision,
          <span className="mt-2 block text-gold">One Brick at a Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-pearl/70 sm:text-lg"
        >
          “The best way to predict the future is to build it.” — We turn blueprints into reality
          with precision, passion, and excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-basalt transition-all duration-300 hover:bg-gold-soft hover:shadow-gold-glow sm:w-auto"
          >
            Get a Free Quote
          </Link>
          <Link
            to="/services"
            className="inline-flex w-full items-center justify-center rounded-lg border border-pearl/25 px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-pearl transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto"
          >
            Our Services
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-basalt/55 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:py-7">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-heading text-2xl font-semibold text-gold sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-pearl/60 sm:text-[11px]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}