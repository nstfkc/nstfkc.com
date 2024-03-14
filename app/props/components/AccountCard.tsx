import { LuPlus } from "react-icons/lu";
import { Card } from "./Card";

export const AccountCard = () => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">ACCOUNT VALUE</div>
            <div>$ 4,895,000</div>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">AVAILABLE BALANCE</div>
            <div>$ 4,895,000</div>
          </div>
        </div>
        <div className="h-[1px] bg-stone-700/50"></div>
        <div className="grid grid-cols-2 gap-2">
          <button className="text-sm bg-orange-700 hover:bg-orange-800 rounded-lg py-2 flex justify-center gap-1 items-center">
            <LuPlus />
            <span>Deposit</span>
          </button>
          <button className="bg-stone-700 rounded-lg hover:bg-stone-700/50 text-sm py-2">
            Withdraw
          </button>
        </div>
      </div>
    </Card>
  );
};
