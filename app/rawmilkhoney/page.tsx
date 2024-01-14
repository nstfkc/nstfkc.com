import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { TbArrowDown, TbCalendar, TbMinusVertical } from "react-icons/tb";

const notoSans = Noto_Sans({ subsets: ["latin"] });

const Page = () => {
  return (
    <main className={`${notoSans.className} text-stone-700`}>
      <div className="relative w-screen h-screen bg-stone-100/50 ">
        <div className="absolute w-full h-full z-[1] backdrop-blur-xl"></div>
        <div className="absolute w-full h-full z-[-1]">
          <div className="w-[30%] aspect-square rounded-full bg-orange-600/20"></div>
          <div className="w-[40%] absolute top-[10%] left-[20%] aspect-square rounded-full bg-red-500/10"></div>
          <div className="w-[60%] absolute bottom-[10%] right-[-20%] aspect-square rounded-full bg-red-300/20"></div>
        </div>
        <div className="relative top-0 h-screen z-[20]">
          <div className="h-full container mx-auto max-w-5xl z-[10] flex flex-col">
            <header className="p-8 flex justify-between items-center">
              <Link href="/">
                <div className="text-xl font-bold tracking-tight">
                  rawmilk & honey
                </div>
              </Link>
              <nav className="flex items-center gap-8">
                <Link href="/#works">Our Work</Link>
                <Link href="/#testimonials">Testimonials</Link>
                <Link href="/#pricing">Pricing</Link>
                <Link
                  href="/reservation"
                  className="bg-gradient-to-tr from-neutral-900/80 to-orange-900/60 border border-neutral-900/20 rounded-lg text-white shadow-md py-2 px-4 font-bold tracking-wide"
                >
                  Reserve Your Seat
                </Link>
              </nav>
            </header>
            <div className="flex-1 flex flex-col gap-16 justify-end p-4 px-8">
              <div className="flex flex-col gap-2">
                <div className="">
                  <span className="px-2 py-1 bg-neutral-900 text-white rounded-md">
                    Design and development partner for your startup 🤝
                  </span>
                </div>
                <div className="text-4xl font-bold md:max-w-xl">
                  Cut your design and development costs by 50%
                </div>
                <div></div>
                <div></div>
                <div className="md:max-w-2xl">
                  We design and develop your UI components for your requirements
                  and you focus on what makes your app unique
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-8">
                  <a className="relative flex flex-col items-center p-1 bg-white/30 shadow-[0_0_12px_rgba(120,0,0,0.6)] rounded-xl overflow-hidden">
                    <div className="absolute left-[-70%] top-[-100%] w-[240%] h-[400%] rounded-xl z-[-1] animate-[spin_2s_linear_infinite] bg-red-100 bg-gradient-to-bl from-indigo-950/80 to-orange-700"></div>
                    <div className="flex items-center gap-8 rounded-lg text-white p-6 border-stone-600/10 tracking-wide bg-gradient-to-tr from-neutral-900/80 to-orange-900/60">
                      <div>
                        <div className="flex items-center gap-1">
                          <TbCalendar />
                          <span className="text-semibold text-xl">
                            Book a call
                          </span>
                        </div>
                        <span className="bg-white/20 rounded-sm text-xs px-2">
                          2 seats left
                        </span>
                      </div>
                      <div className="w-[1px] bg-white/30 h-[44px]"></div>
                      <div className="flex flex-col text-xs gap-2">
                        <div className="">🙅‍♀️ Cancel anytime</div>
                        <div className="">👩‍💻 Next day turnover</div>
                        <div className="">🫡 Unlimited request</div>
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4">
                    <TbArrowDown />
                    <span>See our work</span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
