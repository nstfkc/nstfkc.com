import { TbCheck, TbLogout } from "react-icons/tb";

const Envelope = () => {
  return (
    <svg
      viewBox="0 0 180 115"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
    >
      <path
        d="M31.686183,74.975327c-.000001-20.021367,18.364811-12.473405,30.07638-1.187337q.355294.342386,42.880186,39.180759c9.33805,8.421676,14.860098,8.421676,23.824626,0L170.91443,74.975327c11.723539-10.487412,30.401358-19.301745,30.401358,0v82.892704c-.040902,20.367828-17.996401,32.920989-30.401358,32.920989h-109.151867c-14.52235,0-30.076376-12.688694-30.07638-27.984747v-87.828946Z"
        transform="matrix(1.011678 0 0 0.81598-27.886672-46.015212)"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="4px"
      />
    </svg>
  );
};

const Steps = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-l from-slate-100/60 to-white rounded-2xl p-4">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4">
          <div className="border border-[--orange] text-[--orange] p-1 rounded-full">
            <TbCheck />
          </div>
          <span className="text-sm opacity-50">Sign up</span>
        </div>
        <div className="px-3">
          <div className="h-12 w-[1px] bg-orange-500" />
        </div>
        <div className="flex items-center gap-4">
          <div className="border border-[--orange] text-[--orange] p-1 rounded-full">
            <TbCheck />
          </div>
          <span className="text-sm opacity-50">Basic info</span>
        </div>
        <div className="px-3">
          <div className="h-12 w-[1px] bg-[--orange]" />
        </div>
        <div className="flex items-center gap-4">
          <div className="border bg-[--orange] border-[--orange] text-[--orange] p-1 rounded-full">
            <div className="px-1 text-xs text-white">3</div>
          </div>

          <span className="text-sm font-medium text-[--orange]">
            Confirm email
          </span>
        </div>
      </div>
      <div>
        <button className="p-4 rounded-xl flex items-center gap-4 bg-white shadow-md w-full text-sm font-medium">
          <TbLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const x = (
  <div className="w-16 h-8 rounded-full shadow-[0px_24px_32px_rgba(255,0,0,0.6)]"></div>
);

const Content = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-4">
      <div className="flex-1">
        <div>
          <div className="flex justify-center items-center">
            <div className="size-48 relative">
              <div className="absolute z-[0] border rounded-full w-full h-full"></div>
              <div className="absolute z-[1] bg-gradient-to-t from-white from-30% via-white/50 to-white/0 w-full h-full"></div>
              <div className="absolute z-[2] w-full h-full flex justify-center items-center -translate-y-4">
                <div className="size-12 bg-white rounded-md rotate-45 border-[2px] border-slate-200"></div>
              </div>
              <div className="absolute z-[2] flex justify-center items-center w-full h-full">
                <div className=" w-1/5 bg-[--orange] flex flex-col gap-[6px] px-3 pt-2 pb-4 rounded-md -translate-y-6">
                  <div className="w-2/3 h-1 bg-white rounded-sm" />
                  <div className="w-full h-1 bg-white rounded-sm" />
                  <div className="w-full h-1 bg-white rounded-sm" />
                </div>
              </div>
              <div className="absolute z-[3] w-full h-full flex items-center justify-center">
                <div className="w-2/5 text-slate-200">
                  <Envelope />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-12"></div>
        <div>
          <div>
            <span className="font-bold">
              Check your inbox to confirm your email address
            </span>
          </div>
          <div className="h-4"></div>
          <div>
            <p className="font-light">
              We&apos;ve emailed you a link. Please check your inbox, including
              the spam folder to confirm your email and access to the platform.
            </p>
          </div>
        </div>
      </div>
      <div className="h-2"></div>
      <div className="flex justify-between gap-8">
        <button className="min-w-[140px] font-medium shadow-md p-4 rounded-xl text-sm">
          Resend email
        </button>
        <button className="min-w-[140px] font-medium bg-[--orange] shadow-[0px_4px_12px_rgba(255,0,0,0.35)] p-4 rounded-xl text-white text-sm">
          Continue
        </button>
      </div>
    </div>
  );
};

const EmailConfirm = () => {
  return (
    <div
      style={{ "--orange": "#fc470c" }}
      className="w-screen h-screen bg-slate-100/70 text-gray-700"
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="max-w-2xl rounded-3xl shadow-md border border-slate-200/40 p-4 bg-white">
          <div className="flex">
            <div className="min-w-[200px]">
              <Steps />
            </div>
            <div className="flex-1">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
