import { ComponentProps } from "react";

export const Card = (props: ComponentProps<"div">) => {
  const { children, ...rest } = props;
  return (
    <div
      className="rounded-md focus-within:bg-stone-800 transition-all bg-stone-800/50 border border-stone-700/50 p-3"
      {...rest}
    >
      {children}
    </div>
  );
};
