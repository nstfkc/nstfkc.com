"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { LuHome, LuLayoutDashboard } from "react-icons/lu";

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
        "flex items-center gap-2",
        isActive ? "bg-black/20" : "",
      ].join(" ")}
    >
      <Icon className="" />
      {label}
    </Link>
  );
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="min-w-[220px] px-2">
        <nav>
          <NavigationLink
            href="/raw-ui/components"
            Icon={LuHome}
            label="Intro"
          />
          <NavigationLink
            href="/raw-ui/components/accordion"
            Icon={LuLayoutDashboard}
            label="Accordion"
          />
          <NavigationLink
            href="/raw-ui/components/app-shell"
            Icon={LuLayoutDashboard}
            label="App shell"
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
        </nav>
      </aside>
      <div>{props.children}</div>
    </div>
  );
}
