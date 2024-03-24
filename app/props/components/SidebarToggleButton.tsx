"use client";

import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { useAppShell } from "./AppShell";

export const SidebarToggleButton = () => {
  const { toggleSidebar, isSidebarCollapsed } = useAppShell();
  return (
    <button onClick={toggleSidebar} className="outline-none h-full">
      {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
    </button>
  );
};
