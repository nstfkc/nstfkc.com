"use client";

import * as Switch from "@radix-ui/react-switch";

export const Toggle = () => {
  return (
    <Switch.Root asChild>
      <button className="group p-[2px] rounded-full bg-white shadow-[inset_0_0_16px_2px_rgba(0,0,0,0.07)] relative">
        <div
          className={[
            "p-1 rounded-full shadow-[inset_0_6px_16px_8px_rgba(0,0,0,0.2)]",
            "bg-gradient-to-b from-yellow-700/50 to-yellow-300/50",
            "group-data-[state=checked]:from-yellow-700 group-data-[state=checked]:to-yellow-300",
          ].join(" ")}
        >
          <div className="w-[6rem] rounded-full">
            <Switch.Thumb asChild>
              <div className="transition-transform data-[state=checked]:translate-x-[3rem] size-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-400 shadow-[0_0_2px_2px_rgba(0,0,0,0.2)] rounded-full">
                <div className="size-12 rounded-full bg-gradient-to-b from-orange-100/50 to-orange-300/50 flex items-center justify-center">
                  <div className="blur-[2px] shadow-[-1px_0_2px_4px_rgba(0,0,0,0.05)] rounded-full">
                    <div className="size-8 rounded-full shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.05)] bg-gradient-to-b from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </Switch.Thumb>
          </div>
        </div>
      </button>
    </Switch.Root>
  );
};
