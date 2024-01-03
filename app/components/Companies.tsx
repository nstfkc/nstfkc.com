"use client";
import {
  TbBuilding,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbMinusVertical,
} from "react-icons/tb";
import { PageHeader } from "./PageHeader";
import { CompaniesTable } from "./CompaniesTable";
import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";

export const Companies = () => {
  const { setSidebarOpen, isSidebarOpen } = useContext(SidebarContext);
  return (
    <div className="h-full flex flex-col">
      <PageHeader>
        <div className="flex items-center gap-2">
          {!isSidebarOpen ? (
            <>
              <button
                onClick={() => setSidebarOpen(true)}
                className="opacity-60 hover:opacity-100 transition flex items-center"
              >
                <TbLayoutSidebarLeftExpand />
              </button>
              <TbMinusVertical className="opacity-30" />
            </>
          ) : null}
          <div className="flex items-center gap-1">
            <TbBuilding /> <span className="font-semibold">Companies</span>
          </div>
        </div>
      </PageHeader>
      <div className="flex-1">
        <CompaniesTable />
      </div>
    </div>
  );
};
