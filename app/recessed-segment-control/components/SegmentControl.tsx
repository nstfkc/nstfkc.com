"use client";

import { ComponentProps, useState } from "react";
import { TbCommand } from "react-icons/tb";

const Control = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={[
        "w-1/3 h-full absolute z-[0] top-0 left-[--left] p-1 transition-all",
        className,
      ].join(" ")}
    >
      <div className="bg-gradient-to-b from-zinc-700 to-zinc-800 h-full w-full rounded-[9px] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)]"></div>
    </div>
  );
};

export const SegmentControl = () => {
  const [activeSegment, setActiveSegment] = useState(0);
  return (
    <div className="text-white rounded-[12px] recess">
      <div className="bg-neutral-900 rounded-[12px] relative w-full">
        <Control style={{ "--left": `${(100 / 3) * activeSegment}%` }} />
        <div className="z-1 w-full flex relative">
          <button
            data-active={activeSegment === 0}
            onClick={() => setActiveSegment(0)}
            className="group w-1/3 p-4 data-[active=true]:opacity-100 opacity-50 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <TbCommand />
              Label
            </div>
            <span
              className={[
                "text-sm bg-white/20 rounded-full px-2 group-data-[active=true]:bg-teal-400/30",
                "transtion-color delay-200",
              ].join(" ")}
            >
              32
            </span>
          </button>
          <button
            data-active={activeSegment === 1}
            onClick={() => setActiveSegment(1)}
            className="group w-1/3 p-2 data-[active=true]:opacity-100 opacity-50"
          >
            Control 1
          </button>
          <button
            data-active={activeSegment === 2}
            onClick={() => setActiveSegment(2)}
            className="group w-1/3 p-2 data-[active=true]:opacity-100 opacity-50"
          >
            Control 2
          </button>
        </div>
      </div>
    </div>
  );
};
