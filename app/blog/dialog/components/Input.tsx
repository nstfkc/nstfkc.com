import { ComponentProps, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <input
        ref={ref}
        {...rest}
        className={[
          "outline-stone-600",
          "p-2 rounded-md border border-stone-200",
          "tracking-wide font-medium text-sm",
          "bg-stone-50",
          "active:scale-[0.99] transition-all",
        ].join(" ")}
      >
        {children}
      </input>
    );
  }
);

Input.displayName = "Input";
