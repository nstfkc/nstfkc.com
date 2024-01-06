import { ComponentProps, PropsWithChildren } from "react";
import { LuChevronLeft, LuTrash, LuX } from "react-icons/lu";
import { FaBolt } from "react-icons/fa6";

import magnus from "./assets/magnus.png";
import Image from "next/image";
import { Switch } from "./components/Switch";

const Currency = (props: PropsWithChildren) => {
  const [first, second] = String(props.children).split(".");
  return (
    <span className="text-neutral-300 tracking-wider">
      <span>{first}</span>
      <span className="opacity-50">.{second}</span>
    </span>
  );
};

const Separator = () => {
  return (
    <div className="border border-t-neutral-950 border-b-neutral-700/50 border-l-transparent border-r-transparent" />
  );
};

const PrimaryButton = ({
  children,
  ...buttonProps
}: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className="w-full rounded-[12px] border-[2px] border-neutral-950 bg-gradient-to-b from-orange-200/90 to-orange-500 p-[1px]"
    >
      <div className="w-full h-full flex items-center gap-2 justify-center bg-gradient-to-b from-orange-400 to-orange-600 rounded-[10px] px-4 py-2 text-sm text-white">
        {children}
      </div>
    </button>
  );
};

const SecondaryButton = ({
  children,
  ...buttonProps
}: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className="w-full rounded-[12px] border-[2px] border-neutral-950 bg-neutral-600/50 p-[1px]"
    >
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-700/50 rounded-[10px] px-4 py-2 text-sm">
        {children}
      </div>
    </button>
  );
};

const CircleButton = ({
  children,
  ...buttonProps
}: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className="size-10 rounded-full border border-neutral-950 bg-neutral-600/50 p-[1px]"
    >
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-700/50 rounded-full">
        {children}
      </div>
    </button>
  );
};

const Content = () => {
  return (
    <div className="max-w-[440px] w-full border border-neutral-700/50 rounded-[20px] text-neutral-500">
      <div className="flex justify-between items-center p-4">
        <CircleButton>
          <LuChevronLeft />
        </CircleButton>
        <div>Send payment</div>
        <CircleButton>
          <LuX />
        </CircleButton>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Image
            alt="magnus"
            src={magnus}
            className="size-12 rounded-full border border-neutral-950"
          />
          <div>
            <div className="text-neutral-300">Magnus Carlsen</div>
            <div className="text-xs">hello@magnus.com</div>
          </div>
        </div>
        <div>
          <CircleButton>
            <LuTrash />
          </CircleButton>
        </div>
      </div>
      <Separator />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center font-light">
          <div className="text-neutral-400">Send confirmation</div>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-neutral-400 font-light">
            Instant transfer <span className="opacity-50">&bull;</span>{" "}
            <span className="text-neutral-300/80">$5</span>
          </div>
          <Switch />
        </div>
      </div>
      <Separator />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center font-light">
          <div className="text-neutral-400/80">Amount</div>
          <Currency>$1,000.00</Currency>
        </div>
        <div className="flex justify-between items-center font-light">
          <div className="text-neutral-400/80">Transfer fees</div>
          <Currency>$10.00</Currency>
        </div>
        <div className="flex justify-between items-center font-light">
          <div className="text-neutral-400/80">Network fees</div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-900/50 text-orange-400 rounded-md text-xs px-2 py-[2px]">
              4%
            </div>
            <Currency>$10.00</Currency>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center text-lg">
          <div className="text-neutral-300">Total</div>
          <Currency>$1,050.00</Currency>
        </div>
        <div className="text-xs leading-loose">
          Rutrum quisque non tellus orci, ac auctor augue mauris augue. Congue
          nisi, vitae suscipit tellus{" "}
          <span className="text-orange-600">terms and conditions</span>.
        </div>
      </div>
      <Separator />
      <div className="p-4 flex gap-2">
        <SecondaryButton>Cancel</SecondaryButton>
        <PrimaryButton>
          <FaBolt />
          <span>Send</span>
        </PrimaryButton>
      </div>
    </div>
  );
};

const PaymentModal = () => {
  return (
    <div className="bg-stone-950 h-screen w-screen flex justify-center items-center px-4 md:px-0">
      <div
        className={[
          "rounded-[24px] border border-stone-950/60",
          "bg-gradient-to-b from-neutral-800 to-neutral-900",
        ].join(" ")}
      >
        <div className="rounded-[23px] border border-neutral-900/80">
          <div className="rounded-[22px] border border-neutral-950">
            <div className="rounded-[21px] border border-neutral-900/70">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
