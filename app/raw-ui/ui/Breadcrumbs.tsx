"use client";

import Link from "next/link";
import { useAppShell } from "@/app/raw-ui/components/app-shell/AppShell";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { Fragment } from "react";

type Breadcrumb = { label: string; href?: string };

export const Breadcrumbs = (props: { breadcrumbs: Breadcrumb[] }) => {
  const { breadcrumbs } = props;
  const { isSidebarCollapsed, toggleSidebar } = useAppShell();
  return (
    <div className="flex items-center gap-8 text-sm font-medium px-2 md:px-0">
      <div>
        <button
          onClick={toggleSidebar}
          className="outline-none size-8 flex items-center justify-center text-lg"
        >
          {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </button>
      </div>
      <div className="flex items-center">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.label}>
            <div>
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="px-4 select-none">/</span>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
