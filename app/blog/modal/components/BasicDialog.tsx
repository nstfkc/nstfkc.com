"use client";

import { Button } from "./Button";
import { Dialog, DialogClose, DialogTitle } from "./Dialog";

export const BasicDialog = () => {
  return (
    <Dialog trigger={<Button>Open</Button>}>
      <div className="w-full md:w-[400px] px-4 md:px-0">
        <div className="p-4 bg-white shadow-md rounded-xl max-w-md">
          <DialogTitle className="font-semibold text-lg">Welcome!</DialogTitle>
          <p>
            In this blog, you will learn how to implement modals with pleasant
            user experience.
          </p>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button>Start</Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
