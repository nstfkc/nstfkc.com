import { ComponentProps } from "react";
import { TbCloudCheck, TbSearch, TbSettings2 } from "react-icons/tb";

const CircleButton = ({ children }: ComponentProps<"button">) => {
  return (
    <button className="relative size-8 rounded-full bg-gradient-to-br  shadow-[-1px_-1px_2px_rgba(240,240,240,0.2)]">
      <div className="absolute top-0 z-[0] w-full h-full shadow-[3px_3px_4px_rgba(24,24,24,0.6)] rounded-full"></div>
      <div className="flex items-center justify-center w-full h-full rounded-full shadow-[inset_0px_0_2px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </button>
  );
};

const NeuLockRoast = () => {
  return (
    <div className="w-screen h-screen bg-stone-700 text-stone-200">
      <header className="py-8">
        <div className="container max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="https://neulock.app/nextImageExportOptimizer/neulock-logo-dark.3b95eaa0-opt-256.WEBP"
              alt=""
              className="w-[60px]"
            />
            <span className="text-xl font-bold text-white">Neulock Web</span>
          </div>
          <div className="flex items-center gap-8">
            <CircleButton>
              <TbSearch />
            </CircleButton>
            <CircleButton>
              <TbCloudCheck />
            </CircleButton>
            <CircleButton>
              <TbSettings2 />
            </CircleButton>
          </div>
        </div>
      </header>
      <div></div>
    </div>
  );
};
export default NeuLockRoast;
