import type { MDXComponents } from "mdx/types";
import { Code } from "bright";
import { CodeCollapse } from "./components/Collapsible";
import { ComponentProps } from "react";

const ClearProse = (props: ComponentProps<"div">) => {
  return <div className="no-prose" {...props}></div>;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    ClearProse,
    CodeCollapse: (props) => {
      return (
        <CodeCollapse
          {...props}
          content={props.children.props.children.props.children}
        />
      );
    },
  };
}
