"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { TbBuilding } from "react-icons/tb";
import { PageHeader } from "./PageHeader";
import { CompaniesTable } from "./CompaniesTable";

export const Companies = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader>
        <TbBuilding /> <span className="font-semibold">Companies</span>
      </PageHeader>
      <div className="flex-1">
        <CompaniesTable />
      </div>
    </div>
  );
};
