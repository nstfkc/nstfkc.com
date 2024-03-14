import { Sidebar } from "./components/Sidebar";
import { ReactNode } from "react";

import "./styles.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-gray-200 bg-stone-900 h-dvh w-screen">
      <div className="flex h-full">
        <div className="w-[240px] border-r-[1px] border-stone-800 h-full">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
