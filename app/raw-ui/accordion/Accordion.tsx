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
        {...props}
        value={_value as string | string[]}
        onValueChange={setValue}
      />
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends ComponentProps<typeof Item> {
  slots: {
    header: React.ReactNode;
    content: React.ReactNode;
  };
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const context = useContext(AccordionContext);
    const { slots, ...rest } = props;
    const isActive =
      context.value.includes(props.value) || context.value === props.value;

    return (
      <Item {...rest} ref={ref}>
        <Header>
          <Trigger asChild>{slots.header}</Trigger>
        </Header>
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
            {slots.content}
          </motion.div>
        </Content>
      </Item>
    );
  }
);
