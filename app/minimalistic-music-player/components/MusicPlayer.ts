"use client";
import { Subject } from "@/lib/Subject";
import { useRef, useState, useSyncExternalStore } from "react";

type MusicPlayerState = {
  idle: boolean;
  playing: boolean;
  buffering: boolean;
  currentUrl: string;
};

const defaultState: MusicPlayerState = {
  idle: true,
  playing: false,
  buffering: false,
  currentUrl: "",
};

export class MusicPlayer {
  ctx: AudioContext;
  gainNode: GainNode;
  analyser: AnalyserNode;
  nodes: Map<number, AudioBufferSourceNode> = new Map();
  source: AudioBufferSourceNode | null = null;

  buffers: Map<string, AudioBuffer> = new Map();
  urls: string[] = [];

  public state$ = new Subject<MusicPlayerState>({
    playing: false,
    buffering: false,
    idle: true,
    currentUrl: "",
  });

  public progress$ = new Subject<number>(0);
  private timeElapsed: number = 0;

  private currentSourceKey: string = "";

  constructor(urls: string[]) {
    this.urls = urls;
    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 32;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 0.5;

    this.currentSourceKey = urls[0];
    this.setState({ currentUrl: urls[0] });
    this.updateProgress();
  }

  private updateProgress = () => {
    setInterval(() => {
      if (this.source) {
        const progress =
          (this.timeElapsed++ * 100) / this.source.buffer.duration;
        if (progress > 100) {
          this.next();
        }
        this.progress$.next(progress);
      }
    }, 1000);
  };

  private setState = (partialState: Partial<MusicPlayerState>) => {
    this.state$.next({ ...this.state$.getValue(), ...partialState });
  };

  private getState = (key: keyof MusicPlayerState) => {
    return this.state$.getValue()[key];
  };

  getByteFrequencyData = () => {
    const byteFrequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(byteFrequencyData);
    return Array.from(byteFrequencyData);
  };

  selectSource = async (key: string) => {
    // if (key === this.currentSourceKey) {
    //   return;
    // }

    if (this.source) {
      try {
        this.source.stop();
        this.source.disconnect();
      } catch (err) {
        console.log(this.currentSourceKey, "cant stop");
        // Do something
      }
    }

    if (this.urls.includes(key)) {
      if (this.buffers.has(key)) {
        const buffer = this.buffers.get(key);
        if (buffer) {
          this.currentSourceKey = key;
          this.setState({ currentUrl: key });
          const source = this.ctx.createBufferSource();

          this.source = source;
          this.source.buffer = buffer;

          this.timeElapsed = 0;
          this.progress$.next(0);
          this.source.connect(this.analyser).connect(this.ctx.destination);
        }
      } else {
        await this.loadBuffer(key);
      }
    } else {
      throw new Error("No buffer found");
    }
  };

  loadBuffer = async (key: string) => {
    this.setState({ buffering: true });

    const response = await fetch(key);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);

    this.buffers.set(key, audioBuffer);

    this.selectSource(key).then(() => {
      this.setState({ buffering: false });
    });
  };

  play = () => {
    if (!!this.source?.context.state) {
      this.ctx.resume();
    } else {
      this.selectSource(this.currentSourceKey).then(() => {
        this.source?.start(0);
      });
    }

    this.setState({ playing: true });
  };

  pause = () => {
    this.setState({ playing: false });
    this.ctx.suspend();
  };

  toggle = () => {
    if (this.ctx.state === "running") {
      this.pause();
    } else {
      this.play();
    }
  };

  next = async () => {
    const currentIndex = this.urls.indexOf(this.currentSourceKey);
    const nextIndex =
      currentIndex + 1 > this.urls.length - 1 ? 0 : currentIndex + 1;
    await this.selectSource(this.urls[nextIndex]);
    this.source?.start(0);
  };

  prev = async () => {
    const currentIndex = this.urls.indexOf(this.currentSourceKey);
    const nextIndex =
      currentIndex === 0 ? this.urls.length - 1 : currentIndex - 1;
    await this.selectSource(this.urls[nextIndex]);
    this.source?.start(0);
  };
}

export function useMusicPlayer(sources: string[]) {
  const player = useRef(
    (() => {
      if (typeof window === "undefined") {
        return null as unknown as MusicPlayer;
      }
      return new MusicPlayer(sources);
    })()
  );

  return player.current;
}

export function useMusicPlayerState(player: MusicPlayer) {
  return useSyncExternalStore(
    player?.state$.subscribe ?? (() => {}),
    player?.state$.getValue ?? (() => defaultState),
    player?.state$.getValue ?? (() => defaultState)
  );
}

export function useMusicPlayerProgress(player: MusicPlayer) {
  return useSyncExternalStore(
    player?.progress$.subscribe ?? (() => {}),
    player?.progress$.getValue ?? (() => 0),
    player?.progress$.getValue ?? (() => 0)
  );
}
