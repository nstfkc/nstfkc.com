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
      <div className="w-screen h-screen flex justify-center items-center relative">
        <div className="absolute w-full h-full bg-neutral-900 z-0">
          <BgNoise />
        </div>
        <div className="relative z-1">
          <div className="bg-neutral-900 px-16 py-8 rounded-xl recess">
            <div className="text-6xl text-white font-bold flex gap-4">
              <LuUsers />
              <div>700</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TwitterFollowers;
