"use client";

import { Root, Thumb } from "@radix-ui/react-switch";

export const Switch = () => {
  return (
    <Root className="border border-neutral-950 w-[42px] h-[25px] bg-blackA6 rounded-full relative bg-neutral-700 data-[state=checked]:bg-orange-500 outline-none cursor-default">
      <Thumb className="block w-[20px] h-[20px] shadow-sm bg-neutral-500 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-[18px]" />
    </Root>
  );
};
