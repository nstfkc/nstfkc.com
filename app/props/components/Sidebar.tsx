import {
  LuArrowLeftRight,
  LuBuilding,
  LuLayoutDashboard,
  LuLayoutPanelLeft,
  LuList,
  LuLogOut,
  LuSettings2,
} from "react-icons/lu";

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 border-b border-stone-800 h-[60px] flex items-center">
        <span className="font-black text-xl">props.</span>
      </div>
      <div className="flex flex-col justify-between flex-1 bg-stone-800/50">
        <div className="flex-1 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-2 bg-stone-700/50 py-1 rounded-md">
            <LuLayoutDashboard />
            <span>Overview</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuBuilding />
            <span>Properties</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuArrowLeftRight />
            <span>Transactions</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuList />
            <span>Taxes</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuLayoutPanelLeft />
            <span>Invoices</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuSettings2 />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md opacity-50">
            <LuLogOut />
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
