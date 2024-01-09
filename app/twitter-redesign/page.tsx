import { faker } from "@faker-js/faker/locale/en_US";
import millify from "millify";
import { TbDots, TbMessage, TbMessage2, TbRepeat } from "react-icons/tb";
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

const TweetActionButton = ({ children }: ComponentProps<"button">) => {
  return (
    <button className="size-10 rounded-full border border-stone-900/30 opacity-75 hover:opacity-100 transition text-stone-400">
      <div className="flex items-center justify-center border border-white/5 rounded-full h-full shadow-[inset_0_0_4px_rgba(200,200,200,0.1)] bg-white/5">
        {children}
      </div>
    </button>
  );
};

const TweetButton = ({
  children,
  badgeCount = 100,
}: ComponentProps<"button"> & { badgeCount: number }) => {
  return (
    <button className="text-stone-400 flex items-center gap-1 opacity-75">
      <span>{children} </span>
      <span className="text-xs">{millify(badgeCount)}</span>
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
      image: index === 5 ? faker.image.urlPicsumPhotos() : null,
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
    <div className="relative w-screen h-screen bg-gradient-to-tr from-neutral-950 to-neutral-950 text-neutral-300">
      <div
        style={{ "--dot-color": "rgba(255,255,255,0.4)" }}
        className="absolute z-[0] w-full h-full polka"
      ></div>
      <div className="container max-w-lg mx-auto bg-white/5 backdrop-blur-[1px] min-h-screen border-x border-white/5 shadow-[inset_0_0_16px_rgba(255,255,255,0.05)]">
        <Scroll>
          {tweets.map((tweet) => {
            return (
              <div key={tweet.id}>
                <div key={tweet.id} className="flex gap-4 p-4 w-full">
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
                          <span className="font-bold">{tweet.user.name}</span>
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
                              className="rounded-lg shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-8 items-center">
                        <TweetButton badgeCount={tweet.analytics.replies}>
                          <FiMessageSquare />
                        </TweetButton>
                        <TweetButton badgeCount={tweet.analytics.retweets}>
                          <FiRepeat />
                        </TweetButton>
                        <TweetButton badgeCount={tweet.analytics.likes}>
                          <FiHeart />
                        </TweetButton>
                        <TweetButton badgeCount={tweet.analytics.views}>
                          <FiBarChart2 />
                        </TweetButton>
                      </div>
                      <div>
                        <div className="flex gap-4 items-center">
                          <TweetActionButton>
                            <FiBookmark />
                          </TweetActionButton>
                          <TweetActionButton>
                            <FiShare />
                          </TweetActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-t-stone-950/10 border-b border-b-white/5"></div>
              </div>
            );
          })}
        </Scroll>
      </div>
    </div>
  );
};

export default TwitterRedesign;
