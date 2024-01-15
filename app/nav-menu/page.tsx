import { GeistMono } from "geist/font/mono";
import { ComponentProps } from "react";
import { TbArrowLeft, TbChevronDown, TbMinusVertical } from "react-icons/tb";
import { LuRedo, LuUndo } from "react-icons/lu";
import { Switch } from "./components/Switch";
import { Menu } from "./components/Menu";

const Button = (props: ComponentProps<"button">) => {
  return (
    <button
      className={[
        "group bg-gradient-to-b rounded-[10px] p-[1px] from-zinc-700 to-zinc-800",
        "active:from-zinc-800 active:to-zinc-800",
        props.className,
      ].join(" ")}
    >
      <div
        className={[
          "rounded-[9px] bg-gradient-to-b from-zinc-800 to-transparent",
          "h-full flex justify-center items-center",
        ].join(" ")}
      >
        {props.children}
      </div>
    </button>
  );
};

const MenuButton = () => {
  return (
    <Button className="h-[48px] group">
      <div className="flex items-center gap-2 h-full flex-1 px-4 group-data-[state=open]:bg-white/5">
        <div className="font-sans bg-yellow-400/20 px-3 rounded-md border border-yellow-400 text-yellow-400">
          Draft
        </div>
        <div>Starting a busin ...</div>
        <div className="w-[1px] h-[24px] bg-white/5"></div>
        <TbChevronDown className="text-2xl" />
      </div>
    </Button>
  );
};

const NavMenu = () => {
  return (
    <main className={GeistMono.className}>
      <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 to-zinc-700 text-zinc-200">
        <header className="container max-w-4xl mx-auto py-6">
          <nav className="flex">
            <div className="bg-zinc-950 rounded-[12px] p-1 flex items-center gap-1">
              <Button className="size-[48px]">
                <TbArrowLeft className="text-2xl" />
              </Button>
              <Menu>
                <MenuButton />
              </Menu>
              <Button className="size-[48px]">
                <LuUndo className="text-2xl" />
              </Button>
              <Button className="size-[48px]">
                <LuRedo className="text-2xl" />
              </Button>
              <Button className="h-[48px]">
                <div className="flex items-center h-full px-4 gap-2">
                  <span>AI</span>
                  <Switch />
                </div>
              </Button>
            </div>
          </nav>
        </header>
        <div className="container max-w-4xl mx-auto">
          <div className="bg-zinc-950 rounded-2xl p-16">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                <div className="size-[52px] rounded-full bg-gradient-to-r from-zinc-700 to-zinc-900"></div>
                <div className="h-[28px] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
                <div className="h-[28px] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="h-[16px] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
                <div className="h-[16px] w-[80%] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
                <div className="h-[16px] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
                <div className="h-[16px] w-[50%] rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-950"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NavMenu;
