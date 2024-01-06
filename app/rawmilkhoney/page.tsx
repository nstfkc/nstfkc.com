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
                  className="bg-gradient-to-tr from-orange-700/50 to-orange-900/60 rounded-lg text-white shadow-md py-2 px-4 font-bold tracking-wide"
                >
                  Reserve Your Seat
                </Link>
              </nav>
            </header>
            <div className="flex-1 flex flex-col gap-16 justify-end p-4 px-8">
              <div className="flex flex-col gap-2">
                <div className="px-1 opacity-75">
                  Design and development partner for your startup 🤝
                </div>
                <div className="text-4xl font-bold md:max-w-xl">
                  Cut your design and development costs by 50%
                </div>
                <div></div>
                <div></div>
                <div className="md:max-w-2xl">
                  We design and develop your UI components for your requirements
                  and you enjoy growing your startup
                </div>
              </div>
              <div className="flex gap-12 py-4">
                <div>
                  <div className="font-bold text-lg">🙅‍♀️ Cancel anytime</div>
                  <div className="font-light">No questions asked</div>
                </div>
                <div>
                  <div className="font-bold text-lg">👩‍💻 Next day turnover</div>
                  <div className="font-light">
                    We immediately start working for you
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">🫡 Unlimited request</div>
                  <div className="font-light">High quality, low cost</div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-8">
                  <a className="flex flex-col gap-4 items-center">
                    <div className="flex items-center gap-2 bg-gradient-to-tr from-orange-700/50 to-orange-900/60 rounded-lg text-white p-4 shadow-md border-stone-600/10 font-semibold tracking-wide">
                      <TbCalendar />
                      <span>Book a call</span>
                      <TbMinusVertical />
                      <div className="">
                        <span className="">2</span> <span>seats left</span>
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
