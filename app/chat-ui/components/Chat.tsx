"use client";

import { useEffect, useRef } from "react";
import useScrollSnap from "./useScrollSnap";
import { useScroll, motion, useVelocity } from "framer-motion";

const Channel = () => {
  return (
    <div className="py-2">
      <div className="border p-4 rounded-xl bg-white/80 shadow-md backdrop-blur-[4px]">
        <div>#General</div>
        <div className="flex gap-2 h-0 overflow-hidden">
          <div className="size-12 min-w-12 flex rounded-md bg-stone-800"></div>
          <div className="flex flex-col">
            <div className="font-bold">Enes Tufekci</div>
            <div className="shrink">
              Feugiat sed lectus vestibulum mattis ullamcorper velit sed
              ullamcorper morbi tincidunt ornare massa, eget egestas purus
              viverra accumsan. Semper eget duis at tellus at urna condimentum
              mattis pellentesque id nibh!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ITEM_HEIGHT = 74;
const ITEM_COUNT = 10;

interface CalculateTopParams {
  totalItems: number;
  itemHeight: number;
  index: number;
  scrollYProgress: number;
}

function calculateTop(params: CalculateTopParams) {
  const { totalItems, itemHeight, index, scrollYProgress } = params;
}

function top(i: number, n: number) {
  return 1 / (Math.E ^ ((n * i) ^ 2));
}

export const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scrollVelocity = useVelocity(scrollYProgress);

  useEffect(() => {
    return scrollVelocity.on("change", (latest) => {});
  }, [scrollVelocity]);

  const index = 3;

  return (
    <div className="container max-w-2xl mx-auto flex items-center h-full">
      <div ref={ref} className="relative w-full h-[400px] overflow-scroll">
        <div style={{ height: `${ITEM_HEIGHT * ITEM_COUNT}px` }}></div>
        {Array.from({ length: ITEM_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              top: `${top(index - i, 1) * 140}px`,
              zIndex: 100 - i,
            }}
            data-scale={top(i + 0, 1)}
            className="absolute"
          >
            <div>
              {i}
              <Channel />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
