"use client";
import { ComponentProps, useEffect, useState } from "react";

import { Root, Thumb } from "@radix-ui/react-switch";

export const Switch = ({ checked, onCheckedChange }) => {
  return (
    <Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="border border-neutral-950 w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-neutral-700 data-[state=checked]:bg-green-400/60 outline-none cursor-default"
    >
      <Thumb className="block w-[20px] h-[20px] shadow-sm bg-neutral-500 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[18px]" />
    </Root>
  );
};

const Chart = ({ className, size }: { className: string; size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 20.5V4.25c0-.728-.002-1.2-.048-1.546c-.044-.325-.115-.427-.172-.484c-.057-.057-.159-.128-.484-.172C12.949 2.002 12.478 2 11.75 2c-.728 0-1.2.002-1.546.048c-.325.044-.427.115-.484.172c-.057.057-.128.159-.172.484c-.046.347-.048.818-.048 1.546V20.5z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M8 8.75A.75.75 0 0 0 7.25 8h-3a.75.75 0 0 0-.75.75V20.5H8zm12 5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v6.75H20z"
        opacity=".7"
      />
      <path
        fill="currentColor"
        d="M1.75 20.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5H2z"
        opacity=".5"
      />
    </svg>
  );
};
const Layer = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={[
        "transition transition-all duration-1000 rounded-[12px] absolute h-[60px] w-full",
        className,
      ].join(" ")}
      {...props}
    />
  );
};

export const Layers = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="w-[400px] relative h-[80dvh]">
      <Layer
        style={{ "--top": collapse ? "40dvh" : "0dvh" }}
        className="shadow-[0px_0px_0px_6px_rgba(0,0,0,0.4)] top-[--top]"
      />

      <Layer
        style={{ "--top": collapse ? "40dvh" : "10dvh" }}
        className="bg-gradient-to-b from-white/10 to-transparent top-[--top]"
      />
      <Layer
        style={{ "--top": collapse ? "40dvh" : "20dvh" }}
        className="p-[2px] top-[--top]"
      >
        <div className="rounded-[11px] bg-zinc-800/90 h-full"></div>
      </Layer>
      <Layer
        style={{ "--top": collapse ? "40dvh" : "30dvh" }}
        className="top-[--top] overflow-hidden"
      >
        <div className="w-[40%] h-[100px] absolute rotate-[15deg] opacity-50 left-[-8%] top-[-50%] bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
      </Layer>
      <Layer
        style={{ "--top": collapse ? "40dvh" : "40dvh" }}
        className="top-[--top] flex items-center gap-4 text-white px-6 text-2xl text-white/80"
      >
        <Chart size={30} className="text-6xl text-green-400" />
        <div>Analytics</div>
      </Layer>
      <div
        className="absolute top-[60dvh] text-white flex justify-center w-full gap-3"
        onClick={() => setCollapse((s) => !s)}
      >
        <Switch
          id="toggle"
          checked={!collapse}
          onCheckedChange={(s) => setCollapse(s)}
        />
        <label htmlFor="toggle">Show layers</label>
      </div>
    </div>
  );
};
