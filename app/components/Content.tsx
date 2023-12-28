import { TbBuilding } from "react-icons/tb";

const ContentHeader = () => {
  return (
    <div className="border-b-[1px] border-stone-200 p-2">
      <div className="flex gap-2 items-center">
        <TbBuilding /> <span className="font-semibold">Companies</span>
      </div>
    </div>
  );
};

export const Content = () => {
  return (
    <div className="w-full">
      <ContentHeader />
    </div>
  );
};
