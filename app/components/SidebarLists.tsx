import { TbPlus } from "react-icons/tb";
import { SidebarAccordion } from "./SidebarAccordion";

export const SidebarLists = () => {
  return (
    <SidebarAccordion label="Lists" value="lists">
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium"
      >
        <span>🎓</span> Recruiting
      </a>
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium"
      >
        <span>🚀</span> Startup Sales Pipeline
      </a>
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium"
      >
        <span>🎉</span> Fundraising
      </a>
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium"
      >
        <span>🧩</span> Integrations
      </a>
      <div className="h-2" />
      <a
        href="#"
        className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium"
      >
        <span>💼</span> Startup Program
      </a>
      <div className="h-2" />
      <button className="flex items-center gap-2 px-2 py-1 rounded-md text-sm opacity-60 hover:opacity-80 transition">
        <TbPlus /> Create list
      </button>
    </SidebarAccordion>
  );
};
