import { useState } from "react";
import { motion } from "framer-motion";

// Featured-video bento: two rows, each pairing a large card (3/5 of the width,
// 380px tall) with a small one (2/5, natural 16:9). The small card in the first
// row hugs the bottom, the one in the second row hugs the top.
// Promoting a small card flips both rows at the same time.
export default function VideoGrid({ items, renderItem }) {
  const [swapped, setSwapped] = useState(false);

  const spans = swapped
    ? ["lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2"]
    : ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];
  const wide = swapped ? [false, true, true, false] : [true, false, false, true];

  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-5">
      {items.slice(0, 4).map((item, index) => (
        <motion.div
          key={item.key}
          layout
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          className={[
            "min-w-0",
            spans[index],
            wide[index] ? "" : index < 2 ? "lg:aspect-video lg:self-end" : "lg:aspect-video lg:self-start",
          ].join(" ")}
        >
          {renderItem(item, {
            isWide: wide[index],
            promote: () => setSwapped((value) => !value),
          })}
        </motion.div>
      ))}
    </div>
  );
}