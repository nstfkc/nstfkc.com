"use client";
import { useEffect, useRef, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import {
  TbBrandSpotify,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbPlayerPlayFilled,
} from "react-icons/tb";

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
  { title: "Lofi Study", url: "lofi-study.mp3" },
  { title: "Good night", url: "good-night.mp3" },
  { title: "Once in paris", url: "once-in-paris.mp3" },
  { title: "Spirit blossom", url: "spirit-blossom.mp3" },
  { title: "Tokyo Cafe", url: "tokyo-cafe.mp3" },
  { title: "Watr fluid", url: "watr-fluid" },
];

class Sound {
  audio: HTMLAudioElement = null;
  ctx: AudioContext = null;
  audioBuffer: AudioBuffer = null;
  gainNode: GainNode;
  nodeIndex = 0;
  analyser: AnalyserNode = null;
  nodes: Map<number, AudioBufferSourceNode> = new Map();
  source: AudioBufferSourceNode;
  time: number = 0;

  constructor(private buffer: ArrayBuffer) {
    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 32;

    this.ctx.decodeAudioData(buffer).then((audioBuffer) => {
      this.audioBuffer = audioBuffer;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.5;

      this.source = this.ctx.createBufferSource();
      this.source.buffer = this.audioBuffer;
      this.source.connect(this.analyser).connect(this.ctx.destination);
    });
  }

  init() {}

  play() {
    try {
      this.source.start(0);
    } catch (err) {
      this.ctx.resume();
      // Do something
    }
  }

  pause() {
    this.ctx.suspend();
  }
  toggle() {
    if (this.ctx.state === "running") {
      this.pause();
    } else {
      this.play();
    }
  }
}

export const Player = () => {
  const timer = useRef(0);
  const [songIndex, setSongIndex] = useState(1);
  const sound = useRef<Sound | null>(null);

  const [on, setOn] = useState(false);

  const abortController = new AbortController();

  const [freqArray, setFreqArray] = useState<number[]>(
    Array.from(Array(16)).map(() => 0)
  );

  const nextSong = () => {
    setSongIndex((s) => {
      if (s >= songs.length) {
        return 0;
      }
      return s + 1;
    });
  };

  useEffect(() => {
    abortController.abort();
    fetch(`/audio/${songs[songIndex].url}`, { signal: abortController.signal })
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        sound.current = new Sound(buf);
      });
  }, [songIndex]);

  useEffect(() => {
    timer.current = setInterval(() => {
      /* setOn((s) => !s); */
      const bufferLength = sound.current.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      sound.current.analyser.getByteFrequencyData(dataArray);
      if (sound.current.ctx.state === "running") {
        setFreqArray(Array.from(dataArray));
      }
    }, 2499999);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const progress =
    (sound.current?.ctx?.currentTime * 100) /
    sound.current?.audioBuffer?.duration;

  const song = songs[songIndex];
  return (
    <div
      className={[
        "w-[320px] rounded-[24px] p-[1px]",
        "bg-gradient-to-br from-zinc-600/60 to-zinc-700/60",
      ].join(" ")}
    >
      <div className="w-full h-full bg-zinc-800 flex flex-col gap-8 rounded-[23px] p-8">
        <div className="flex justify-center">
          <div
            data-on={on}
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
        <div>
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
        </div>
        <div className="text-white/90">{song.title}</div>
        <div className="flex items-center justify-between text-white/90 w-full px-8">
          <button className="size-12 border-zinc-900 border-4 rounded-full flex items-center justify-center">
            <TbPlayerTrackPrevFilled />
          </button>
          <div className="size-16 text-zinc-900 relative">
            <button
              onClick={() => {
                sound.current.toggle();
              }}
              className="size-16 text-white/90 text-2xl border-zinc-900 border-4 rounded-full flex items-center justify-center"
            >
              <TbPlayerPlayFilled />
            </button>
            <div className="inset-0 absolute w-full h-full pointer-events-none">
              <CircularProgress percentage={Math.min(100, progress)} />
            </div>
          </div>

          <button
            onClick={nextSong}
            className="size-12 border-zinc-900 border-4 rounded-full flex items-center justify-center"
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </div>
  );
};
