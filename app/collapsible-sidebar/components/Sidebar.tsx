"use client";

import { PropsWithChildren, useState } from "react";
import {
  LuBarChart4,
  LuBuilding2,
  LuGalleryVertical,
  LuInbox,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { TbChevronLeft, TbDirection } from "react-icons/tb";

type SidebarItemProps = {
  isCollapsed: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const SidebarItem = ({
  children,
  leftSlot,
  rightSlot,
  isCollapsed,
  className = "",
}: PropsWithChildren<SidebarItemProps>) => {
  return (
    <div className={[`flex items-center gap-2`, className].join(" ")}>
      <div className="size-[16px] shrink-0">{leftSlot}</div>
      <div
        className={[
          "flex-1 flex justify-between items-center gap-2 overflow-hidden",
          isCollapsed ? "w-0" : "w-auto",
        ].join(" ")}
      >
        <div>{children}</div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={[
        `px-4 py-6 transition transition-all duration-300`,
        isCollapsed ? "w-[66px]" : "w-[240px]",
      ].join(" ")}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <SidebarItem
            isCollapsed={isCollapsed}
            className="px-2 py-1 border border-neutral-200 rounded-md"
            leftSlot={
              <img
                alt="any"
                className="size-4 rounded-md"
                src={`https://logo.clearbit.com/linear.app?format=png`}
              />
            }
            rightSlot={<TbDirection className="text-xl opacity-50" />}
          >
            <span className="text-sm font-medium">Linear</span>
          </SidebarItem>
          <div className="flex justify-end">
            <button
              onClick={() => setIsCollapsed((s) => !s)}
              className={[
                "size-5 flex justify-center items-center text-sm rounded-full bg-neutral-900 text-white translate-x-[27px]",
                "transition transition-all duration-300 delay-200",
                "shadow-[0px_0px_12px_rgba(72,66,66,1)]",
                isCollapsed ? "rotate-180" : "",
              ].join(" ")}
            >
              <TbChevronLeft />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 border border-neutral-200 rounded-md bg-white"
              leftSlot={<LuBarChart4 />}
            >
              <span className="text-sm font-medium">Dashboard</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={
                <div className="relative">
                  <div
                    className={[
                      "size-[8px] bg-green-600 rounded-full border border-white right-0 top-0 absolute",
                      "transition transition-all duration-200 delay-300",
                      isCollapsed ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  ></div>
                  <LuInbox />
                </div>
              }
              rightSlot={
                <div className="rounded-md bg-neutral-300 size-[16px] text-[10px] text-center">
                  6
                </div>
              }
            >
              <span className="text-sm font-medium">Inbox</span>
            </SidebarItem>
          </div>
          <div className="py-4">
            <hr />
          </div>
          <div className="flex flex-col gap-2">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuBuilding2 />}
            >
              <span className="text-sm font-medium">Companies</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuGalleryVertical />}
            >
              <span className="text-sm font-medium">Jobs</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuUsers />}
            >
              <span className="text-sm font-medium">Applications</span>
            </SidebarItem>
          </div>
        </div>
        <SidebarItem
          isCollapsed={isCollapsed}
          className="px-2 py-1 opacity-70"
          leftSlot={<LuSettings />}
        >
          <span className="text-sm font-medium">Settings</span>
        </SidebarItem>
      </div>
    </aside>
  );
};
