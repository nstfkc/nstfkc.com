"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { TbBuilding } from "react-icons/tb";
import { PageHeader } from "./PageHeader";
import { CompaniesTable } from "./CompaniesTable";

export const Companies = () => {
  return (
    <ScrollArea.Root className="bg-stone-50 h-dvh overflow-hidden">
      <PageHeader>
        <TbBuilding /> <span className="font-semibold">Companies</span>
      </PageHeader>

      <ScrollArea.Viewport className="h-full w-full border-r-[1px] border-stone-200">
        <CompaniesTable />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
    </ScrollArea.Root>
  );
};
