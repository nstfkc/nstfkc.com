"use client";

import { Button } from "./Button";
import { Dialog, DialogClose, DialogTitle } from "./Dialog";

export const SimpleDialog = () => {
  return (
    <Dialog initiallyOpen={true} trigger={<Button>Open</Button>}>
      <div className="p-4 bg-white shadow-md rounded-xl max-w-md">
        <DialogTitle className="font-semibold text-lg">Welcome!</DialogTitle>
        <p>
          In this blog, you will learn how to implement modals with pleasant
          user experience.
        </p>
        <div className="flex justify-end">
          <DialogClose>
            <Button>Start</Button>
          </DialogClose>
        </div>
      </div>
    </Dialog>
  );
};
