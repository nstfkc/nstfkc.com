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
  open: VoidFunction;
  close: VoidFunction;
  pulse: VoidFunction;
}

const initialContextValue: DialogContextValue = {
  isOpen: false,
  open: () => {},
  close: () => {},
  pulse: () => {},
};

// The context allows components inside the Dialog to access the state and control the dialog
// E.g If you want to close the dialog after a form submission, you can use the close function
const DialogContext = createContext(initialContextValue);

export const Dialog = (
  props: PropsWithChildren<{
    initiallyOpen?: boolean;
    trigger: JSX.Element | string;
  }>
) => {
  const { children, trigger, initiallyOpen = false } = props;

  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const mainSpring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const opacity = useTransform(mainSpring, [0, 100], [0, 1]);
  const scale = useTransform(mainSpring, [0, 100], [0.95, 1]);
  const translateY = useTransform(mainSpring, [0, 100], ["30%", "0%"]);

  const wrapperSpring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const scalePulse = useTransform(wrapperSpring, [0, 100], [1, 1.1]);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest === 0) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      mainSpring.set(100);
    }
  }, [isOpen, mainSpring]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        pulse: () => {
          wrapperSpring.set(100);
          setTimeout(() => {
            wrapperSpring.set(0);
          }, 100);
        },
        open: () => {
          mainSpring.set(100);
          setIsOpen(true);
        },
        close: () => {
          mainSpring.set(0);
        },
      }}
    >
      <div>
        <Root
          open={isOpen}
          onOpenChange={() => {
            if (!isOpen) {
              setIsOpen(true);
            } else {
              mainSpring.set(0);
            }
          }}
        >
          <Trigger asChild={typeof trigger !== "string"}>{trigger}</Trigger>
          <Portal>
            <Content asChild>
              <div className="fixed w-full h-full inset-0 z-[9999] flex items-center justify-center">
                <Overlay asChild>
                  <motion.div
                    style={{ opacity }}
                    onClick={() => mainSpring.set(0)}
                    className="fixed inset-0 z-[-1] bg-black/30"
                  />
                </Overlay>
                <motion.div style={{ scale: scalePulse }}>
                  <motion.div
                    style={{
                      opacity,
                      scale,
                      translateY,
                    }}
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            </Content>
          </Portal>
        </Root>
      </div>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogClose = Close;
export const DialogTrigger = Trigger;
export const DialogTitle = Title;
export const DialogDescription = Description;
