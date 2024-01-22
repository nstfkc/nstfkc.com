import { LuActivity, LuShare2, LuUpload } from "react-icons/lu";
import { BgNoise } from "@/components/BgNoise";

const Glass = () => {
  return (
    <div
      className={[
        "w-screen h-screen",
        "flex items-center justify-center",
        "bg-gradient-to-tr from-gray-900 via-green-900 to-gray-800",
      ].join(" ")}
    >
      <div className="w-[400px] h-[400px] rounded-[36px] overflow-hidden">
        <div
          className={[
            "h-full bg-white/5 rounded-[32px] backgrop-blur-[10px]",
            "shadow-[inset_0_0_2px_1px_rgba(255,255,255,0.1)]",
            "p-6",
          ].join(" ")}
        >
          <div>
            <BgNoise />
          </div>
          <div className="flex justify-end">
            <div>
              <button
                className={[
                  "bg-white/10 size-8 rounded-full text-gray-300",
                  "flex items-center justify-center",
                  "border border-gray-900/5",
                  "shadow-[0_0_0px_1px_rgba(255,255,255,0.3)]",
                ].join(" ")}
              >
                <LuActivity />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glass;
