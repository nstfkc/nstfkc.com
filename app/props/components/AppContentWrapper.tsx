"use client";
import { PropsWithChildren } from "react";
import { useAppShell } from "./AppShell";

export const AppContentWrapper = (props: PropsWithChildren) => {
  const { isSidebarCollapsedMobile } = useAppShell();
  return (
    <div
      className={[
        "w-full h-full transition-transform",
        !isSidebarCollapsedMobile ? "scale-[0.98] md:scale-[1]" : "",
      ].join(" ")}
    >
      {props.children}
    </div>
  );
};
