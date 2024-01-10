import alina from "./people/alina.png";
import dave from "./people/dave.png";
import celine from "./people/celine.png";
import michael from "./people/michael.png";
import ayla from "./people/ayla.png";
import { TbActivity, TbBell, TbBrandNetflix, TbDatabase } from "react-icons/tb";
import Image from "next/image";

const Patterns = () => {
  const cx0 = 300;
  const cy0 = 200;
  return (
    <svg viewBox="0 0 400 400">
      {Array.from(Array(24)).map((_, i) => {
        return Array.from(Array(i * 6)).map((_, j, a) => {
          const step = (2 * Math.PI) / a.length;
          const cx = cx0 - Math.cos(step * j + 1.4 * i) * 24 * i;
          const cy = cy0 - Math.sin(step * j + 1.4 * i) * 24 * i;
          const r = 8 - Math.ceil(i / 3);
          const fill = `rgba(${[255, 255, 255, 1 - i / 10].join(",")}) `;
          return <circle key={`${i}-${j}`} cx={cx} cy={cy} r={r} fill={fill} />;
        });
      })}
      <circle cx={cx0} cy={cy0} r="8" fill="rgba(255,255,255, 1)" />
    </svg>
  );
};

const Bar = (props: { active?: boolean; title: string; height: string }) => {
  const { height, title, active = false } = props;
  return (
    <div className="flex flex-col gap-[1px] justify-end items-center h-full">
      <div
        style={{ "--height": height } as any}
        className={[
          "w-4 h-[--height] rounded-sm relative overflow-hidden",
          active ? "bg-white" : "bg-white/10",
        ].join(" ")}
      >
        {Array.from(Array(30)).map((_, i) => (
          <div
            key={i}
            style={{ "--top": `${2 * i}px` } as any}
            className="w-[110%] h-[0.5px] bg-white/10 -skew-y-6 absolute left-0 top-[--top]"
          ></div>
        ))}
      </div>
      <div className="text-[6px]">{title}</div>
    </div>
  );
};

const Mobile = () => {
  return (
    <>
      <div className="w-[240px]">
        <div className="rounded-xl shadow-md w-full aspect-[10/20] bg-black/20 backdrop-blur-md p-[1px]">
          <div className="border-[1px] border-blue-900/10 rounded-xl shadow-inset h-full relative">
            <div className="text-[10px] text-white/80 p-2 flex flex-col justify-between gap-2 h-full">
              <div className="fbc">
                <div className="text-lg">
                  Hello <span className="font-bold">Alina</span>
                </div>
                <div className="fec gap-1">
                  <div className="w-6 h-6 rounded-full bg-white/20 fcc">
                    <TbBell className="text-md" />
                  </div>
                  <div className="">
                    <Image
                      alt="dave"
                      className="w-6 h-6 rounded-full"
                      src={alina}
                    />
                  </div>
                </div>
              </div>

              <div className="ffc gap-2">
                <div className="px-2">
                  <div>Your wallet</div>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-white/20 to-transparent rounded-lg px-4 py-6 relative overflow-hidden">
                    <div className="absolute right-0 top-[50%] opacity-50 translate-y-[-50%] w-2/3">
                      <Patterns></Patterns>
                    </div>
                    <div>
                      <div>Your balance</div>
                      <div className="text-lg font-semibold">$23,540.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="fbc px-2">
                  <span>Activities</span>
                  <div>
                    <TbActivity />
                  </div>
                </div>
                <div className="h-2"></div>
                <div className="grid grid-cols-2 grid-rows-4 gap-1">
                  <div className="col-span-1 row-span-2 bg-white/20 rounded-lg ffbc gap-1 p-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 fcc">
                      <TbDatabase />
                    </div>
                    <div className="ffbc">
                      <span>$12,000</span>
                      <span className="text-[6px]">Monthly salary</span>
                    </div>
                    <div className="rounded-xl bg-white/10 px-2 py-1">
                      <div className="text-[6px] font-semibold">
                        $144,000/year
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 row-span-1 bg-white/20 rounded-lg p-2 ffc gap-1">
                    <div className="text-[8px]">Recent transfer</div>
                    <div className="flex justify-between gap-1 saturate-50">
                      <Image
                        alt="x"
                        src={celine}
                        className="w-4 h-4 rounded-full"
                      />
                      <Image
                        alt="x"
                        src={dave}
                        className="w-4 h-4 rounded-full"
                      />
                      <Image
                        alt="x"
                        src={ayla}
                        className="w-4 h-4 rounded-full"
                      />

                      <Image
                        alt="x"
                        src={michael}
                        className="w-4 h-4 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 row-span-1 bg-white/20 rounded-lg">
                    <div className="flex items-center gap-1 p-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 fcc">
                        <TbBrandNetflix />
                      </div>
                      <div>
                        <div className="font-semibold">Netflix</div>
                        <div className="text-[6px]">Monthly Premium</div>
                        <div className="text-[6px]">-$30.00</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 row-span-2 bg-white/20 rounded-lg p-2 flex justify-between items-center grow gap-2">
                    <div className="ffc items-center">
                      <div className="text-[6px] font-semibold">
                        Yearly stats
                      </div>
                      <div className="text-lg font-semibold">October</div>
                      <div className="rounded-xl bg-white/10 px-2 py-1">
                        View
                      </div>
                    </div>
                    <div className="h-full flex gap-1">
                      <Bar title="Aug" height="60%" />
                      <Bar title="Sep" height="50%" />
                      <Bar title="Oct" height="75%" active={true} />
                      <Bar title="Nov" height="55%" />
                      <Bar title="Dec" height="65%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BankingApp = () => {
  return (
    <div className="bg-gradient-to-tr from-indigo-950 to-orange-400 h-screen w-screen flex items-center justify-center">
      <Mobile />
    </div>
  );
};

export default BankingApp;
