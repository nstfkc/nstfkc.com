"use client";

import {
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

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

interface Props {
  trigger: JSX.Element | string;
  children: React.ReactNode;
}

export const DropdownMenu = (props: Props) => {
  const { trigger, children } = props;
  const spring = useSpring(0, {
    stiffness: 800,
    damping: 30,
  });

  const opacity = useTransform(spring, [0, 100], [0, 1]);
  const scale = useTransform(spring, [0, 100], [0.95, 1]);

  const [isOpen, setIsOpen] = useState(false);

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
    <Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setIsOpen(true);
        } else {
          spring.set(0);
        }
      }}
    >
      <Trigger asChild={typeof trigger !== "string"}>{trigger}</Trigger>
      <Portal>
        <Content
          className={[
            "will-change-[opacity,transform]",
            "data-[side=right]:animate-slideLeftAndFade",
            "data-[side=bottom]:animate-slideUpAndFade",
            "data-[side=left]:animate-slideRightAndFade",
            "data-[side=top]:animate-slideDownAndFade",
          ].join(" ")}
          sideOffset={6}
          asChild
        >
          <motion.div style={{ opacity, scale }}>
            {children}
            <Arrow className="fill-white" />
          </motion.div>
        </Content>
      </Portal>
    </Root>
  );
};

export const SubMenu = (
  props: PropsWithChildren<{ trigger: JSX.Element | string }>
) => {
  const { children, trigger, ...rest } = props;
  const spring = useSpring(0, {
    stiffness: 800,
    damping: 30,
  });

  const opacity = useTransform(spring, [0, 100], [0, 1]);
  const scale = useTransform(spring, [0, 100], [0.95, 1]);
  const translateX = useTransform(spring, [0, 100], ["-6px", "0px"]);

  const [isOpen, setIsOpen] = useState(false);

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
    <Sub
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setIsOpen(true);
        } else {
          spring.set(0);
        }
      }}
      {...rest}
    >
      <SubTrigger asChild={typeof trigger !== "string"}>{trigger}</SubTrigger>
      <Portal>
        <SubContent asChild>
          <motion.div style={{ opacity, scale, translateX }}>
            {children}
          </motion.div>
        </SubContent>
      </Portal>
    </Sub>
  );
};

export {
  Item,
  ItemIndicator,
  Separator,
  RadioItem,
  Portal,
} from "@radix-ui/react-dropdown-menu";
