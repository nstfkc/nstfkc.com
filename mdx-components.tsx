import type { MDXComponents } from "mdx/types";
import { Code } from "bright";
import { CodeCollapse } from "./components/Collapsible";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
    CodeCollapse,
  };
}
