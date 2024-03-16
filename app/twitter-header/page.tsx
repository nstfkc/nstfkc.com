import { MdDesignServices } from "react-icons/md";
import { AiFillCode } from "react-icons/ai";
import { IoIosRocket, IoIosPerson } from "react-icons/io";

const TwitterHeader = () => {
  return (
    <div>
      <div className="flex h-[300px] w-[900px] items-center justify-center gap-12 border bg-neutral-200/10 text-stone-600">
        <div className="flex flex-col items-center gap-1">
          <div className="twitter-header-item flex size-16 items-center justify-center rounded-xl">
            <MdDesignServices className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Design</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="twitter-header-item flex size-16 items-center justify-center rounded-xl">
            <AiFillCode className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Code</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="twitter-header-item flex size-16 items-center justify-center rounded-xl">
            <IoIosPerson className="text-2xl" />
          </div>
          <span className="text-xs font-semibold tracking-wide">UX</span>
        </div>
      </div>
    </div>
  );
};

export default TwitterHeader;
