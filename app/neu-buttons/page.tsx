import { TbPlus } from "react-icons/tb";

const Button1 = () => {
  return (
    <div className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
      <button className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
        <div className=" bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2">
          <div className="flex gap-2 items-center">
            <TbPlus className="text-2xl stroke-[2.4px]" />
            <span className="font-semibold">More Buttons</span>
          </div>
        </div>
      </button>
    </div>
  );
};

const NeuButtons = () => {
  return (
    <div style={{ "--bg": "#fafafa" }} className="w-screen h-screen bg-[--bg]">
      <div className="flex justify-center items-center gap-12 h-full">
        <Button1 />
      </div>
    </div>
  );
};

export default NeuButtons;
