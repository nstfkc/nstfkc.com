import { MdDesignServices } from "react-icons/md";
import { AiFillCode } from "react-icons/ai";
import { IoIosRocket } from "react-icons/io";

const TwitterHeader = () => {
  return (
    <div>
      <div className="w-[900px] h-[300px] border flex justify-center items-center gap-12 bg-stone-100 text-stone-600">
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 bg-white rounded-xl flex items-center justify-center">
            <MdDesignServices className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Design</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 bg-white rounded-xl flex items-center justify-center">
            <AiFillCode className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Code</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="size-16 bg-white rounded-xl flex items-center justify-center">
            <IoIosRocket className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Ship</span>
        </div>
      </div>
    </div>
  );
};

export default TwitterHeader;
