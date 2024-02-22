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

  const [isOpen, setIsOpen] = useState(false);

  const mainAnimation = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const control = useTransform(mainAnimation, [0, 100], [0, 100]);
  const opacity = useTransform(mainAnimation, [0, 100], [0, 1]);
  const scale = useTransform(mainAnimation, [0, 100], [0.95, 1]);
  const translateY = useTransform(mainAnimation, [0, 100], ["30%", "-20%"]);

  const wrapperAnimation = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  const scaleW = useTransform(wrapperAnimation, [0, 100], [1, 1.1]);

  useMotionValueEvent(control, "change", (latest) => {
    if (latest === 0) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (initiallyOpen) {
      mainAnimation.set(100);
      setIsOpen(true);
    }
  }, [initiallyOpen, mainAnimation]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        pulse: () => {
          wrapperAnimation.set(100);
          setTimeout(() => {
            wrapperAnimation.set(0);
          }, 100);
        },
        open: () => {
          mainAnimation.set(100);
          setIsOpen(true);
        },
        close: () => {
          mainAnimation.set(0);
        },
      }}
    >
      <div>
        <Root
          open={isOpen}
          onOpenChange={() => {
            if (!isOpen) {
              mainAnimation.set(100);
              setIsOpen(true);
            } else {
              mainAnimation.set(0);
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
                    onClick={() => mainAnimation.set(0)}
                    className="fixed inset-0 z-[-1] bg-black/30"
                  />
                </Overlay>
                <motion.div style={{ scale: scaleW }}>
                  <motion.div
                    layout
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
