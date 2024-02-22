"use client";

import { Button } from "./Button";
import { Input } from "./Input";
import { Dialog, DialogTitle, useDialog } from "./Dialog";
import { FormEvent, useState } from "react";

const SignInForm = () => {
  const dialog = useDialog();
  const [isPending, setIsPending] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Signing in...");
    setIsPending(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPending(false);

    dialog.close();
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="px-2 font-semibold text-sm" htmlFor="email">
          Email
        </label>
        <Input
          defaultValue="hi@nstfkc.com"
          placeholder="Email"
          type="email"
          id="email"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="px-2 font-semibold text-sm">
          Password
        </label>
        <Input
          defaultValue="secretpassword"
          placeholder="Password"
          type="password"
          id="password"
        />
      </div>
      <div className="h-4"></div>
      <div className="flex justify-between">
        <button className="text-sm font-medium">Forgot password</button>
        <Button disabled={isPending}>Submit {isPending && "..."}</Button>
      </div>
    </form>
  );
};

export const AsyncDialog = () => {
  return (
    <Dialog trigger={<button>Open</button>}>
      <div className="p-6 bg-white shadow-md rounded-xl max-w-md w-[300px] flex flex-col gap-6">
        <DialogTitle className="font-semibold text-lg">Sign In</DialogTitle>
        <hr />
        <SignInForm />
      </div>
    </Dialog>
  );
};
