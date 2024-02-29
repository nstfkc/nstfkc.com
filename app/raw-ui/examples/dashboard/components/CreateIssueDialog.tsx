"use client";

import { Button } from "./Button";
import { Switch } from "./Switch";

import { DialogTitle, useDialog } from "../../../components/dialog/Dialog";

import { FormEvent, useRef, useState } from "react";
import { useSpring, useTransform, motion } from "framer-motion";

const CreateTaskForm = (props: { onCreate: VoidFunction }) => {
  const { onCreate = () => {} } = props;
  const dialog = useDialog();
  const [isCreateMoreActive, setIsCreateMoreActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (isCreateMoreActive) {
      formRef.current?.reset();
      onCreate();
      inputRef.current?.focus();
    } else {
      dialog.close();
    }
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

export const CreateIssueDialog = () => {
  const spring = useSpring(0, {
    stiffness: 300,
    damping: 30,
  });
  const scale = useTransform(spring, [0, 100], [1, 1.04]);
  const pulse = () => {
    spring.set(100);
    setTimeout(() => {
      spring.set(0);
    }, 200);
  };
  return (
    <div className="w-screen p-4 md:p-0 md:w-[700px]">
      <motion.div
        style={{ scale }}
        className="p-6 bg-white shadow-md rounded-xl flex flex-col gap-6"
      >
        <DialogTitle className="font-semibold text-lg">
          Create new issue
        </DialogTitle>
        <hr />
        <CreateTaskForm onCreate={() => pulse()} />
      </motion.div>
    </div>
  );
};
