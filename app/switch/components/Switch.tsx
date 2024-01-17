"use client";

import { useState } from "react";

const Tip = () => {
  return (
    <svg height="100%" viewBox="0 0 20 100">
      <path d="M 4 0 L 16 0 L 20 100 L 0 100" fill="currentColor" />
    </svg>
  );
};

export const Switch = () => {
  const [state, setState] = useState(false);
  return (
    <div className="w-64 bg-gray-700 p-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="size-8 bg-gray-400 rounded-full"></div>
        <div className="w-2 h-10 bg-orange-400"></div>
      </div>
      <button
        onClick={() => setState((s) => !s)}
        data-open={state}
        className="group h-44 w-48 flex justify-center relative"
      >
        <div
          className={[
            "absolute h-full rotate-[30deg] text-gray-400 z-[1]",
            "transition-all duration-300 ease-in-out",
            "origin-[40%_75%]",
            "group-data-[open=true]:rotate-[-28deg]",
          ].join(" ")}
        >
          <Tip />
        </div>
        <div className="size-14 bg-gray-500 rounded-full bottom-4 absolute z-0"></div>
      </button>
    </div>
  );
};
