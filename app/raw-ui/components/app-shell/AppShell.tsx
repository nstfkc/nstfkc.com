import { Panel, PanelGroup } from "react-resizable-panels";
import { PropsWithChildren } from "react";

export const AppShell = (props: PropsWithChildren) => {
  return <PanelGroup direction="vertical">{props.children}</PanelGroup>;
};

export const AppShellSidebar = (props: PropsWithChildren) => {
  return <Panel id="sidebar">{props.children}</Panel>;
};

export const AppShellContent = (props: PropsWithChildren) => {
  return <Panel id="content">{props.children}</Panel>;
};

export { PanelResizeHandle } from "react-resizable-panels";
