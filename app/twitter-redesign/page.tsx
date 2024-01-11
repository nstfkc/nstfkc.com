import { faker } from "@faker-js/faker/locale/en_US";
import millify from "millify";
import {
  TbDots,
  TbMessage,
  TbMessage2,
  TbRepeat,
  TbSettings,
  TbSettings2,
} from "react-icons/tb";
import {
  FiBarChart,
  FiBarChart2,
  FiBookmark,
  FiHeart,
  FiMessageSquare,
  FiRepeat,
  FiShare,
} from "react-icons/fi";

import Scroll from "./components/Scroll";

import { ComponentProps } from "react";

const Wrapper = ({ children }) => {
  return (
    <div
      className={[
        "rounded-[24px] border border-stone-950/60",
        "bg-gradient-to-b from-neutral-800 to-neutral-900",
      ].join(" ")}
    >
      <div className="rounded-[23px] border border-neutral-900/80">
        <div className="rounded-[22px] border border-neutral-950">
          <div className="rounded-[21px] border border-neutral-900/70">
            <div className="rounded-[20px] border border-neutral-700/50 rounded-[20px] overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TweetActionButton = ({ children }: ComponentProps<"button">) => {
  return (
    <button className="size-10 rounded-full border border-stone-900/30 opacity-75 hover:opacity-100 transition text-stone-400">
      <div className="flex items-center justify-center border border-white/5 rounded-full h-full shadow-[inset_0_0_4px_rgba(200,200,200,0.1)] bg-white/5">
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
      className="group size-10 rounded-full border border-neutral-950 bg-neutral-600/50 p-[1px] active:bg-neutral-800"
    >
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-700/50 group-active:bg-neutral-800 rounded-full text-white/50">
        {children}
      </div>
    </button>
  );
};

const TabButton = ({
  children,
  active = false,
  ...buttonProps
}: ComponentProps<"button"> & { active?: boolean }) => {
  return (
    <button
      {...buttonProps}
      className={[
        "font-semibold",
        active
          ? "text-green-600/70 drop-shadow-[0_0px_4px_rgba(0,255,0,0.5)]"
          : "opacity-60",
      ].join(" ")}
    >
      {children}
    </button>
  );
};

const TweetButton = ({
  children,
  badgeCount,
}: ComponentProps<"button"> & { badgeCount?: number }) => {
  return (
    <button className="text-stone-400 flex items-center gap-1 opacity-75">
      <span>{children} </span>
      {badgeCount && <span className="text-xs">{millify(badgeCount)}</span>}
    </button>
  );
};

const TwitterRedesign = () => {
  const tweets = Array.from(Array(20)).map((_, index) => {
    return {
      id: index,
      user: {
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        avatar: `/avatar/${index + 1}.jpg`,
      },
      image: index === 1 ? faker.image.urlPicsumPhotos() : null,
      content:
        index % 5 === 0 ? faker.lorem.paragraphs(2) : faker.hacker.phrase(),
      analytics: {
        likes: faker.number.int({ max: 1000 }),
        retweets: faker.number.int({ max: 100 }),
        replies: faker.number.int({ max: 200 }),
        views: faker.number.int({ max: 100000 }),
      },
    };
  });

  return (
    <div className="relative w-screen bg-stone-950 text-neutral-300">
      <div className="container max-w-lg mx-auto">
        <div className="flex justify-between gap-2 p-6 text-sm font-medium">
          <TabButton active={true}>For you</TabButton>
          <TabButton>Following</TabButton>
          <TabButton>UI/UX</TabButton>
          <TabButton>Web</TabButton>
          <Wrapper>
            <CircleButton>
              <TbSettings className="" />
            </CircleButton>
          </Wrapper>
        </div>
      </div>
      <div className="container max-w-lg mx-auto min-h-screen px-2 md:px-0">
        <Wrapper>
          <Scroll>
            {tweets.map((tweet) => {
              return (
                <div key={tweet.id}>
                  <div
                    key={tweet.id}
                    className="flex gap-4 p-4 w-full bg-gradient-to-tr from from-neutral-900 to to-neutral-800"
                  >
                    <div className="min-w-[32px]">
                      <img
                        src={tweet.user.avatar}
                        alt=""
                        width={32}
                        className="rounded-full w-[32px]"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div>
                        <div className="flex gap-1 items-center justify-between">
                          <div className="flex gap-1 items-center">
                            <span className="font-bold opacity-75">
                              {tweet.user.name}
                            </span>
                            <span className="opacity-50 text-sm">
                              @{tweet.user.username}
                            </span>
                          </div>
                          <div>
                            <button>
                              <TbDots />
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="line-clamp-3 leading-relaxed">
                            {tweet.content}
                          </p>
                          {tweet.content.length > 140 && (
                            <button className="text-sm font-bold py-2">
                              Show more
                            </button>
                          )}
                          {tweet.image && (
                            <div className="mt-4">
                              <img
                                src={tweet.image}
                                alt=""
                                className="rounded-2xl shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-8 items-center">
                          <TweetButton>
                            <FiMessageSquare />
                          </TweetButton>
                          <TweetButton>
                            <FiRepeat />
                          </TweetButton>
                          <TweetButton>
                            <FiHeart />
                          </TweetButton>
                          <TweetButton badgeCount={tweet.analytics.views}>
                            <FiBarChart2 />
                          </TweetButton>
                        </div>
                        <div>
                          <div className="flex gap-4 items-center">
                            <CircleButton>
                              <FiBookmark />
                            </CircleButton>
                            <CircleButton>
                              <FiShare />
                            </CircleButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-t-stone-950/50 border-b border-b-white/5"></div>
                </div>
              );
            })}
            <div className="">
              <div className="flex justify-center items-center p-4 text-sm font-medium opacity-75 tracking-wide">
                Load more
              </div>
            </div>
          </Scroll>
        </Wrapper>
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default TwitterRedesign;
