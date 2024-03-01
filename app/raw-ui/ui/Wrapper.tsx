"use client";

import { PropsWithChildren } from "react";

export const Wrapper = (props: PropsWithChildren) => {
  return (
    <div className="bg-stone-100 p-4 rounded-xl h-full overflow-scroll">
      {props.children}
      <div className="h-[4000px]"></div>
    </div>
  );
};
