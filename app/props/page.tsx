import { LuHome } from "react-icons/lu";
import { AllAssets } from "./components/AllAssets";
import { AccountCard } from "./components/AccountCard";
import { RentCard } from "./components/RentCard";

const Page = () => {
  return (
    <div>
      <div className="border-b border-stone-800/60">
        <div className="flex gap-2 items-center h-[59px] px-4">
          <LuHome className="text-lg opacity-50" />
          <span>Assets overview</span>
        </div>
      </div>
      <div className="py-6 px-4 flex flex-col gap-6">
        <div>
          <span className="text-xl">
            <span className="opacity-50">Hi, </span>
            <span>Enes</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <AccountCard />
          </div>
          <div className="col-span-1">
            <RentCard />
          </div>
        </div>
        <AllAssets />
      </div>
    </div>
  );
};

export default Page;
