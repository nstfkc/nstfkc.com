import { createContext, useState } from "react";

interface ConfigContextValue {
  a: number;
  b: number;
  multiplier: number;
  offset: number;
}

export const ConfigContext = createContext<ConfigContextValue>(
  {} as ConfigContextValue
);

export const ConfigProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [a, setA] = useState(1.42);
  const [b, setB] = useState(1.4);
  const [multiplier, setMultiplier] = useState(160);
  const [offset, setOffset] = useState(120);
  return (
    <ConfigContext.Provider
      value={{
        a,
        b,
        multiplier,
        offset,
      }}
    >
      <div className="hidden">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col gap-1">
            <label htmlFor="">a: {a}</label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.01}
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">b: {b}</label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">multiplier: {multiplier}</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">offset: {offset}</label>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      {children}
    </ConfigContext.Provider>
  );
};
