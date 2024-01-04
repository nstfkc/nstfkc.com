"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Accordion from "@radix-ui/react-accordion";

import {
  TbBell,
  TbChartBar,
  TbCheckbox,
  TbMail,
  TbNotes,
} from "react-icons/tb";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarRecords } from "./SidebarRecords";
import { SidebarLists } from "./SidebarLists";
import { Sheet } from "./Sheet";
import { useContext, useState } from "react";
import { SidebarContext } from "./SidebarContext";

const SidebarQuickActions = () => {
  return (
    <div className="flex flex-col gap-3">
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbBell className="opacity-70" /> Notifications
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbCheckbox className="opacity-70" /> Tasks
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbNotes className="opacity-70" /> Notes
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbMail className="opacity-70" /> Emails
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbChartBar className="opacity-70" /> Reports
      </a>
    </div>
  );
};

export const Sidebar = () => {
  const {
    setSidebarOpen,
    isSidebarOpen,
    isSidebarCollapsed,
    setSidebarCollapsed,
  } = useContext(SidebarContext);

  return (
    <Sheet open={isSidebarOpen} onOpenChange={(s) => setSidebarOpen(s)}>
      <ScrollArea.Root
        className={[
          "bg-stone-50 h-dvh overflow-hidden",
          isSidebarCollapsed ? "w-0" : "w-full",
        ].join(" ")}
      >
        <ScrollArea.Viewport className="h-full w-full border-r-[1px] border-stone-200">
          <div className="p-2 sticky top-0 border-b-[1px] bg-stone-50 border-stone-200 z-10">
            <SidebarHeader
              collapseSidebar={() => setSidebarCollapsed((s) => !s)}
              toggleSidebar={() => setSidebarOpen((s) => !s)}
            />
          </div>
          <div className="h-1" />
          <div className="p-2">
            <SidebarSearch />
          </div>
          <div className="h-2" />
          <div className="p-2">
            <SidebarQuickActions />
          </div>
          <div className="h-4" />
          <Accordion.Root type="multiple" defaultValue={["lists", "records"]}>
            <div className="p-2">
              <SidebarRecords />
            </div>
            <div className="h-4" />
            <div className="p-2">
              <SidebarLists />
            </div>
          </Accordion.Root>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" />
      </ScrollArea.Root>
    </Sheet>
  );
};
