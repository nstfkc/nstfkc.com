"use client";

import { DialogWithForm } from "./DialogWithForm";

export const DialogSection = () => {
  return (
    <section id="#dialog" className="w-full px-4">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="h-16"></div>
        <DialogWithForm />
      </div>
    </section>
  );
};
