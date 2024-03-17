"use client";

import { Form, Input, useInputState } from "@/lib/form";
import { ComponentProps } from "react";

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string;
  description?: string;
}

const InputField = (props: InputFieldProps) => {
  const { label, description, ...inputProps } = props;

  const state = useInputState(inputProps);

  const { error, isDirty, value } = state;

  return (
    <label
      data-has-error={!!error && isDirty}
      className={[
        "group px-2 py-1 rounded-lg",
        "bg-zinc-100 block focus-within:border-zinc-400 border-2",
        "data-[has-error=true]:border-red-300",
        "data-[has-error=true]:bg-red-50",
      ].join(" ")}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold opacity-75">{label}</span>
          <span
            className={[
              "text-xs transition",
              !(!error && isDirty) ? "opacity-60" : "opacity-0",
            ].join(" ")}
          >
            {description}
          </span>
        </div>
        <Input
          {...inputProps}
          className="bg-transparent tracking-wide outline-none"
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

export const LoginForm = () => {
  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={(e, state) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-4">
        <InputField
          autoFocus={true}
          label="Email"
          type="email"
          name="email"
          validate={(value) => {
            if (value === "" || !value) {
              return "Email is required";
            }
            if (!value.includes("@")) {
              return "Invalid email address";
            }
            return null;
          }}
          description="Your work email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          description=""
          validate={(value) => {
            if (value === "" || !value) {
              return "Password is required";
            }
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (
              !new RegExp(
                /^(?=.*[!@#$%^&*()-=_+[\]{};':"\\|,.<>?])(?=.*[A-Z]).*$/
              ).test(value)
            ) {
              return "Password must contain at least one special character and one uppercase letter";
            }
            return null;
          }}
        />
      </div>
      <hr />
      <div>
        <button
          className={[
            "px-4 py-2 text-white font-medium rounded-lg",
            "bg-gradient-to-b from-zinc-600 to-zinc-700",
            "border border-zinc-500 shadow-md",
          ].join(" ")}
          type="submit"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
