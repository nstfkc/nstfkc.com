"use client";

import { useEffect, useState } from "react";
import { LuClipboard, LuCheck } from "react-icons/lu";

import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
} from "@radix-ui/react-tooltip";

export const CodeCopy = (props: { content: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <div className="relative">
      <Provider>
        <Root>
          <Trigger asChild>
            <button
              onClick={() => {
                navigator.clipboard.writeText(props.content).then(() => {
                  setIsCopied(true);
                });
              }}
              className="absolute top-2 right-2 size-8 flex items-center justify-center text-white text-sm bg-stone-700 hover:bg-stone-600 p-1 px-2 rounded-md font-medium"
            >
              {isCopied ? (
                <LuCheck className="text-green-500" />
              ) : (
                <LuClipboard className="text-gray-400 group-hover:text-white" />
              )}
            </button>
          </Trigger>
          <Portal>
            <Content
              className={[
                "rounded-md bg-white p-2 text-xs font-medium text-stone-700",
                "select-none leading-none shadow-md will-change-[transform,opacity]",
              ].join(" ")}
              sideOffset={5}
            >
              Copy
              <Arrow className="fill-white"></Arrow>
            </Content>
          </Portal>
        </Root>
      </Provider>
    </div>
  );
};
