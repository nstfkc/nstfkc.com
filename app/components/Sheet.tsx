import { PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TbX } from "react-icons/tb";

export const Sheet = ({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>) => {
  return (
    <>
      <div className="hidden md:block">{children}</div>
      <div className="lg:hidden">
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0 z-[1000]" />
            <Dialog.Content className="data-[state=open]:animate-slideRight data-[state=closed]:animate-slideLeft fixed top-0 h-[100dvh] z-[1000]">
              {children}
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <TbX />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};
