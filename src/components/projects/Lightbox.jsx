import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ images, index, onClose, onIndexChange }) {
  const total = images.length;

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index, total, onClose, onIndexChange]);

  if (!total) return null;

  // Portalled to <body> so it covers the viewport, not the modal box.
  return createPortal(
    <div
      data-lightbox
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
    >
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index - 1 + total) % total);
        }}
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-pearl backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <img
        src={images[index]}
        alt={`Project photo ${index + 1} of ${total}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
      />

      <button
        type="button"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index + 1) % total);
        }}
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-pearl backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Close gallery"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-pearl backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6 sm:top-6"
      >
        <X className="h-4 w-4" />
      </button>

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 font-display text-[10px] tracking-[0.2em] text-pearl/80 backdrop-blur">
        {index + 1} / {total}
      </span>
    </div>,
    document.body
  );
}