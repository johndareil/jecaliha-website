export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-basalt pb-14 pt-32 text-pearl sm:pb-16 sm:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(212,168,83,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,168,83,0.35)_1px,transparent_1px)] [background-size:88px_88px]"
      />
      <div className="absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {eyebrow && <p className="jbc-eyebrow text-gold">{eyebrow}</p>}
          <h1 className="jbc-title mt-4 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          <div className="jbc-gold-rule mt-6" />
          {subtitle && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pearl/65 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}