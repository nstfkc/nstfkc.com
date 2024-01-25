import { LuActivity, LuShare2, LuUpload } from "react-icons/lu";

const BgNoise = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="n" x="0" y="0">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.5"
          stitchTiles="stitch"
        />
      </filter>

      <rect width="100%" height="100%" filter="url(#n)" opacity="0.1" />
    </svg>
  );
};

const Glass = () => {
  return (
    <div
      className={[
        "w-screen h-screen",
        "flex items-center justify-center",
        "bg-gradient-to-tr from-indigo-900 to-orange-900",
        "relative",
      ].join(" ")}
    >
      <div className="absolute w-full h-full inset-0">
        <BgNoise />
      </div>
      <div className="w-[400px] h-[400px] rounded-[48px] overflow-hidden">
        <div
          className={[
            "h-full bg-white/5 rounded-[42px] backdrop-blur-[1px]",
            "shadow-[inset_0_0_6px_2px_rgba(255,255,255,0.05)]",
            "p-6 overflow-hidden relative",
            "border border-white/5",
          ].join(" ")}
        >
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
