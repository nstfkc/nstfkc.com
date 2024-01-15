"use client";

import { Root, Thumb } from "@radix-ui/react-switch";

export const Switch = () => {
  return (
    <div className="p-[1px] bg-gradient-to-b from-neutral-950 to-neutral-700 rounded-full h-[27px]">
      <Root
        className={[
          "data-[state=checked]:bg-neutral-600",
          "bg-neutral-950",
          "w-[42px] h-[25px] rounded-full relative outline-none cursor-default",
        ].join(" ")}
      >
        <Thumb
          className={[
            "will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[18px]",
            "transition-transform duration-100 translate-x-0.5",
            "block w-[20px] h-[20px] shadow-sm bg-neutral-200 rounded-full",
          ].join(" ")}
        />
      </Root>
    </div>
  );
};
