"use client";
import { useEffect, useState } from "react";
import { PiChartBarHorizontalDuotone } from "react-icons/pi";

const StepOne = () => {
  return (
    <div className="w-[220px] flex flex-col">
      <button className="rounded-[12px] shadow-[0px_0px_0px_3px_rgba(0,0,0,0.4)] p-[1px]">
        <div className="flex items-center gap-2 px-4 py-2">
          <PiChartBarHorizontalDuotone className="-rotate-90 text-green-600/50 text-xl" />
          <span>Analytics</span>
        </div>
      </button>
      <div className="h-[60px] py-4 text-white/50 text-sm">
        <p>Create outline using shadow with 0 blur and 3px spread</p>
      </div>
    </div>
  );
};

// Add gradient bg to button
const StepTwo = () => {
  return (
    <div className="w-[220px] flex flex-col">
      <button className="rounded-[12px] shadow-[0px_0px_0px_3px_rgba(0,0,0,0.4)] bg-gradient-to-b from-white/10 to-transparent p-[1px]">
        <div className="flex items-center gap-2 px-4 py-2">
          <PiChartBarHorizontalDuotone className="-rotate-90 text-green-600/50 text-xl" />
          <span>Analytics</span>
        </div>
      </button>
      <div className="h-[60px] py-4 text-white/50 text-sm">
        <p>
          Add a gradient bg to the button starts from white with 10% opacity to
          transparent
        </p>
      </div>
    </div>
  );
};

const StepThree = () => {
  return (
    <div className="w-[220px] flex flex-col">
      <button className="rounded-[12px] shadow-[0px_0px_0px_3px_rgba(0,0,0,0.4)] bg-gradient-to-b from-white/10 to-transparent p-[1px]">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/90 rounded-[11px]">
          <PiChartBarHorizontalDuotone className="-rotate-90 text-green-600/50 text-xl" />
          <span>Analytics</span>
        </div>
      </button>
      <div className="h-[60px] py-4 text-white/50 text-sm">
        <p>Add a slightly lighter bg than the surface to the inner div.</p>
      </div>
    </div>
  );
};

const StepFour = () => {
  return (
    <div className="w-[220px] flex flex-col">
      <button className="relative overflow-hidden rounded-[12px] shadow-[0px_0px_0px_3px_rgba(0,0,0,0.4)] bg-gradient-to-b from-white/10 to-transparent p-[1px] active:from-white/5 outline-none">
        <div className="w-[40%] h-[100px] absolute rotate-[15deg] opacity-50 left-[-8%] top-[-50%] bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/90 rounded-[11px]">
          <PiChartBarHorizontalDuotone className="-rotate-90 text-green-600/50 text-xl" />
          <span>Analytics</span>
        </div>
      </button>
      <div className="h-[60px] py-4 text-white/50 text-sm">
        <p>
          Add glow using another div with gradient bg and align the crease with
          the icon.
        </p>
      </div>
    </div>
  );
};

const StepZero = () => {
  return (
    <div className="w-[220px] flex flex-col">
      <button className="relative overflow-hidden rounded-[12px] shadow-[0px_0px_0px_3px_rgba(0,0,0,0.4)] bg-gradient-to-b from-white/10 to-transparent p-[1px] active:from-white/5 outline-none">
        <div className="w-[40%] h-[100px] absolute rotate-[15deg] opacity-50 left-[-8%] top-[-50%] bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/90 rounded-[11px]">
          <PiChartBarHorizontalDuotone className="-rotate-90 text-green-600/50 text-xl" />
          <span>Analytics</span>
        </div>
      </button>
      <div className="h-[60px] py-4 text-white/50 text-sm"></div>
    </div>
  );
};

export const Steps = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep((prev) => (prev === 4 ? 1 : prev + 1));
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextStep();
      }
    });
  }, []);

  return (
    <div className="text-white/80">
      {step === 0 ? (
        <StepZero />
      ) : step === 1 ? (
        <StepOne />
      ) : step === 2 ? (
        <StepTwo />
      ) : step === 3 ? (
        <StepThree />
      ) : step === 4 ? (
        <StepFour />
      ) : null}

      <div className="py-12 flex justify-between">
        <button onClick={nextStep}>{step === 0 ? "Start" : "Next"}</button>
        {step > 0 && <span>{step}/4</span>}
      </div>
    </div>
  );
};
