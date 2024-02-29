"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import {
  LuChevronUp,
  LuHome,
  LuLayout,
  LuPanelLeft,
  LuMenuSquare,
  LuLayoutDashboard,
  LuLayoutTemplate,
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

const NavigationLink = (props: {
  href: string;
  Icon: IconType;
  label: string;
}) => {
  const pathname = usePathname();
  const { href, Icon, label } = props;
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
      <Icon className="" />
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
          <nav className="p-4 py-6 bg-stone-200 h-full">
            <div>
              <NavHeader />
            </div>
            <NavigationLink
              href="/raw-ui/components"
              Icon={LuHome}
              label="Intro"
            />

            <Collapsible isInitiallyOpen={true}>
              <CollapsibleTrigger>
                <button className="group flex items-center px-2 font-semibold text-sm py-2 tracking-wide opacity-75">
                  <span>Components</span>
                  <LuChevronUp className="transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-[180deg]" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <NavigationLink
                  href="/raw-ui/components/app-shell"
                  Icon={LuPanelLeft}
                  label="App shell"
                />
                <NavigationLink
                  href="/raw-ui/components/accordion"
                  Icon={LuMenuSquare}
                  label="Accordion"
                />

                <NavigationLink
                  href="/raw-ui/components/collapsible"
                  Icon={LuLayoutDashboard}
                  label="Collapsible"
                />
                <NavigationLink
                  href="/raw-ui/components/dialog"
                  Icon={LuLayoutDashboard}
                  label="Dialog"
                />
                <NavigationLink
                  href="/raw-ui/components/dropdown-menu"
                  Icon={LuLayoutDashboard}
                  label="Dropdown Menu"
                />
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </AppShellSidebar>
        <AppShellContent>
          <div className="p-4 h-full relative">
            <div className="px-4 bg-stone-100 rounded-xl h-full overflow-scroll">
              <div className="prose max-w-full">{props.children}</div>
              <div className="h-[4000px]"></div>
            </div>
          </div>
        </AppShellContent>
      </AppShell>
    </div>
  );
}
