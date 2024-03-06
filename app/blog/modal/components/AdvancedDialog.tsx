"use client";

import { toast } from "sonner";

import { Button } from "./Button";
import { Dialog, DialogTitle, useDialog } from "./Dialog";
import { FormEvent, useRef, useState } from "react";
import { Switch } from "./Switch";

const CreateTaskForm = () => {
  const dialog = useDialog();
  const [isCreateMoreActive, setIsCreateMoreActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (isCreateMoreActive) {
      dialog.pulse();
      formRef.current?.reset();
      inputRef.current?.focus();
    } else {
      dialog.close();
    }

    toast.success("Task created");
  };

  return (
    <form ref={formRef} onSubmit={handleSignIn} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              e.preventDefault();
              handleSignIn(e);
            }
          }}
          placeholder="Issue title"
          className="outline-none text-lg font-semibold placeholder:font-bold"
        />
      </div>
      <div className="flex flex-col">
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              e.preventDefault();
              handleSignIn(e);
            }
          }}
          placeholder="Add description"
          className="outline-none resize-none"
        />
      </div>
      <div className="h-4"></div>
      <div className="flex justify-end gap-8">
        <div className="flex items-center gap-2">
          <label className="text-sm" htmlFor="create-more">
            Create More
          </label>
          <Switch
            defaultChecked={isCreateMoreActive}
            onCheckedChange={(s) => setIsCreateMoreActive(s)}
            id="create-more"
          />
        </div>
        <Button>Create</Button>
      </div>
    </form>
  );
};

export const AdvancedDialog = () => {
  return (
    <Dialog trigger={<Button>Open</Button>}>
      <div className="w-screen p-4 md:p-0 md:w-[700px]">
        <div className="p-6 bg-white shadow-md rounded-xl flex flex-col gap-6">
          <DialogTitle className="font-semibold text-lg">
            Create new issue
          </DialogTitle>
          <hr />
          <CreateTaskForm />
        </div>
      </div>
    </Dialog>
  );
};
