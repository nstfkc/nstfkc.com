"use client";

import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ComponentProps,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import React from "react";
import {
  Root,
  Trigger,
  Portal,
  Content,
  SubTrigger,
  SubContent,
  Arrow,
  Sub,
} from "@radix-ui/react-dropdown-menu";

interface DropdownMenuContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  spring: MotionValue<number>;
}

const DropdownMenuContext = createContext({} as DropdownMenuContextValue);

export const DropdownMenu = (
  props: PropsWithChildren<ComponentProps<typeof Root>>
) => {
  const [isOpen, setIsOpen] = useState(false);

  const spring = useSpring(0, {
    stiffness: 800,
    damping: 30,
  });

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, spring }}>
      <Root
        open={isOpen}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setIsOpen(true);
          } else {
            spring.set(0);
          }
        }}
        {...props}
      />
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = (props: {
  children: JSX.Element | string;
}) => {
  return (
    <Trigger asChild={typeof props.children !== "string"}>
      {props.children}
    </Trigger>
  );
};

export const DropdownMenuContent = (props: PropsWithChildren) => {
  const { isOpen, setIsOpen, spring } = useContext(DropdownMenuContext);
  const opacity = useTransform(spring, [0, 100], [0, 1]);
  const scale = useTransform(spring, [0, 100], [0.95, 1]);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest === 0) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      spring.set(100);
    }
  }, [isOpen, spring]);

  return (
    <Portal>
      <Content
        className={["will-change-[opacity,transform]"].join(" ")}
        sideOffset={6}
        asChild
      >
        <motion.div style={{ opacity, scale }}>
          {props.children}
          <Arrow className="fill-white" />
        </motion.div>
      </Content>
    </Portal>
  );
};

interface SubMenuContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  spring: MotionValue<number>;
}

const SubMenuContext = createContext({} as SubMenuContextValue);

export const SubMenu = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const spring = useSpring(0, {
    stiffness: 800,
    damping: 30,
  });

  return (
    <SubMenuContext.Provider value={{ isOpen, setIsOpen, spring }}>
      <Sub
        open={isOpen}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setIsOpen(true);
          } else {
            spring.set(0);
          }
        }}
        {...props}
      />
    </SubMenuContext.Provider>
  );
};

export const SubMenuContent = (props: PropsWithChildren) => {
  const { isOpen, setIsOpen, spring } = useContext(SubMenuContext);
  const opacity = useTransform(spring, [0, 100], [0, 1]);
  const scale = useTransform(spring, [0, 100], [0.95, 1]);
  const translateX = useTransform(spring, [0, 100], ["-6px", "0px"]);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest === 0) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      spring.set(100);
    }
  }, [isOpen, spring]);

  return (
    <Portal>
      <SubContent asChild>
        <motion.div style={{ opacity, scale, translateX }}>
          {props.children}
        </motion.div>
      </SubContent>
    </Portal>
  );
};

export const SubMenuTrigger = (props: { children: JSX.Element | string }) => {
  return (
    <SubTrigger asChild={typeof props.children !== "string"}>
      {props.children}
    </SubTrigger>
  );
};

export {
  Item,
  ItemIndicator,
  Separator,
  RadioItem,
  Portal,
} from "@radix-ui/react-dropdown-menu";
