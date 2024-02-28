"use client";

import { Button } from "../components/Button";
import { Switch } from "../components/Switch";

import { FormEvent, PropsWithChildren, useRef, useState } from "react";

import {
  DropdownMenu,
  Item,
  SubMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SubMenuContent,
  SubMenuTrigger,
} from "./DropdownMenu";

const itemClasses = [
  "h-8 px-2",
  "group text-[13px] leading-none rounded-[3px]",
  "flex items-center justify-between relative select-none outline-none",
  "data-[disabled]:text-black data-[disabled]:pointer-events-none",
  "data-[highlighted]:bg-black/10 data-[highlighted]:text-indigo-900",
].join(" ");

const CustomItem = (props: PropsWithChildren) => {
  const { children } = props;
  return <Item className={itemClasses}>{children}</Item>;
};

export const DropdownMenuExample = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="min-w-[200px] bg-white rounded-md shadow-md p-1">
            <SubMenu>
              <SubMenuTrigger>
                <div className={itemClasses}>Sub menu x</div>
              </SubMenuTrigger>
              <SubMenuContent>
                <div className="min-w-[200px] bg-white rounded-md shadow-md p-1">
                  <CustomItem>
                    Sub Item 1 <div className="opacity-50">⌘+T</div>
                  </CustomItem>

                  <CustomItem>
                    Sub item 2 <div className="opacity-50">⌘+T</div>
                  </CustomItem>
                </div>
              </SubMenuContent>
            </SubMenu>
            <CustomItem>
              New Tab <div className="opacity-50">⌘+T</div>
            </CustomItem>
            <CustomItem>
              New Tab <div className="opacity-50">⌘+T</div>
            </CustomItem>

            <SubMenu>
              <SubMenuTrigger>
                <div className={itemClasses}>Sub menu</div>
              </SubMenuTrigger>
              <SubMenuContent>
                <div className="min-w-[200px] bg-white rounded-md shadow-md p-1">
                  <CustomItem>
                    Sub Item 1 <div className="opacity-50">⌘+T</div>
                  </CustomItem>

                  <CustomItem>
                    Sub item 2 <div className="opacity-50">⌘+T</div>
                  </CustomItem>
                </div>
              </SubMenuContent>
            </SubMenu>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
