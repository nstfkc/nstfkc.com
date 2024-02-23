import type { MDXComponents } from "mdx/types";
import { Code } from "bright";
import { CodeCollapse } from "./components/Collapsible";
import { CodeCopy } from "./components/CodeCopy";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    CodeCollapse,
  };
}
