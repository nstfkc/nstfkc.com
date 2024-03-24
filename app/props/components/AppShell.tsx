"use client";

import { motion } from "framer-motion";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AppShellContextValue {
  isSidebarCollapsed: boolean;
  isSidebarCollapsedMobile: boolean;
  toggleSidebar: VoidFunction;
}

const AppShellContext = createContext({} as AppShellContextValue);

export const useAppShell = () => {
  return useContext(AppShellContext);
};

export const AppShell = (props: PropsWithChildren) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarCollapsedMobile, setIsSidebarCollapsedMobile] =
    useState(true);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarCollapsedMobile((s) => !s);
    } else {
      setIsSidebarCollapsed((s) => !s);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", position: "relative" }}>
      <AppShellContext.Provider
        value={{ isSidebarCollapsed, isSidebarCollapsedMobile, toggleSidebar }}
      >
        {props.children}
      </AppShellContext.Provider>
    </div>
  );
};

export const AppShellSidebar = (
  props: PropsWithChildren<{ width: string }>
) => {
  const { width } = props;
  const { isSidebarCollapsed, isSidebarCollapsedMobile, toggleSidebar } =
    useContext(AppShellContext);
  const [renderMobile, setRenderMobile] = useState(false);
  const initialRender = useRef(false);

  const handleResize = () => {
    setRenderMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (!initialRender.current) {
      initialRender.current = true;
      handleResize();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (renderMobile) {
    return (
      <div
        id="mobile-sidebar"
        style={{
          height: "100%",
          position: "fixed",
          width: 0,
          zIndex: 100,
        }}
      >
        <motion.div
          onClick={() => toggleSidebar()}
          style={{
            position: "fixed",
            width: "100vw",
            background: "rgba(0,0,0,0.3)",
            top: 0,
            left: 0,
            zIndex: -2,
            height: "100%",
          }}
          animate={{
            opacity: isSidebarCollapsedMobile ? 0 : 1,
            pointerEvents: isSidebarCollapsedMobile ? "none" : "auto",
          }}
        />
        <motion.div
          style={{
            width,
            height: "100%",
            translateX: "-100%",
          }}
          initial={{
            translateX: "-100%",
          }}
          animate={{
            translateX: isSidebarCollapsedMobile ? "-100%" : "0%",
          }}
          transition={{
            type: "tween",
            duration: 0.2,
          }}
        >
          {props.children}
        </motion.div>
      </div>
    );
  }
  return (
    <div style={{ height: "100%" }} className="hidden md:block">
      <motion.div
        style={{ height: "100%", overflowX: "hidden" }}
        animate={{ width: isSidebarCollapsed ? "0px" : width }}
        transition={{
          type: "spring",
          duration: 0.3,
          bounce: isSidebarCollapsed ? 0 : 0.2,
        }}
      >
        <motion.div
          style={{
            width,
            height: "100%",
          }}
          animate={{
            translateX: isSidebarCollapsed ? "-10%" : "0%",
          }}
        >
          {props.children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const AppShellContent = (props: PropsWithChildren) => {
  return <div style={{ height: "100%", flexGrow: 1 }}>{props.children}</div>;
};
