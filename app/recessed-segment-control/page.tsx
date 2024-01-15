import { SegmentControl } from "./components/SegmentControl";

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

const RecessedSegmentControl = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="absolute z-[-1] top-0 left-0 w-full h-full bg-zinc-950">
        <BgNoise />
      </div>
      <div className="container max-w-2xl mx-auto p-4">
        <SegmentControl />
      </div>
    </div>
  );
};

export default RecessedSegmentControl;
