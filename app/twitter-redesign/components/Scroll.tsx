"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";

const Scroll = ({ children }) => {
  return (
    <ScrollArea.Root className={["h-dvh overflow-hidden"].join(" ")}>
      <ScrollArea.Viewport className="h-full w-full">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="hidden" orientation="vertical" />
    </ScrollArea.Root>
  );
};

Scroll.displayName = "Scroll";

export default Scroll;
