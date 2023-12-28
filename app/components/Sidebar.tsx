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

const SidebarQuickActions = () => {
  return (
    <div className="flex flex-col gap-3">
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbBell /> Notifications
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbCheckbox /> Tasks
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbNotes /> Notes
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbMail /> Emails
      </a>
      <a href="#" className="flex items-center gap-2 px-2 text-sm font-medium">
        <TbChartBar /> Reports
      </a>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <ScrollArea.Root className="min-w-[240px] bg-stone-50 h-dvh overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full border-r-[1px] border-stone-200">
        <div className="p-2 sticky top-0 border-b-[1px] bg-stone-50 border-stone-200 z-10">
          <SidebarHeader />
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
  );
};
