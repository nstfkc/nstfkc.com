import { LuChevronRight } from "react-icons/lu";

const Page = () => {
  return (
    <div className="w-screen h-screen bg-stone-200 flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <button
          className={[
            "font-medium text-stone-700 text-sm",
            "px-2 py-2 flex items-center",
            "bg-stone-100 hover:bg-stone-50",
            "rounded-lg shadow-md active:shadow-sm",
            "active:scale-[0.99]",
          ].join(" ")}
        >
          <span className="px-1">Proceed</span>
          <LuChevronRight className="stroke-[2.4px]" />
        </button>
      </div>
    </div>
  );
};

export default Page;
