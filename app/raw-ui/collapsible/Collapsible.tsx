import { motion } from "framer-motion";

import { Root, Content, Trigger } from "@radix-ui/react-collapsible";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface Props {
  isInitiallyOpen?: boolean;
}

interface CollapsibleContextValue {
  isOpen: boolean;
}

const CollapsibleContext = createContext({} as CollapsibleContextValue);

export const Collapsible = (props: PropsWithChildren<Props>) => {
  const { isInitiallyOpen = false } = props;
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <CollapsibleContext.Provider value={{ isOpen }}>
      <Root open={isOpen} onOpenChange={setIsOpen}>
        {props.children}
      </Root>
    </CollapsibleContext.Provider>
  );
};

export const CollapsibleContent = (props: PropsWithChildren) => {
  const { isOpen } = useContext(CollapsibleContext);
  return (
    <Content forceMount asChild>
      <motion.div
        style={{ overflow: "hidden" }}
        animate={{ height: isOpen ? "auto" : "0px" }}
        transition={{
          type: "spring",
          bounce: isOpen ? 0.2 : 0,
          duration: 0.3,
        }}
      >
        {props.children}
      </motion.div>
    </Content>
  );
};

export const CollapsibleTrigger = (props: {
  children: JSX.Element | string;
}) => {
  return (
    <Trigger asChild={typeof props.children !== "string"}>
      {props.children}
    </Trigger>
  );
};
