"use client";

import {
  Root,
  Content,
  Trigger,
  Portal,
  Overlay,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import {
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface DialogContextValue {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext({
  isOpen: false,
  setOpen: (open: boolean) => {},
} as DialogContextValue);

export const Dialog = (
  props: PropsWithChildren<{
    initiallyOpen?: boolean;
    trigger: JSX.Element | string;
  }>
) => {
  const { children, trigger, initiallyOpen = false } = props;

  const [isOpen, setIsOpen] = useState(false);

  const spring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const control = useTransform(spring, [0, 100], [0, 100]);
  const opacity = useTransform(spring, [0, 100], [0, 1]);
  const scale = useTransform(spring, [0, 100], [0.95, 1]);
  const translateY = useTransform(spring, [0, 100], ["30%", "-20%"]);
  const rotateX = useTransform(spring, [0, 100], ["350deg", "360deg"]);

  useMotionValueEvent(control, "change", (latest) => {
    if (latest === 0) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (initiallyOpen) {
      spring.set(100);
      setIsOpen(true);
    }
  }, [initiallyOpen, spring]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setOpen: (open) => {
          console.log(open);
          if (open) {
            spring.set(100);
            setIsOpen(true);
          } else {
            spring.set(0);
          }
        },
      }}
    >
      <div>
        <Root
          open={isOpen}
          onOpenChange={() => {
            if (!isOpen) {
              spring.set(100);
              setIsOpen(true);
            } else {
              spring.set(0);
            }
          }}
        >
          <Trigger asChild={typeof trigger !== "string"}>{trigger}</Trigger>
          <Portal>
            <Content asChild>
              <div
                style={{ perspective: "200px" }}
                className="fixed w-full h-full inset-0 z-[9999] flex items-center justify-center"
              >
                <Overlay asChild>
                  <motion.div
                    style={{ opacity }}
                    onClick={() => spring.set(0)}
                    className="fixed inset-0 z-[-1] bg-black/40 backdrop-blur-[2px]"
                  />
                </Overlay>
                <motion.div
                  layout
                  style={{
                    opacity,
                    scale,
                    translateY,
                    rotateX,
                  }}
                >
                  {children}
                </motion.div>
              </div>
            </Content>
          </Portal>
        </Root>
      </div>
    </DialogContext.Provider>
  );
};

export const DialogApi = (props: {
  children: (api: DialogContextValue) => JSX.Element;
}) => {
  const { children } = props;
  const api = useContext(DialogContext);

  return <>{children(api)}</>;
};

export const DialogClose = Close;
export const DialogTrigger = Trigger;
export const DialogTitle = Title;
export const DialogDescription = Description;
