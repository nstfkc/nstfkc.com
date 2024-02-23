"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { LuClipboard, LuCheck } from "react-icons/lu";

export const CodeCopy = (props: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <>
      <div ref={ref} className="hidden">
        {props.children}
      </div>
      <button
        onClick={() => {
          navigator.clipboard
            .writeText(
              ref.current
                ?.querySelector("code")
                ?.innerHTML.replaceAll("&lt;", "<")
                .replaceAll("&gt;", ">")
            )
            .then(() => {
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
    </>
  );
};
