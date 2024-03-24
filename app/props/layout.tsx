import { Sidebar } from "./components/Sidebar";
import { ReactNode } from "react";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
} from "./components/AppShell";

import "./styles.css";
import { AppContentWrapper } from "./components/AppContentWrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-gray-200 bg-stone-900 h-dvh w-screen overflow-y-scroll">
      <AppShell>
        <AppShellSidebar width="240px">
          <Sidebar />
        </AppShellSidebar>
        <AppShellContent>
          <AppContentWrapper>{children}</AppContentWrapper>
        </AppShellContent>
      </AppShell>
    </div>
  );
};

export default Layout;
