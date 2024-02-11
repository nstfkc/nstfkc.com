"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useVelocity, useTransform } from "framer-motion";

const Channel = (props: { id: string }) => {
  return (
    <div className="py-2">
      <div className="border p-4 rounded-xl bg-white/80 shadow-md backdrop-blur-[4px]">
        <div>#General {props.id}</div>
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
const ITEM_COUNT = 20;

interface CalculateTopParams {
  totalItems: number;
  itemHeight: number;
  index: number;
  scrollYProgress: number;
}

function top(x: number, a = 1) {
  return Number((1 / Math.pow(Math.E, Math.pow(x * a, 2))).toFixed(2));
}

function top2(x: number, a = 1) {
  return Math.atan(x / a);
}

function calcX(x: number, a = 1) {
  return 1 / Math.pow(Math.E, Math.pow(x, 2) * a);
}

function calcX2(x: number, a = 1) {
  return Math.sqrt((Math.asin(x) / 2) * Math.E);
}

export const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scrollVelocity = useVelocity(scrollYProgress);

  const [index, setIndex] = useState(0);
  const [a, setA] = useState(1.42);
  const [b, setB] = useState(1.4);
  const [multiplier, setMultiplier] = useState(160);
  const [offset, setOffset] = useState(120);
  const scrollY = useTransform(
    () => scrollYProgress.get() * ITEM_COUNT * ITEM_HEIGHT
  );

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.floor(latest * ITEM_COUNT);
      setIndex(index);
    });
  }, [scrollYProgress]);

  const t = Array.from({ length: ITEM_COUNT }).map((_, i) => [
    top2(top2(i - index, a), b) * multiplier + offset,
  ]);

  return (
    <div className="container max-w-2xl mx-auto h-full">
      <div>
        <div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">a: {a}</label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.01}
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">b: {b}</label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">multiplier: {multiplier}</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">offset: {offset}</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center h-full">
        <div
          ref={ref}
          className="relative w-full h-[400px] overflow-scroll bg-red-100"
        >
          <motion.div
            className="relative bg-green-100"
            style={{ top: scrollY, height: "400px" }}
          >
            {Array.from({ length: ITEM_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                style={{
                  top: `${t[i]}px`,
                  zIndex: top(index - i, 0.1) * 100,
                  scale: top(index - i, 0.1),
                }}
                data-scale={top(i + 0, 1)}
                className="absolute"
              >
                <Channel id={`${i}`} />
              </motion.div>
            ))}
          </motion.div>
          <div style={{ height: `${ITEM_HEIGHT * ITEM_COUNT}px` }}></div>
        </div>
      </div>
    </div>
  );
};
