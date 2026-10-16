import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { COMPANY } from "@/lib/site";

export default function ContactInfo({ tone = "dark" }) {
  const isDark = tone === "dark";
  const valueClass = isDark ? "text-pearl/85" : "text-slate-700";

  const blocks = [
    {
      icon: Phone,
      label: "Phone",
      content: <p className={`text-sm ${valueClass}`}>{COMPANY.phone}</p>,
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a
          href={`mailto:${COMPANY.email}`}
          className={`break-words text-sm underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline ${valueClass}`}
        >
          {COMPANY.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: "Address",
      content: (
        <p className={`text-sm leading-relaxed ${valueClass}`}>
          {COMPANY.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      ),
    },
    {
      icon: Clock,
      label: "Working Hours",
      content: (
        <dl className={`space-y-1 text-sm ${valueClass}`}>
          {COMPANY.hours.map((entry) => (
            <div key={entry.day} className="flex items-baseline gap-3">
              <dt className="w-24 shrink-0 whitespace-nowrap">{entry.day}</dt>
              <dd>{entry.time}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {blocks.map((block) => (
        <div
          key={block.label}
          className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
              <block.icon className="h-4 w-4" />
            </span>
            <span className="jbc-eyebrow text-gold">{block.label}</span>
          </div>
          <div className="mt-4 min-w-0 break-words">{block.content}</div>
        </div>
      ))}
    </div>
  );
}