import { useEffect } from "react";
import { X } from "lucide-react";

export default function ModalFrame({
  onClose,
  header,
  children,
  size = "max-w-5xl",
  fullScreenMobile = false,
  closeLabel = "Close project details",
}) {
  useEffect(() => {
    const handleKey = (event) => {
      // The lightbox owns Escape while it is open.
      if (event.key === "Escape" && !document.querySelector("[data-lightbox]")) onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-sm"
    >
      {/* min-h-full (not a fixed height) keeps tall panels scrollable from the top
          while short panels stay vertically centred. */}
      <div className="flex min-h-full items-start justify-center sm:items-center sm:p-4">
        <div
          onClick={(event) => event.stopPropagation()}
          className={[
            "relative w-full overflow-hidden bg-basalt text-pearl shadow-2xl sm:my-8 sm:rounded-2xl",
            size,
            fullScreenMobile ? "min-h-screen sm:min-h-0" : "",
          ].join(" ")}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-basalt/95 px-4 py-3 backdrop-blur sm:px-5">
            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3">
              {header}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-pearl/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}