"use client";

import {
  LuLayoutPanelLeft,
  LuPanelLeft,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPanelRight,
} from "react-icons/lu";
import { useAppShell } from "./AppShell";

export const SidebarToggleButton = () => {
  const { toggleSidebar, isSidebarCollapsed } = useAppShell();
  return (
    <button onClick={toggleSidebar} className="outline-none focus:ring-1">
      {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
    </button>
  );
};
