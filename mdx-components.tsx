import type { MDXComponents } from "mdx/types";
import { Code } from "bright";
import { CodeCollapse } from "./components/Collapsible";
import { ClearProse } from "./components/ClearProse";

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
