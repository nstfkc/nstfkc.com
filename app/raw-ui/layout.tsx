import Link from "next/link";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex bg-stone-50 h-screen">
      <aside className="min-w-[200px]">
        <ul>
          <li>
            <Link href="/raw-ui">Intro</Link>
          </li>
          <li>
            <Link href="/raw-ui/dropdown-menu">Dropdown Menu</Link>
          </li>
          <li>
            <Link href="/raw-ui/dialog">Dialog</Link>
          </li>
          <li>
            <Link href="/raw-ui/collapsible">Collapsible</Link>
          </li>
        </ul>
      </aside>
      <div>{props.children}</div>
    </div>
  );
}
