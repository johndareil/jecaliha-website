import { Link } from "react-router-dom";
import { Facebook, Youtube, Mail, MapPin, Phone, Clock } from "lucide-react";
import { COMPANY, NAV_ITEMS, SERVICES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-basalt text-pearl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={COMPANY.logo}
                alt="Jecaliha Builders Corporation"
                className="h-9 w-9 rounded-sm object-contain"
              />
              <span className="font-heading text-[11px] font-semibold uppercase leading-tight tracking-[0.14em]">
                Jecaliha Builders
                <br />
                Corporation
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-pearl/60">
              PCAB-licensed general contractor established {COMPANY.established}. From specialized
              pool construction to full design-and-build delivery.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-pearl/80 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-pearl/80 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="jbc-eyebrow text-gold">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-pearl/70 transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="jbc-eyebrow text-gold">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <Link
                    to="/services"
                    className="text-pearl/70 transition-colors duration-300 hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="jbc-eyebrow text-gold">Get In Touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-pearl/70">
              <li className="flex min-w-0 gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-words">{COMPANY.phone}</span>
              </li>
              <li className="flex min-w-0 gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="min-w-0 break-words hover:text-gold"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex min-w-0 gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-words">
                  {COMPANY.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <div className="mt-5 flex min-w-0 gap-3 text-xs text-pearl/55">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <dl className="min-w-0 flex-1 space-y-1">
                {COMPANY.hours.map((entry) => (
                  <div key={entry.day} className="flex justify-between gap-6">
                    <dt>{entry.day}</dt>
                    <dd>{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-pearl/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="jbc-eyebrow text-pearl/40">Quality · Transparency · Faith</p>
        </div>
      </div>
    </footer>
  );
}