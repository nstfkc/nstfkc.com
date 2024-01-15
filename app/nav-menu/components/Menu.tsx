"use client";
import * as Menubar from "@radix-ui/react-menubar";
import { ComponentProps } from "react";
import {
  TbArchive,
  TbChevronRight,
  TbCommand,
  TbCopy,
  TbDownload,
  TbVersions,
} from "react-icons/tb";

const MenuContentWrapper = ({ children, className }: ComponentProps<"div">) => {
  return (
    <div
      className={[
        "bg-gradient-to-b from-neutral-700 to-neutral-800",
        "min-w-[220px] rounded-[12px] p-[1px] translate-y-[8px] text-neutral-300",
        className,
      ].join(" ")}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono)",
        }}
        className={[
          "shadow-[inset_0_0_12px_rgba(0,0,0,0.0.5)]",
          "p-[2px] bg-zinc-800 rounded-[11px]",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

export const Menu = ({ children }) => (
  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger asChild>{children}</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content>
          <MenuContentWrapper>
            <Menubar.Item asChild>
              <div
                className={[
                  "group select-none",
                  "outline-none rounded-[10px]",
                  "flex items-center gap-2 p-2",
                  "data-[highlighted]:bg-black/30",
                ].join(" ")}
              >
                <TbCopy />
                <span className="group-data-[highlighted]:opacity-100 opacity-50">
                  Duplicate
                </span>
              </div>
            </Menubar.Item>
            <Menubar.Sub>
              <Menubar.SubTrigger asChild>
                <div
                  className={[
                    "group",
                    "data-[highlighted]:bg-black/30 rounded-[10px]",
                    "flex items-center justify-between p-2 select-none outline-none",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <TbCommand />

                    <span className="group-data-[highlighted]:opacity-100 opacity-50">
                      Change Status
                    </span>
                  </div>
                  <TbChevronRight />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent className="translate-x-[8px]">
                  <MenuContentWrapper>
                    <Menubar.Item asChild>
                      <div
                        className={[
                          "group select-none",
                          "outline-none rounded-[10px]",
                          "flex items-center gap-2 p-2",
                          "data-[highlighted]:bg-black/30",
                        ].join(" ")}
                      >
                        <TbCommand className="text-yellow-200" />
                        <span className="group-data-[highlighted]:opacity-100 opacity-50">
                          Draft
                        </span>
                      </div>
                    </Menubar.Item>
                    <Menubar.Item asChild>
                      <div
                        className={[
                          "group select-none",
                          "outline-none rounded-[10px]",
                          "flex items-center gap-2 p-2",
                          "data-[highlighted]:bg-black/30",
                        ].join(" ")}
                      >
                        <TbCommand className="text-orange-300" />
                        <span className="group-data-[highlighted]:opacity-100 opacity-50">
                          Review
                        </span>
                      </div>
                    </Menubar.Item>
                    <Menubar.Item asChild>
                      <div
                        className={[
                          "group select-none",
                          "outline-none rounded-[10px]",
                          "flex items-center gap-2 p-2",
                          "data-[highlighted]:bg-black/30",
                        ].join(" ")}
                      >
                        <TbCommand className="text-blue-300" />
                        <span className="group-data-[highlighted]:opacity-100 opacity-50">
                          Approval
                        </span>
                      </div>
                    </Menubar.Item>
                    <Menubar.Item asChild>
                      <div
                        className={[
                          "group select-none",
                          "outline-none rounded-[10px]",
                          "flex items-center gap-2 p-2",
                          "data-[highlighted]:bg-black/30",
                        ].join(" ")}
                      >
                        <TbCommand className="text-green-300" />
                        <span className="group-data-[highlighted]:opacity-100 opacity-50">
                          Done
                        </span>
                      </div>
                    </Menubar.Item>
                  </MenuContentWrapper>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Item asChild>
              <div
                className={[
                  "group select-none",
                  "outline-none rounded-[10px]",
                  "flex items-center gap-2 p-2",
                  "data-[highlighted]:bg-black/30",
                ].join(" ")}
              >
                <TbDownload />
                <span className="group-data-[highlighted]:opacity-100 opacity-50">
                  Download
                </span>
              </div>
            </Menubar.Item>
            <Menubar.Item asChild>
              <div
                className={[
                  "group select-none",
                  "outline-none rounded-[10px]",
                  "flex items-center gap-2 p-2",
                  "data-[highlighted]:bg-black/30",
                ].join(" ")}
              >
                <TbVersions />
                <span className="group-data-[highlighted]:opacity-100 opacity-50">
                  Version History
                </span>
              </div>
            </Menubar.Item>
            <Menubar.Item asChild>
              <div
                className={[
                  "group select-none",
                  "outline-none rounded-[10px]",
                  "flex items-center gap-2 p-2",
                  "data-[highlighted]:bg-black/30",
                ].join(" ")}
              >
                <TbArchive />
                <span className="group-data-[highlighted]:opacity-100 opacity-50">
                  Archive
                </span>
              </div>
            </Menubar.Item>
          </MenuContentWrapper>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  </Menubar.Root>
);
