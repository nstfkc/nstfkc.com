"use client";

import { Root, Trigger, Content } from "@radix-ui/react-collapsible";
import { CodeCopy } from "./CodeCopy";

export const CodeCollapse = (props: {
  children: React.ReactNode;
  showAll?: boolean;
  content: string;
}) => {
  const { children, content, showAll = false } = props;

  return (
    <Root defaultOpen={showAll}>
      <div className="relative">
        <CodeCopy content={content} />
        {showAll ? (
          <Content
            className="rounded-md [&>div]:m-[0!important] [&>pre]:pb-[16px!important]"
            forceMount={true}
          >
            {children}
          </Content>
        ) : (
          <Content
            style={{ "--preview-height": `300px` } as any}
            className="data-[state=closed]:h-[--preview-height] overflow-scroll rounded-md [&>div]:m-[0!important] [&>pre]:pb-[16px!important]"
            forceMount={true}
          >
            {children}
          </Content>
        )}

        {!showAll && (
          <div className="absolute w-full bottom-0 bg-black/10 py-2 flex justify-center">
            <Trigger className="group text-white text-sm bg-stone-700 hover:bg-stone-600 p-1 px-2 rounded-md font-medium">
              <span className="block group-data-[state=open]:hidden">
                Expand code
              </span>
              <span className="block group-data-[state=closed]:hidden">
                Collapse code
              </span>
            </Trigger>
          </div>
        )}
      </div>
    </Root>
  );
};
