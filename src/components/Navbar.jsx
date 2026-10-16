import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_ITEMS } from "@/lib/site";

function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src={COMPANY.logo}
        alt="Jecaliha Builders Corporation"
        className="h-8 w-8 shrink-0 rounded-sm object-contain"
      />
      <span className="whitespace-nowrap font-heading text-[10.5px] font-semibold uppercase leading-none tracking-[0.1em] text-pearl sm:text-[13px] sm:tracking-[0.16em]">
        {COMPANY.name}
      </span>
    </span>
  );
}

function NavItems() {
  return (
    <nav className="flex items-center gap-7">
      {NAV_ITEMS.map((item) => {
        const isQuote = item.label === "Get a Free Quote";
        return (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap text-[13px] font-medium tracking-wide transition-colors duration-300",
                isQuote
                  ? cn(
                      "rounded-md border px-3 py-2",
                      isActive
                        ? "border-gold bg-gold text-basalt"
                        : "border-gold/70 text-gold hover:bg-gold hover:text-basalt"
                    )
                  : cn(
                      "border-b-2 border-transparent pb-0.5 text-pearl/85 hover:text-gold",
                      isActive && "border-gold text-gold"
                    )
              )
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function MobileItems({ onNavigate }) {
  return (
    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
      {NAV_ITEMS.map((item) => {
        const isQuote = item.label === "Get a Free Quote";
        return (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium tracking-wide transition-colors duration-300",
                isQuote
                  ? cn(
                      "my-2 rounded-md border px-3 py-2.5 text-center",
                      isActive
                        ? "border-gold bg-gold text-basalt"
                        : "border-gold/70 text-gold hover:bg-gold hover:text-basalt"
                    )
                  : cn(
                      "border-b border-white/5 py-3 text-pearl/90 hover:text-gold",
                      isActive && "text-gold"
                    )
              )
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function NavigationBar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null);
  const probeRef = useRef(null);

  // The burger appears only once the nav items would reach the company name.
  useLayoutEffect(() => {
    const measure = () => {
      const bar = barRef.current;
      const probe = probeRef.current;
      if (!bar || !probe) return;
      const styles = window.getComputedStyle(bar);
      const available =
        bar.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      setCompact(probe.getBoundingClientRect().width > available - 8);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (barRef.current) observer.observe(barRef.current);
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b bg-basalt/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-white/10 shadow-[0_12px_34px_rgba(0,0,0,0.45)]" : "border-white/5"
        )}
      >
        <div
          ref={barRef}
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
          >
            <div ref={probeRef} className="flex h-full w-max items-center">
              <span className="flex items-center gap-8 whitespace-nowrap">
                <Brand />
                <span className="flex items-center gap-7">
                  {NAV_ITEMS.map((item) => (
                    <span key={item.label} className="text-[13px] font-medium tracking-wide">
                      {item.label}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </div>

          <Link to="/" className="flex shrink-0 items-center" aria-label={COMPANY.name}>
            <Brand />
          </Link>

          {!compact && <NavItems />}

          {compact && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {compact && open && (
        <div className="border-b border-white/10 bg-basalt/98 backdrop-blur-md">
          <MobileItems onNavigate={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}