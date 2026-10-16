import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Facebook,
  Linkedin,
  Link2,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Twitter,
  Ellipsis,
} from "lucide-react";

export default function ShareMenu({ url, title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title || "Jecaliha Builders Corporation project");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      window.prompt("Copy this project link", url);
    }
  };

  const moreOptions = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: title || "Jecaliha Builders Corporation", url });
      } catch (error) {
        /* dismissed */
      }
    } else {
      copyLink();
    }
    setOpen(false);
  };

  const items = [
    { label: "Copy Link", icon: Link2, onClick: copyLink },
    {
      label: "Messenger",
      icon: MessageCircle,
      href: `https://www.facebook.com/dialog/send?app_id=291494419107518&link=${encodedUrl}&redirect_uri=${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    { label: "WhatsApp", icon: Phone, href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    {
      label: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    { label: "More", icon: Ellipsis, onClick: moreOptions },
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 font-display text-[9px] uppercase tracking-[0.2em] text-pearl/80 transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        <Share2 className="h-3.5 w-3.5" />
        {copied ? "Copied" : "Share"}
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-max min-w-full overflow-hidden whitespace-nowrap rounded-xl border border-white/12 bg-basalt/95 p-1.5 shadow-2xl backdrop-blur-md"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const className =
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-pearl/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold";
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                role="menuitem"
                onClick={() => setOpen(false)}
                className={className}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={item.onClick}
                className={className}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label === "Copy Link" && copied ? "Link Copied" : item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}