import { useState } from "react";
import { motion } from "framer-motion";

// Shared asymmetric bento: 3 columns on desktop, two rows of [2,1] and [1,2].
// Clicking a single-column card swaps its row's spans and the other row's too.
export default function BentoGrid({ items, renderItem }) {
  const [swapped, setSwapped] = useState(false);

  const spans = swapped
    ? ["lg:col-span-1", "lg:col-span-2", "lg:col-span-2", "lg:col-span-1"]
    : ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];
  const wide = swapped ? [false, true, true, false] : [true, false, false, true];

  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-3">
      {items.slice(0, 4).map((item, index) => (
        <motion.div
          key={item.key}
          layout
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          className={["min-w-0", spans[index]].join(" ")}
        >
          {renderItem(item, {
            isWide: wide[index],
            toggle: () => setSwapped((value) => !value),
          })}
        </motion.div>
      ))}
    </div>
  );
}