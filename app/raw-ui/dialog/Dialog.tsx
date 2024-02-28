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
  MotionValue,
  motion,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface DialogContextValue {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mainSpring: MotionValue<number>;
}

const DialogContext = createContext({} as DialogContextValue);

export const Dialog = (
  props: PropsWithChildren<{
    initiallyOpen?: boolean;
  }>
) => {
  const { children, initiallyOpen = false } = props;

  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const mainSpring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        setIsOpen,
        open: () => {
          mainSpring.set(100);
          setIsOpen(true);
        },
        close: () => {
          mainSpring.set(0);
        },
        mainSpring,
      }}
    >
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
        <>{children}</>
      </Root>
    </DialogContext.Provider>
  );
};

interface DialogContentProps {
  position?: "top" | "center" | "bottom";
}

export const DialogContent = (props: PropsWithChildren<DialogContentProps>) => {
  const { children, position = "top" } = props;
  const { isOpen, setIsOpen, mainSpring } = useContext(DialogContext);

  const opacity = useTransform(mainSpring, [0, 100], [0, 1]);
  const scale = useTransform(mainSpring, [0, 100], [0.98, 1]);

  const top = position === "center" ? "50%" : "initial";
  const translateY0 =
    position === "center" ? "-40%" : position === "top" ? "-85vh" : "-100%";
  const translateY1 =
    position === "center" ? "-50%" : position === "top" ? "-90vh" : "-110%";

  const translateY = useTransform(
    mainSpring,
    [0, 100],
    [translateY0, translateY1]
  );

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
    <Portal>
      <Overlay asChild>
        <motion.div
          style={{ opacity }}
          onClick={() => mainSpring.set(0)}
          className="fixed inset-0 w-full h-full bg-black/30"
        />
      </Overlay>
      <Content asChild>
        <div className="">
          <motion.div
            style={{
              position: "absolute",
              top,
              left: "50%",
              translateX: "-50%",
              opacity,
              scale,
              translateY,
            }}
          >
            {children}
          </motion.div>
        </div>
      </Content>
    </Portal>
  );
};

export const DialogTrigger = ({
  children,
}: {
  children: JSX.Element | string;
}) => {
  return <Trigger asChild={typeof children !== "string"}>{children}</Trigger>;
};

export const useDialog = () => {
  const { close, isOpen, open } = useContext(DialogContext);
  return { close, isOpen, open };
};

export const DialogClose = Close;
export const DialogTitle = Title;
export const DialogDescription = Description;
