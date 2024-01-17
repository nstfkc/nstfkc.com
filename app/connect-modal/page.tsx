import { LuBrainCircuit } from "react-icons/lu";
import { TbBrandEtsy } from "react-icons/tb";

const Bars = () => {
  const w = 40;
  const offset = 46;
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200">
      {Array.from(Array(15)).map((_, i) => (
        <line
          key={i}
          y1={i * w - offset}
          x1="0"
          y2={i * w - offset}
          x2="400"
          stroke="currentColor"
        ></line>
      ))}
      {Array.from(Array(15)).map((_, i) => (
        <line
          key={i}
          x1={i * w}
          y1="-20"
          x2={i * w}
          y2="220"
          stroke="currentColor"
        ></line>
      ))}
    </svg>
  );
};

const ConnectModal = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-stone-200/70 text-stone-700">
      <div className="relative max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="absolute w-full left-0 top-0 aspect-video z-[2] shadow-[inset_0_0_100px_84px_rgba(255,255,255,1)]"></div>
        <div className="absolute w-full left-0 top-0 aspect-video z-[1] text-gray-300">
          <Bars />
        </div>
        <div className="flex flex-col gap-8 p-8 relative z-[2]">
          <div className="flex justify-center items-center">
            <div className="size-12 bg-stone-100 rounded-[12px] p-[3px]">
              <div className="w-full h-full bg-white rounded-[10px] shadow-sm flex items-center justify-center">
                <LuBrainCircuit className="text-2xl text-gray-600" />
              </div>
            </div>
            <div className="flex flex-col gap-2 py-10">
              <div className="w-8 h-[2px] relative">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="w-[4px] h-[4px] blur-sm bg-blue-500 absolute right-[0%] animate-moveToRight"></div>
              </div>
              <div className="w-8 h-[2px] relative">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="w-[4px] h-[4px] blur-sm bg-blue-500 absolute right-[100%] animate-moveFromRight"></div>
              </div>
              <div className="w-8 h-[2px] relative">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50 animate-pulse"></div>
                <div className="w-[4px] h-[4px] blur-sm bg-blue-500 absolute right-[0%] animate-moveToRight"></div>
              </div>
            </div>
            <div className="size-12 bg-stone-100 rounded-[12px] p-[3px]">
              <div className="w-full h-full bg-white rounded-[10px] shadow-sm flex items-center justify-center">
                <TbBrandEtsy className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <div className="text-center text-xl font-bold tracking-wide">
              Connect Your Etsy Shop
            </div>
            <p className="text-center text-sm font-light">
              We use official channel of Etsy for connecting to your shop
              securely. You can remove our access at any time
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className={[
                "text-white text-sm",
                "h-[36px] p-[1px] min-w-[128px]",
                "rounded-[10px] border border-blue-600",
                "bg-blue-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
                "active:shadow-none",
              ].join(" ")}
            >
              Connect
            </button>
            <button
              className={[
                "text-sm",
                "h-[36px] p-[1px] min-w-[128px]",
                "rounded-[10px] border border-stone-200",
              ].join(" ")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
