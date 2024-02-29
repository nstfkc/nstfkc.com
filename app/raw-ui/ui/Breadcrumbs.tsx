"use client";

import Link from "next/link";
import { useAppShell } from "@/app/raw-ui/components/app-shell/AppShell";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

type Breadcrumb = { label: string; href?: string };

export const Breadcrumbs = (props: { breadcrumbs: Breadcrumb[] }) => {
  const { breadcrumbs } = props;
  const { isSidebarCollapsed, toggleSidebar } = useAppShell();
  return (
    <div className="flex items-center gap-8 py-4 sticky top-0 bg-stone-100 text-sm font-medium">
      <div>
        <button onClick={toggleSidebar} className="flex items-center">
          {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </button>
      </div>
      <div className="flex items-center">
        {breadcrumbs.map((crumb, index) => (
          <>
            <div key={crumb.label}>
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="px-4 select-none">/</span>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
