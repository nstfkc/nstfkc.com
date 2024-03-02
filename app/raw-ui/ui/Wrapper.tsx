"use client";

import { PropsWithChildren } from "react";

export const Wrapper = (props: PropsWithChildren) => {
  return (
    <div className="bg-stone-100 max-w-[100vw] overflow-x-hidden p-4 md:rounded-xl h-full overflow-y-scroll md:overflow-x-hidden">
      {props.children}
    </div>
  );
};
