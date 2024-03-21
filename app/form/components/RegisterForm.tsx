"use client";

import { Form, Input, useInputState } from "@/lib/form";
import { Checkbox, ErrorMessage } from "@/lib/form/Form";
import { ComponentProps, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";

import * as z from "zod";

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string;
  description?: string;
}

const InputField = (props: InputFieldProps) => {
  const { label, description, ...inputProps } = props;

  const { error, isDirty, value, isFocused } = useInputState(inputProps);

  const showDescription = isFocused || error;
  const isValid = isDirty && !error && !!value && !isFocused;
  return (
    <label
      data-has-error={!!error}
      data-valid={isValid}
      className={[
        "group px-2 py-1 rounded-lg border-zinc-400 border-opacity-20",
        "bg-zinc-100 block focus-within:border-opacity-100 border-2",
        "data-[has-error=true]:border-red-300",
        "data-[has-error=true]:bg-red-50",
        "transition-all duration-200",
      ].join(" ")}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold opacity-50">{label}</span>
          <span
            className={[
              "text-xs transition",
              showDescription ? "opacity-60" : "opacity-0",
            ].join(" ")}
          >
            {description}
          </span>
        </div>
        <Input
          {...inputProps}
          className="bg-[transparent!important] tracking-wide outline-none"
        />
      </div>
      <div className="flex">
        <div>
          <div className="text-xs text-red-400 group-data-[has-error=true]:max-h-[100px] max-h-0 overflow-hidden duration-[300ms] transition-all">
            <div className="py-1">{error ?? <wbr />}</div>
          </div>
        </div>
      </div>
    </label>
  );
};

const schema = z
  .object({
    fullName: z.string().min(3, "Too short"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password should be minimum 8 characters")
      .regex(
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/,
        "Should contain at least one special character"
      )
      .regex(/[A-Z]/, "Should contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Should contain at least 1 lowercase letter"),

    passwordRepeat: z.string(),
    updates: z.boolean(),
    termsAndConditions: z.boolean().refine((arg) => arg === true, {
      message: "Terms and conditions have to be accepted.",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Password doesn't match",
    path: ["passwordRepeat"],
  });

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={async (e, form) => {
        if (form) {
          setIsLoading(true);
          await new Promise((res) => setTimeout(() => res({}), 1000));
          setIsLoading(false);
          form.reset();
          toast.success(
            "Sign in successful. You will be redirected to the login page."
          );
        }
      }}
      schema={schema}
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          description="How others will call you"
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          description="Your work email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          description="A secure password you don't forget"
        />
        <InputField
          label="Password confirm"
          type="password"
          name="passwordRepeat"
          description="Same password you just entered"
        />
      </div>
      <div className="h-4" />
      <div className="px-3 flex flex-col gap-2">
        <div>
          <label className="flex items-center gap-2">
            <Checkbox name="updates" className="accent-zinc-700" />
            <span>I want to receive updates via email</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <Checkbox name="termsAndConditions" className="accent-zinc-700" />
            <span>
              I accept the{" "}
              <a href="#" className="underline font-semibold">
                terms and conditions
              </a>
            </span>
          </label>
          <div>
            <ErrorMessage className="text-red-400" name="termsAndConditions" />
          </div>
        </div>
      </div>
      <div className="h-4" />
      <div className="flex justify-between items-center">
        <div>
          <div className="flex flex-col leading-tight">
            <span className="">Already have an account?</span>
            <a href="#" className="font-semibold underline">
              Sign in
            </a>
          </div>
        </div>
        <button
          data-loading={isLoading}
          className={[
            "group",
            "active:scale-[0.99]",
            "px-4 py-2 text-white font-medium rounded-lg",
            "bg-gradient-to-b from-zinc-600 to-zinc-700",
            "border border-zinc-500 shadow-md",
            "flex items-center",
          ].join(" ")}
          type="submit"
        >
          <span>Sign up</span>
          <div className="transition-all w-0 group-data-[loading=true]:w-[24px] group-data-[loading=true]:pl-2 overflow-hidden">
            <LuLoader2 className="animate-spin" />
          </div>
        </button>
      </div>
    </Form>
  );
};
