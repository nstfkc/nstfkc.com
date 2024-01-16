"use client";

import { ComponentProps, useState } from "react";
import { LuActivity, LuAlarmClock, LuUser } from "react-icons/lu";

const Wrapper = (
  props: ComponentProps<"div"> & { step: number; index: number }
) => {
  const { index, step, className, children, ...rest } = props;
  return (
    <div
      {...rest}
      data-active={index === step}
      style={{
        "--top": index < step ? "-20%" : "0",
      }}
      className={[
        "group absolute h-full w-full",
        "pointer-events-none data-[active=true]:pointer-events-auto",
        "transition-all duration-[200ms]",
        "opacity-0 data-[active=true]:opacity-100",
        "data-[active=true]:opacity-100",
        "top-[--top]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

const BottomWrapper = (
  props: ComponentProps<"div"> & { step: number; index: number }
) => {
  const { index, step, className, children, ...rest } = props;
  return (
    <div
      {...rest}
      data-active={index === step}
      style={{
        "--left": index < step ? "-20%" : "0",
      }}
      className={[
        "group absolute h-full w-full",
        "pointer-events-none data-[active=true]:pointer-events-auto",
        "transition-all duration-[500ms]",
        "opacity-0 data-[active=true]:opacity-100",
        "data-[active=true]:opacity-100",
        "left-[--left]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export const OnboardingCard = () => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <div className="w-[300px] rounded-xl overflow-hidden bg-white shadow-xl">
        <div
          className={[
            "relative",
            "bg-blue-400 rounded-t-xl",
            "transition-all duration-[500ms] overflow-hidden",
            step > 0 && step < 4 ? "rounded-b-none" : "rounded-b-xl",
            step > 0 && step < 4 ? "aspect-[4/3]" : "aspect-video",
          ].join(" ")}
        >
          <Wrapper step={step} index={0}>
            <div className="w-full h-full flex justify-end items-end p-4">
              <button
                onClick={() => setStep((s) => s + 1)}
                className="group-data-[active=true]:opacity-100 opacity-0 bg-white rounded-full px-4 py-1 text-sm font-semibold active:translate-y-[1px]"
              >
                Start
              </button>
            </div>
          </Wrapper>
          <Wrapper step={step} index={1}>
            <div className="w-full h-full flex items-center justify-center">
              <LuUser className="text-6xl text-white" />
            </div>
          </Wrapper>
          <Wrapper step={step} index={2}>
            <div className="w-full h-full flex items-center justify-center">
              <LuActivity className="text-6xl text-white" />
            </div>
          </Wrapper>
          <Wrapper step={step} index={3}>
            <div className="w-full h-full flex items-center justify-center">
              <LuAlarmClock className="text-6xl text-white" />
            </div>
          </Wrapper>
          <Wrapper step={step} index={4}>
            <div className="w-full h-full flex items-center justify-center text-white transition-all duration-[200ms] opacity-0 delay-[300ms] group-data-[active=true]:opacity-100">
              Well done 🎉
            </div>
          </Wrapper>
        </div>
        <div
          className={[
            "relative",
            "overflow-hidden transition-all duration-[500ms]",
            step > 0 && step < 4 ? "h-[300px]" : "h-0",
          ].join(" ")}
        >
          <div className="h-full overflow-scroll">
            <BottomWrapper index={1} step={step}>
              <div className="p-4">
                <p>
                  Vitae nunc sed velit dignissim sodales ut eu sem integer vitae
                  justo eget magna fermentum. Massa sed elementum tempus egestas
                  sed sed risus pretium quam vulputate dignissim suspendisse in
                  est.
                </p>
              </div>
            </BottomWrapper>
            <BottomWrapper index={2} step={step}>
              <div className="p-4">
                <p>
                  Aliquam id diam maecenas ultricies mi. Facilisis mauris sit
                  amet massa vitae tortor condimentum lacinia quis vel eros
                  donec ac odio tempor orci dapibus ultrices in iaculis nunc sed
                  augue.
                </p>
              </div>
            </BottomWrapper>
            <BottomWrapper index={3} step={step}>
              <div className="p-4">
                <p>
                  Aliquam id diam maecenas ultricies mi. Facilisis mauris sit
                  amet massa vitae tortor condimentum lacinia quis vel eros
                  donec ac odio tempor orci dapibus ultrices in iaculis nunc sed
                  augue.
                </p>
              </div>
            </BottomWrapper>
            <div className="absolute w-full bottom-0 bg-gradient-to-b from-white/5 to-white p-4 pt-8">
              <button
                onClick={() => setStep((s) => s + 1)}
                className="w-full px-4 py-1 bg-blue-400 rounded-full text-white font-medium active:translate-y-[1px]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
