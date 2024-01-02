import { TbBuilding, TbUsers } from "react-icons/tb";
import { SidebarAccordion } from "./SidebarAccordion";

export const SidebarRecords = () => {
  return (
    <SidebarAccordion label="Records" value="records">
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-md"
      >
        <TbUsers className="opacity-70" /> People
      </a>
      <div className="h-2" />
      <a
        href="#"
        className="bg-stone-900/5 flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-md"
      >
        <TbBuilding className="opacity-70" /> Companies
      </a>
    </SidebarAccordion>
  );
};
