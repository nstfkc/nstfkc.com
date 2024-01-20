"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FaSpotify } from "react-icons/fa6";
import {
  TbBrandSpotify,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
} from "react-icons/tb";
import {
  MusicPlayer,
  useMusicPlayer,
  useMusicPlayerProgress,
  useMusicPlayerState,
} from "./MusicPlayer";

const CircularProgress = ({ percentage }: { percentage: number }) => {
  // Calculate the circumference of the circle based on its radius
  const radius = 44; // You can adjust the radius as needed
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke-dashoffset to represent the progress
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height="100%" width="100%" viewBox="0 0 100 100">
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
      />

      {/* Progress Circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeLinecap="round"
        stroke="rgba(88,240,160,1)"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};
const SpotifySvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="spotify">
      <g
        fill="none"
        stroke="#303c42"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-name="<Group>"
      >
        <path
          d="M5.5 15.5c3.42-.83 8.34-.72 11.5 1.5M5 12c5.77-1 10-.53 13.5 2m-14-5.5C9.19 6.84 15.81 7.16 20 10"
          data-name="<Path>"
          stroke="currentColor"
        ></path>
      </g>
    </svg>
  );
};

const songs = [
  { title: "Lofi Study", url: "/audio/lofi-study.mp3" },
  { title: "Good night", url: "/audio/good-night.mp3" },
  { title: "Once in paris", url: "/audio/once-in-paris.mp3" },
  { title: "Spirit blossom", url: "/audio/spirit-blossom.mp3" },
  { title: "Tokyo Cafe", url: "/audio/tokyo-cafe.mp3" },
  { title: "Watr fluid", url: "/audio/watr-fluid.mp3" },
];

const Visualizer = ({ player }: { player: MusicPlayer }) => {
  const timer = useRef<NodeJS.Timeout>();
  const [freqArray, setFreqArray] = useState<number[]>(
    Array.from(Array(16)).map(() => 0)
  );

  useEffect(() => {
    timer.current = setInterval(() => {
      const array = player.getByteFrequencyData();
      setFreqArray(array);
    }, 1000 / 60);
    return () => {
      clearInterval(timer.current!);
    };
  }, [player]);

  return (
    <div className="w-full h-32 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]">
      {freqArray.slice(1, 15).map((f, i) => {
        return (
          <div key={i} className="col-span-1 flex flex-col gap-[3px]">
            {Array.from(Array(15)).map((_, j) => (
              <div
                key={j}
                data-on={(f + 1) / j > 16}
                className="group w-full flex gap-[3px]"
              >
                <div className="transition-colors group-data-[on=true]:bg-zinc-900 bg-[rgba(30,245,140,1)] basis-1/2 aspect-square rounded-full bg-green-200"></div>
                <div className="transition-colors group-data-[on=true]:bg-zinc-900 bg-[rgba(30,245,140,1)] basis-1/2 aspect-square rounded-full bg-green-200"></div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const PlayButton = ({ player }: { player: MusicPlayer }) => {
  const { playing } = useMusicPlayerState(player);
  const progress = useMusicPlayerProgress(player);
  return (
    <div className="size-16 text-zinc-900 relative">
      <button
        onClick={() => {
          player.toggle();
        }}
        className="size-16 text-white/90 text-2xl border-zinc-900 border-4 rounded-full flex items-center justify-center active:scale-[0.98] active:bg-black/20"
      >
        {playing ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
      </button>
      <div className="inset-0 absolute w-full h-full pointer-events-none">
        <CircularProgress percentage={Math.min(100, progress)} />
      </div>
    </div>
  );
};
const Light = ({ player }: { player: MusicPlayer }) => {
  const { playing } = useMusicPlayerState(player);
  const timer = useRef<NodeJS.Timeout>();
  const [on, setOn] = useState(false);

  useEffect(() => {
    timer.current = setInterval(() => {
      setOn((s) => !s);
    }, 1000);
    return () => {
      clearInterval(timer.current!);
    };
  }, [playing]);

  return (
    <div className="flex justify-center">
      <div
        data-on={on && playing}
        className={[
          "group relative size-14 rounded-full flex items-center justify-center bg-zinc-900",
          "data-[on=true]:shadow[inset_0_0_12px_rgba(0,255,0,1)]",
        ].join(" ")}
      >
        <div
          className={[
            "w-full h-full rounded-full",
            "group-data-[on=true]:text-green-200 text-zinc-800",
          ].join(" ")}
        >
          <SpotifySvg />
        </div>
        <div
          style={{
            background: "radial-gradient(rgba(30,215,96,0.1),transparent)",
          }}
          className="absolute z-1 size-48 rounded-full blur-xl opacity-0 group-data-[on=true]:opacity-100"
        ></div>
      </div>
    </div>
  );
};

export const Player = () => {
  const player = useMusicPlayer(songs.map((s) => s.url));

  const { currentUrl } = useMusicPlayerState(player);
  const song = songs.find((s) => s.url === currentUrl)!;

  return (
    <div
      className={[
        "w-[320px] rounded-[24px] p-[1px]",
        "bg-gradient-to-br from-zinc-600/60 to-zinc-700/60",
      ].join(" ")}
    >
      <div className="w-full h-full bg-zinc-800 flex flex-col gap-8 rounded-[23px] p-8">
        <Light player={player} />
        <div>
          <Visualizer player={player} />
        </div>
        <div className="text-white/90">{song?.title}</div>
        <div className="flex items-center justify-between text-white/90 w-full px-8">
          <button
            onClick={() => player.prev()}
            className="size-12 border-zinc-900 border-4 rounded-full flex items-center justify-center active:scale-[0.98] active:bg-black/20"
          >
            <TbPlayerTrackPrevFilled />
          </button>
          <PlayButton player={player} />

          <button
            onClick={() => player.next()}
            className="size-12 border-zinc-900 border-4 rounded-full flex items-center justify-center active:scale-[0.98] active:bg-black/20"
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </div>
  );
};
