import { PropsWithChildren } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import * as Accordion from "@radix-ui/react-accordion";

interface Props {
  label: string;
  value: string;
}

export const SidebarAccordion = (props: PropsWithChildren<Props>) => {
  const { label, value, children } = props;
  return (
    <Accordion.Item value={value}>
      <Accordion.Trigger asChild>
        <button className="group flex gap-2 items-center text-sm opacity-60 px-2">
          <TbCaretDownFilled className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
          <span className="text-xs font-semibold">{label}</span>
        </button>
      </Accordion.Trigger>
      <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
};
