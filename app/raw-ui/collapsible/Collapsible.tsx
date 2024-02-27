import { motion } from "framer-motion";

import { Root, Content, Trigger } from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";

interface Props {
  isInitiallyOpen?: boolean;
  slots: {
    trigger: JSX.Element | string;
    preview?: ReactNode;
    content: ReactNode;
  };
}

export const Collapsible = (props: Props) => {
  const { slots, isInitiallyOpen = false } = props;
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      <Trigger asChild={typeof slots.trigger !== "string"}>
        {slots.trigger}
      </Trigger>
      {slots.preview ?? ""}
      <Content forceMount asChild>
        <motion.div
          className="bg-red-100"
          style={{ overflow: "hidden" }}
          animate={{ height: isOpen ? "auto" : "0px" }}
          transition={{ type: "just", duration: 0.2 }}
        >
          {slots.content}
        </motion.div>
      </Content>
    </Root>
  );
};
