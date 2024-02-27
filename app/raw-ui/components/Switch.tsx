import { Root, Thumb } from "@radix-ui/react-switch";
import { ComponentProps } from "react";

export const Switch = (props: ComponentProps<typeof Root>) => {
  return (
    <Root
      className="border border-stone-600 w-[36px] h-[21px] bg-blackA6 rounded-full relative bg-stone-400 data-[state=checked]:bg-stone-800 outline-none cursor-default"
      style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
      {...props}
    >
      <Thumb className="block size-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[16px]" />
    </Root>
  );
};
