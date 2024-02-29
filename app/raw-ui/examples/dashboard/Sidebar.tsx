"use client";

import Link from "next/link";
import { useAppShell } from "../../components/app-shell/AppShell";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/collapsible/Collapsible";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/dialog/Dialog";

import {
  LuChevronDown,
  LuBrainCircuit,
  LuMoreHorizontal,
  LuLayout,
  LuContainer,
  LuLayoutGrid,
  LuKanbanSquare,
  LuCalendar,
  LuLayers,
  LuPenSquare,
  LuSearch,
  LuMap,
  LuInbox,
  LuClock,
} from "react-icons/lu";
import { CreateIssueDialog } from "./components/CreateIssueDialog";

export const Sidebar = () => {
  return (
    <div className="h-full p-4 bg-stone-200 shadow-md md:shadow-none">
      <div className="flex justify-between py-4">
        <div className="flex gap-2 items-center">
          <div className="bg-white size-8 rounded-md shadow-md flex items-center justify-center">
            <LuBrainCircuit />
          </div>
          <span className="text-sm font-medium">Brainfruit</span>
        </div>
        <button className="outline-none size-8 flex items-center justify-center">
          <LuMoreHorizontal />
        </button>
      </div>
      <div className="py-4">
        <div className="flex justify-between items-center gap-2">
          <Dialog>
            <DialogTrigger>
              <button className="group outline-none flex gap-2 items-center rounded-md p-2 w-full bg-white/40 hover:bg-white/70">
                <LuPenSquare className="group-hover:opacity-100 opacity-75 transition-opacity" />
                <span className="text-sm font-medium">New issue</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <CreateIssueDialog />
            </DialogContent>
          </Dialog>
          <button className="shrink-0 size-9 flex justify-center items-center bg-white/40 rounded-md">
            <LuSearch className="opacity-75" />
          </button>
        </div>
      </div>
      <div className="h-4"></div>
      <div>
        <Link
          href="#"
          className="flex gap-2 items-center bg-black/10 rounded-md p-2"
        >
          <LuLayoutGrid />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link href="#" className="flex gap-2 items-center rounded-md p-2">
          <LuInbox className="opacity-75" />
          <span className="text-sm font-medium">Inbox</span>
        </Link>
        <Link href="#" className="flex gap-2 items-center rounded-md p-2">
          <LuLayers className="opacity-75" />
          <span className="text-sm font-medium">Views</span>
        </Link>
      </div>
      <div className="h-4"></div>
      <div>
        <Collapsible isInitiallyOpen={true}>
          <CollapsibleTrigger>
            <button className="group flex items-center gap-2 text-sm opacity-75 font-semibold">
              <span>Project</span>
              <LuChevronDown className="group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-180 transition-transform stroke-[3px]" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col py-2">
              <Link href="#" className="flex gap-2 items-center p-2">
                <LuLayoutGrid className="opacity-75" />
                <span className="text-sm font-medium">Overview</span>
              </Link>

              <Link href="#" className="flex gap-2 items-center p-2">
                <LuKanbanSquare className="opacity-75" />
                <span className="text-sm font-medium">Tasks</span>
              </Link>

              <Link href="#" className="flex gap-2 items-center p-2">
                <LuCalendar className="opacity-75" />
                <span className="text-sm font-medium">Calendar</span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="h-4"></div>
        <Collapsible isInitiallyOpen={true}>
          <CollapsibleTrigger>
            <button className="group flex items-center gap-2 text-sm opacity-75 font-semibold">
              <span>Team</span>
              <LuChevronDown className="opacity-75 group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-180 transition-transform stroke-[3px]" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col py-2">
              <Link href="#" className="flex gap-2 items-center p-2">
                <LuMap className="opacity-75" />
                <span className="text-sm font-medium">Roadmap</span>
              </Link>

              <Link href="#" className="flex gap-2 items-center p-2">
                <LuClock className="opacity-75" />
                <span className="text-sm font-medium">Events</span>
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
