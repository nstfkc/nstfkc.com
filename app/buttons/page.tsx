import { ComponentProps } from "react";

const Button = (props: ComponentProps<"button">) => {
  const { children, className } = props;
  const primary = [
    "bg-gradient-to-b from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900",
    "text-white",
    "ring-stone-800/60",
    "border border-stone-800 shadow-md",
  ];

  const classes = [
    ...primary,
    "px-4 py-2",
    "text-white font-medium rounded-xl",
    "active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-1 ring-offset-1",
    "inline-flex items-center justify-center",
    className,
  ].join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Button2 = (props: ComponentProps<"button">) => {
  const { children, className } = props;
  const primary = [
    "bg-black/5 hover:bg-black/10",
    "ring-stone-800/60",
    "border-stone-800",
    "border shadow-md",
  ];

  const classes = [
    ...primary,
    "px-4 py-2",
    "font-medium rounded-xl",
    "active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-1 ring-offset-1",
    "inline-flex items-center justify-center",
    className,
  ].join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Button3 = (props: ComponentProps<"button">) => {
  const { children, className } = props;
  const primary = ["", "ring-stone-800/60"];

  const classes = [
    ...primary,
    "px-4 py-2",
    "font-medium rounded-xl",
    "active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-1 ring-offset-1",
    "inline-flex items-center justify-center",
    className,
  ].join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Button4 = (props: ComponentProps<"button">) => {
  const { children, className } = props;
  const primary = [
    "bg-emerald-600 hover:bg-emerald-700",
    "text-stone-100",
    "ring-stone-800/60",
  ];

  const classes = [
    ...primary,
    "px-4 py-2",
    "font-medium rounded-xl",
    "active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-1 ring-offset-1",
    "inline-flex items-center justify-center",
    className,
  ].join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Set1 = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Button>Primary</Button>
        <Button2>Secondary</Button2>
        <Button3>Tertiary</Button3>
        <Button4>Success</Button4>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="p-8 bg-stone-50 min-h-screen">
      <Set1 />
    </div>
  );
};

export default Page;
