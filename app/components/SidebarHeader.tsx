import {
  TbBrain,
  TbCaretDownFilled,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

export const SidebarHeader = ({ toggleSidebar, collapseSidebar }) => {
  return (
    <div className="flex justify-between items-center px-2">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-md bg-gray-700 text-white flex items-center justify-center">
          <TbBrain />
        </div>
        <button className="text-sm font-semibold flex items-center gap-1">
          superfood.io
          <TbCaretDownFilled />
        </button>
      </div>
      <button
        onClick={toggleSidebar}
        className="opacity-60 hover:opacity-100 transition md:hidden"
      >
        <TbLayoutSidebarLeftCollapse />
      </button>
      <button
        onClick={collapseSidebar}
        className="opacity-60 hover:opacity-100 transition hidden md:block"
      >
        <TbLayoutSidebarLeftCollapse />
      </button>
    </div>
  );
};
