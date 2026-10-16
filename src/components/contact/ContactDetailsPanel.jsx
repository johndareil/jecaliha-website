import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY } from "@/lib/site";

const [primaryPhone] = COMPANY.phone.split("/").map((part) => part.trim());
const telHref = `tel:+63${primaryPhone.replace(/\D/g, "").replace(/^0/, "")}`;

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-5 py-7">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-[11px] font-medium uppercase tracking-[0.3em] text-pearl/50">
          {label}
        </p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export default function ContactDetailsPanel() {
  return (
    <div>
      <p className="jbc-eyebrow text-gold">Reach Out</p>
      <h2 className="jbc-title mt-3 text-2xl text-pearl sm:text-3xl">
        Our Contact <span className="text-gold">Details</span>
      </h2>
      <div className="jbc-gold-rule mt-5" />
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-pearl/55">
        We are here to help you bring your construction vision to life. Reach out through any of the
        channels below.
      </p>

      <div className="mt-4 divide-y divide-white/10">
        <Row icon={Phone} label="Phone">
          <a
            href={telHref}
            className="text-sm text-pearl/85 transition-colors duration-300 hover:text-gold"
          >
            {COMPANY.phone}
          </a>
        </Row>

        <Row icon={Mail} label="Email">
          <a
            href={`mailto:${COMPANY.email}`}
            className="break-all text-sm leading-relaxed text-pearl/85 transition-colors duration-300 hover:text-gold"
          >
            {COMPANY.email}
          </a>
        </Row>

        <Row icon={MapPin} label="Address">
          <address className="not-italic text-sm leading-relaxed text-pearl/85">
            {COMPANY.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </Row>

        <Row icon={Clock} label="Working Hours">
          <dl className="max-w-xs space-y-1 text-sm text-pearl/85">
            {COMPANY.hours.map((entry) => (
              <div key={entry.day} className="flex justify-between gap-6">
                <dt>{entry.day}</dt>
                <dd className={entry.time === "Closed" ? "text-pearl/50" : "text-gold"}>
                  {entry.time}
                </dd>
              </div>
            ))}
          </dl>
        </Row>
      </div>
    </div>
  );
}