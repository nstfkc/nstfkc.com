import { GeistMono } from "geist/font/mono";
import { Player } from "./components/Player";

const MusicPlayer = () => {
  return (
    <div className={`w-screen h-screen bg-zinc-900 ${GeistMono.className}`}>
      <div className="h-full container max-w-lg mx-auto flex items-center justify-center">
        <Player />
      </div>
    </div>
  );
};

export default MusicPlayer;
