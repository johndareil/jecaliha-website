export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={[
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <p className={`jbc-eyebrow ${isDark ? "text-gold" : "text-gold-deep"}`}>{eyebrow}</p>
      )}
      <h2
        className={[
          "jbc-title mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-pearl" : "text-basalt",
        ].join(" ")}
      >
        {title}
      </h2>
      <div
        className={["jbc-gold-rule mt-6", align === "center" ? "mx-auto" : ""].join(" ")}
      />
      {subtitle && (
        <p
          className={[
            "mt-6 text-base leading-relaxed sm:text-lg",
            isDark ? "text-pearl/65" : "text-slate-600",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}