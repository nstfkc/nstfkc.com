import { Fragment } from "react";
import { TbPackage } from "react-icons/tb";

const Grid = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from(Array(27)).map((_, i) => (
        <Fragment key={i}>
          <line
            x1="0"
            y1={(i + 1) * 50}
            x2="1200"
            y2={(i + 1) * 50}
            stroke="currentColor"
            strokeWidth="1"
          />

          <line
            x1={(i + 1) * 50}
            y1="0"
            x2={(i + 1) * 50}
            y2="1200"
            stroke="currentColor"
            strokeWidth="1"
          />
        </Fragment>
      ))}
    </svg>
  );
};

const Stars = () => {
  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1400 1400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(200)].map((_, index) => (
        <circle
          key={index}
          cx={getRandomNumber(50, 1350)}
          cy={getRandomNumber(50, 1350)}
          r={getRandomNumber(1, 4)}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

const Button = () => {
  return (
    <button className="border border-black rounded-md shadow-[0px_0px_0px_2px_rgba(0,0,0,0.1)]">
      <div className="relative p-4 shadow-[inset_0px_0px_1px_1px_rgba(255,255,255,0.5)] rounded-[0.3rem] bg-black overflow-hidden">
        <TbPackage className="text-white z-10" />
        <div className="text-white w-[200%] absolute top-[-150%] left-0">
          <Stars />
        </div>
        <div
          className="absolute w-[400%] bottom-[-40%] left-[-150%] z-1 w-full text-white"
          style={{ perspective: "32px" }}
        >
          <div
            style={{
              transform: "rotateX(60deg)",
            }}
          >
            <Grid />
          </div>
        </div>
      </div>
    </button>
  );
};

const Test = () => {
  return (
    <div className="text-lg p-8 relative">
      <Button />
    </div>
  );
};

export default Test;
