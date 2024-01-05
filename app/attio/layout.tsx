import { Inter } from "next/font/google";
import { Sidebar } from "./components/Sidebar";
import { SidebarProvider } from "./components/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={inter.className}>
      <SidebarProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
}
