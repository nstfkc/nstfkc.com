"use client";

import { useContext, useEffect, useRef, useState } from "react";
import {
  useScroll,
  motion,
  useVelocity,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ConfigContext, ConfigProvider } from "./ConfigContext";

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
  return 1 / Math.pow(Math.E, Math.pow(x * a, 2));
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

const ScrollSnapChild = () => (
  <>
    {Array.from({ length: ITEM_COUNT }).map((_, i) => (
      <div
        className="scroll-snap-child"
        key={i}
        style={{ height: `${ITEM_HEIGHT}px` }}
      ></div>
    ))}
  </>
);

export const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scrollVelocity = useVelocity(scrollYProgress);

  const scrollY = useTransform(
    () => scrollYProgress.get() * ITEM_COUNT * ITEM_HEIGHT
  );

  return (
    <div className="container max-w-2xl mx-auto h-screen">
      <ConfigProvider>
        <div className="flex items-center h-full">
          <div
            ref={ref}
            className="relative w-full h-[400px] overflow-scroll bg-red-100 scroll-snap-container no-scrollbar"
          >
            {Array.from({ length: ITEM_COUNT }).map((_, i) => (
              <Item key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
            <ScrollSnapChild />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

const Item = (props: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const { index, scrollYProgress } = props;
  const { a, b, multiplier, offset } = useContext(ConfigContext);

  const t = useTransform(scrollYProgress, () => {
    const fullHeight = ITEM_COUNT * ITEM_HEIGHT;
    const dx = scrollYProgress.get();
    const x = ((dx * fullHeight) % ITEM_HEIGHT) / ITEM_HEIGHT;
    const currentIndex = Math.floor(dx * ITEM_COUNT);
    const s = dx * fullHeight * (ITEM_HEIGHT / 100);
    return top2(top2(index - currentIndex - x, a), b) * multiplier + offset + s;
  });

  const scale = useTransform(scrollYProgress, () => {
    const fullHeight = ITEM_COUNT * ITEM_HEIGHT;
    const dx = scrollYProgress.get();
    const x = ((dx * fullHeight) % ITEM_HEIGHT) / ITEM_HEIGHT;

    const currentIndex = Math.floor(dx * ITEM_COUNT);
    return top(index - currentIndex - x, 0.15);
  });

  const z = useTransform(scrollYProgress, () => {
    const dx = scrollYProgress.get();
    const currentIndex = Math.floor(dx * ITEM_COUNT);
    return Number(top(index - currentIndex, 0.1).toFixed(2)) * 100;
  });

  return (
    <motion.div
      style={{
        top: t,
        zIndex: z,
        scale: scale,
      }}
      className="absolute"
    >
      <Channel id={`${index}`} />
    </motion.div>
  );
};
