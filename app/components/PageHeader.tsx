import Image from "next/image";
import { CSSProperties, PropsWithChildren } from "react";
import { TbDotsVertical, TbPlus } from "react-icons/tb";

const people = ["ayla", "dave", "michael"];

export const PageHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-b-[1px] border-stone-200 p-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">{children}</div>
        <div className="flex items-center gap-2">
          <div className="flex row-reverse">
            {people.map((name, index) => {
              return (
                <div
                  key={name}
                  style={
                    {
                      "--z": Math.ceil(people.length / (index + 1) + 1),
                      "--ml": index === 0 ? "0" : "-6px",
                    } as CSSProperties
                  }
                  className="z-[--z] ml-[--ml]"
                >
                  <Image
                    alt="any"
                    src={`/people/${name}.png`}
                    width={24}
                    height={24}
                    className="rounded-full border border-white/80"
                  />
                </div>
              );
            })}
          </div>
          <button className="border border-stone-200 shadow-sm rounded-full w-[24px] h-[24px] flex justify-center items-center">
            <TbPlus className="text-sm" />
          </button>
          <button className="rounded-full w-[24px] h-[24px] flex justify-center items-center">
            <TbDotsVertical className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};
