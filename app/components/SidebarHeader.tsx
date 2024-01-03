import {
  TbBrain,
  TbCaretDownFilled,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

export const SidebarHeader = ({ toggleSheet }) => {
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
        onClick={toggleSheet}
        className="opacity-60 hover:opacity-100 transition"
      >
        <TbLayoutSidebarLeftCollapse />
      </button>
    </div>
  );
};
