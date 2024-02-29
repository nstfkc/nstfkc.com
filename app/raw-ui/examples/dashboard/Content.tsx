"use client";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { useAppShell } from "../../components/app-shell/AppShell";

export const Content = () => {
  const { toggleSidebar, isSidebarCollapsed } = useAppShell();
  return (
    <div>
      <div className="flex gap-8 items-center">
        <button
          onClick={toggleSidebar}
          className="size-8 flex justify-center items-center outline-none"
        >
          {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </button>

        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="">
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="aspect-square bg-gradient-to-br from-white to-white/10 rounded-xl"></div>
          <div className="aspect-square bg-gradient-to-br from-white to-white/10 rounded-xl"></div>
          <div className="aspect-square bg-gradient-to-br from-white to-white/10 rounded-xl"></div>
          <div className="aspect-video bg-gradient-to-br from-white to-white/10 rounded-xl"></div>
          <div className="aspect-video bg-gradient-to-br from-white to-white/10 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
