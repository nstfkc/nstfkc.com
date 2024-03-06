import { motion } from "framer-motion";

import {
  Root,
  Item,
  Header,
  Content,
  Trigger,
} from "@radix-ui/react-accordion";
import {
  ComponentProps,
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

const AccordionContext = createContext<{
  value: string | string[] | undefined;
}>({
  value: [],
});

export const Accordion = ({ value, ...props }: ComponentProps<typeof Root>) => {
  const [_value, setValue] = useState(value);
  return (
    <AccordionContext.Provider value={{ value: _value }}>
      <Root
        {...(props as any)}
        value={_value as string | string[]}
        onValueChange={setValue}
      />
    </AccordionContext.Provider>
  );
};

interface AccordionItemContextValue {
  isActive: boolean;
}

const AccordionItemContext = createContext({} as AccordionItemContextValue);

export const AccordionItem = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Item>
>((props, ref) => {
  const context = useContext(AccordionContext);

  let isActive = false;
  if (Array.isArray(context.value)) {
    isActive = context.value.includes(props.value);
  } else {
    isActive = context.value === props.value;
  }

  return (
    <AccordionItemContext.Provider value={{ isActive }}>
      <Item {...props} ref={ref} />
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = "AccordionItem";

export const AccordionItemContent = (
  props: PropsWithChildren<{ className?: string }>
) => {
  const { isActive } = useContext(AccordionItemContext);
  return (
    <Content forceMount={true} asChild>
      <motion.div
        style={{ overflow: "hidden" }}
        initial={{ height: isActive ? "auto" : 0 }}
        animate={{ height: isActive ? "auto" : 0 }}
        transition={{
          type: "spring",
          bounce: !isActive ? 0 : 0.2,
          duration: 0.3,
        }}
      >
        <div className={props.className}>{props.children}</div>
      </motion.div>
    </Content>
  );
};

export const AccordionItemTrigger = (props: {
  children: JSX.Element | string;
  className?: string;
}) => {
  return (
    <Header>
      <Trigger
        className={props.className}
        asChild={typeof props.children !== "string"}
      >
        {props.children}
      </Trigger>
    </Header>
  );
};
