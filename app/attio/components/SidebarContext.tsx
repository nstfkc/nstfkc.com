"use client";

import { SetStateAction, Dispatch, createContext, useState } from "react";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}>({
  isSidebarOpen: true,
  setSidebarOpen: (_) => {},
  isSidebarCollapsed: false,
  setSidebarCollapsed: (_) => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        isSidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
