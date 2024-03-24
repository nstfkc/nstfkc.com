import { PropsWithChildren } from "react";
import {
  LuArrowLeftRight,
  LuBuilding,
  LuLayoutDashboard,
  LuLayoutPanelLeft,
  LuList,
  LuLogOut,
  LuSettings2,
} from "react-icons/lu";
import { SidebarToggleButton } from "./SidebarToggleButton";

const SidebarLink = (props: PropsWithChildren<{ active?: boolean }>) => {
  const { active = false, children } = props;
  return (
    <div
      className={[
        "flex items-center gap-2 p-2 rounded-md text-sm select-none",
        active ? "bg-stone-700/80" : "opacity-50 hover:opacity-75",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col backdrop-blur-md bg-black/20 border-r border-stone-800">
      <div>
        <div className="px-6 border-b border-stone-800 h-[60px] flex items-center justify-between">
          <div>
            <span className="font-black text-xl">props.</span>
          </div>
          <div className="flex items-center md:hidden">
            <SidebarToggleButton />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 bg-stone-800/50">
        <div className="flex-1 p-4 flex flex-col gap-2">
          <SidebarLink active>
            <LuLayoutDashboard />
            <span>Overview</span>
          </SidebarLink>
          <SidebarLink>
            <LuBuilding />
            <span>Properties</span>
          </SidebarLink>
          <SidebarLink>
            <LuArrowLeftRight />
            <span>Transactions</span>
          </SidebarLink>
          <SidebarLink>
            <LuList />
            <span>Taxes</span>
          </SidebarLink>
          <SidebarLink>
            <LuLayoutPanelLeft />
            <span>Invoices</span>
          </SidebarLink>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <SidebarLink>
            <LuSettings2 />
            <span>Settings</span>
          </SidebarLink>
          <SidebarLink>
            <LuLogOut />
            <span>Sign out</span>
          </SidebarLink>
        </div>
      </div>
    </div>
  );
};
