import { TbSearch, TbCommand } from "react-icons/tb";

export const SidebarSearch = () => {
  return (
    <button
      className={[
        "w-full px-2 py-1",
        "flex items-center justify-between",
        "bg-white shadow-sm border border-stone-200/70 rounded-lg text-sm",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 ">
        <TbSearch className="" />
        <span>Search</span>
      </div>
      <div className="flex gap-2 items-center opacity-60">
        <TbCommand className="" />
        <span className="text-[13px] px-[1px]">K</span>
      </div>
    </button>
  );
};
