import { ReactNode } from "react";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
} from "../../components/app-shell/AppShell";
import { Sidebar } from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-stone-200 text-stone-600">
      <AppShell>
        <AppShellSidebar width="240px">
          <Sidebar />
        </AppShellSidebar>
        <AppShellContent>{children}</AppShellContent>
      </AppShell>
    </div>
  );
};

export default Layout;
