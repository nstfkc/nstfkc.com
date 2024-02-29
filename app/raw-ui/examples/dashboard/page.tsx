import { Content } from "./Content";

const Page = () => {
  return (
    <div className="p-4 h-full">
      <div className="p-4 rounded-xl bg-stone-100 h-full">
        <Content />
      </div>
    </div>
  );
};

export default Page;
