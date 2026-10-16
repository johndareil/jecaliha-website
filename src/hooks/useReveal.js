import { useEffect, useRef } from "react";

// Re-runs the reveal observer whenever the dependency list changes, so freshly
// filtered or searched cards animate in too.
export default function useReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((target) => {
      target.classList.remove("is-visible");
      observer.observe(target);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}