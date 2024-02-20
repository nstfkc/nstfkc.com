"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Dialog, DialogClose, DialogTitle } from "./Dialog";
import { ComponentProps, forwardRef } from "react";
import { SpringOptions } from "framer-motion";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <button
        ref={ref}
        {...rest}
        className="bg-stone-900 text-white px-4 py-2 rounded-md tracking-wide font-medium shadow-md text-sm active:scale-[0.97] transition-all"
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

const options = [
  {
    key: "damping",
    label: "Damping",
    min: 0,
    max: 1000,
    step: 1,
    defaultValue: 30,
    description:
      "Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 30 by default.",
  },
  {
    key: "stiffness",
    label: "Stiffness",
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: 300,
    description:
      "Stiffness of the spring. Higher values will create more sudden movement. Set to 300 by default.",
  },
  {
    key: "mass",
    label: "Mass",
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 1,
    description:
      "Mass of the moving object. Higher values will result in more lethargic movement. Set to 1 by default.",
  },
  {
    key: "restSpeed",
    label: "Rest Speed",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.01,
    description:
      "End animation if absolute speed (in units per second) drops below this value and delta is smaller than rest delta. Set to 0.01 by default.",
  },
  {
    key: "restDelta",
    label: "Rest Delta",
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.01,
    description:
      "End animation if distance is below this value and speed is below rest speed. When animation ends, spring gets “snapped” to. Set to 0.01 by default.",
  },
  {
    key: "velocity",
    label: "Velocity",
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 1,
    description:
      "The initial velocity of the spring. By default this is the current velocity of the component.",
  },
];

const defaultOptions: SpringOptions = options.reduce(
  (acc, option) => ({ ...acc, [String(option.key)]: option.defaultValue }),
  {} as SpringOptions
);

export const DialogSection = (
  props: PropsWithChildren<{ initialSpringOptions: SpringOptions }>
) => {
  const [springOptions, setSpringOptions] = useState<SpringOptions>({
    ...defaultOptions,
    ...props.initialSpringOptions,
  });

  const handleUpdateSpringOptions = <T extends keyof SpringOptions>(
    key: T,
    value: SpringOptions[T]
  ) => {
    setSpringOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(springOptions)) {
      searchParams.set(key, String(value));
    }
    window.history.replaceState({}, "/", `?${searchParams.toString()}`);
  }, [springOptions]);

  return (
    <section id="#dialog" className="w-full px-4">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          {options.map((option) => (
            <div key={option.key} className="flex flex-col max-w-md">
              <label htmlFor={option.key} className="font-semibold">
                {option.label}:{" "}
                {springOptions[option.key as keyof SpringOptions]}
              </label>
              <p>{option.description}</p>
              <input
                type="range"
                id={option.key}
                min={option.min}
                max={option.max}
                step={option.step}
                value={springOptions[option.key as keyof SpringOptions]}
                onChange={(e) =>
                  handleUpdateSpringOptions(
                    option.key as keyof SpringOptions,
                    Number(e.target.value)
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="h-16"></div>
        <Dialog springOptions={springOptions} trigger={<Button>Open</Button>}>
          <div className="p-4 max-w-md">
            <div className="relative bg-white rounded-md p-4 w-full flex flex-col gap-4">
              <DialogClose className="absolute right-0 top-0 size-8">
                &#x2715;
              </DialogClose>
              <DialogTitle className="text-lg font-semibold">
                Terms and Conditions
              </DialogTitle>
              <div className="">
                Quis blandit turpis cursus in hac habitasse platea dictumst
                quisque sagittis, purus sit. Facilisis leo, vel fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam quis enim
                lobortis scelerisque fermentum?
              </div>
              <div>
                <DialogClose asChild>
                  <Button>Accept</Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </section>
  );
};
