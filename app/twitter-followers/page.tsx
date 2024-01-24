import { GeistMono } from "geist/font/mono";
import { LuUsers } from "react-icons/lu";

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

      <rect width="100%" height="100%" filter="url(#n)" opacity="0.30" />
    </svg>
  );
};

const TwitterFollowers = () => {
  return (
    <main className={GeistMono.className}>
      <div className="relative flex h-screen w-screen items-center justify-center">
        <div className="absolute z-0 h-full w-full bg-gradient-to-t from-slate-950 to-slate-900">
          <BgNoise />
        </div>
        <div className="z-1 relative">
          <div className="recess rounded-xl bg-black/50 px-16 py-8">
            <div className="flex gap-4 text-6xl font-bold text-white">
              <LuUsers />
              <div>865</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TwitterFollowers;
