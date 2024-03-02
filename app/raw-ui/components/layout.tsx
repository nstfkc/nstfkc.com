"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuChevronUp,
  LuHome,
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
  useAppShell,
} from "./app-shell/AppShell";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible/Collapsible";

const NavigationLink = (props: { href: string; label: string }) => {
  const pathname = usePathname();
  const { href, label } = props;
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={[
        "px-4 py-2 rounded-md",
        "text-sm font-medium",
        "flex items-center gap-2",
        isActive ? "bg-black/10" : "",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

const NavHeader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useAppShell();
  return (
    <div className="flex justify-between">
      <span className="font-semibold px-2">raw ui</span>
      <button className="md:hidden" onClick={toggleSidebar}>
        {isSidebarCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
      </button>
    </div>
  );
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="bg-stone-200 h-screen text-stone-700">
      <AppShell>
        <AppShellSidebar width="240px">
          <nav className="p-4 md:py-6 bg-stone-200 h-full">
            <div>
              <NavHeader />
            </div>
            <NavigationLink href="/raw-ui/components" label="Intro" />
            <Collapsible isInitiallyOpen={true}>
              <CollapsibleTrigger>
                <button className="group flex items-center gap-2 px-2 font-semibold text-xs py-2 tracking-wide opacity-75">
                  <span>Components</span>
                  <LuChevronUp className="stroke-[3px] transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-[180deg]" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <NavigationLink
                  href="/raw-ui/components/app-shell"
                  label="App shell"
                />
                <NavigationLink
                  href="/raw-ui/components/accordion"
                  label="Accordion"
                />

                <NavigationLink
                  href="/raw-ui/components/collapsible"
                  label="Collapsible"
                />
                <NavigationLink
                  href="/raw-ui/components/dialog"
                  label="Dialog"
                />
                <NavigationLink
                  href="/raw-ui/components/dropdown-menu"
                  label="Dropdown Menu"
                />
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </AppShellSidebar>
        <AppShellContent>
          <div className="md:px-4 py-4 h-full">
            <div className="prose max-w-screen overflow-scroll md:max-w-full h-full flex flex-col gap-4">
              {props.children}
            </div>
          </div>
        </AppShellContent>
      </AppShell>
    </div>
  );
}
