import { Content } from "./components/Content";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  return (
    <main className="text-gray-700">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Content />
        </div>
      </div>
    </main>
  );
}
