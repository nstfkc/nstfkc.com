import { ComponentProps, forwardRef } from "react";

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
