import Link from "next/link";
import { work } from "./data";
import Image from "next/image";
import { LuArrowUpRightSquare, LuCode2 } from "react-icons/lu";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-zinc-200 to-zinc-50 text-zinc-700 font-mono">
      <div className="container max-w-xl mx-auto flex flex-col gap-8 py-8">
        {work.map((item) => (
          <div
            key={item.url}
            className="flex flex-col gap-2 p-4 bg-white/50 md:rounded-[14px]"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">{item.label}</div>
              <div className="flex gap-4 items-center">
                <a
                  className="flex items-center gap-1 opacity-75 text-sm px-2 py-1 rounded-md bg-black/5"
                  href={`https://github.com/nstfkc/ui-ux/tree/main/app${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code <LuCode2 />
                </a>
                <Link
                  href={item.url}
                  className="flex items-center gap-1 opacity-75 text-sm px-2 py-1 rounded-md bg-black/5"
                >
                  Preview <LuArrowUpRightSquare />
                </Link>
              </div>
            </div>
            <div className="text-sm">
              Design:{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.designer.url}
                className="font-semibold underline"
              >
                {item.designer.label}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {item.images.map((image) => {
                return (
                  <div
                    key={image.src}
                    className="rounded-[10px] overflow-hidden border"
                  >
                    <Image alt={item.label} src={image} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
