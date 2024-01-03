"use client";

import { SetStateAction, Dispatch, createContext, useState } from "react";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isSidebarOpen: false,
  setSidebarOpen: (_) => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
