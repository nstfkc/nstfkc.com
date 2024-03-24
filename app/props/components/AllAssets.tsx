import { Card } from "./Card";
import wellingtonGarden from "./assets/wellington-garden.jpeg";
import moriPines from "./assets/mori-pines.jpeg";
import grossHouse from "./assets/gross-house.jpeg";
import triavaResidences from "./assets/trivia-residences.jpeg";
import Image from "next/image";

const assets = [
  {
    id: 1,
    title: "Wellington Garden",
    valueChange: 2.5,
    valueIncreased: true,
    roi: "$ 48,249",
    shareOwners: "$ 3,489",
    image: wellingtonGarden,
  },
  {
    id: 2,
    title: "Mori Pines",
    valueChange: 2.5,
    valueIncreased: true,
    roi: "$ 42,851",
    shareOwners: "$ 3,150",
    image: moriPines,
  },
  {
    id: 3,
    title: "Gross House",
    valueChange: 0.8,
    valueIncreased: false,
    roi: "$ 24,126",
    shareOwners: "$ 1,489",
    image: grossHouse,
  },
  {
    id: 4,
    title: "Triava Residences",
    valueChange: 0.5,
    valueIncreased: false,
    roi: "$ 8,249",
    shareOwners: "$ 889",
    image: triavaResidences,
  },
];

export const AllAssets = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>All Assets</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {assets.map((asset) => (
          <div key={asset.id} className="col-span-1">
            <Card>
              <div className="flex gap-4">
                <div className="size-16">
                  <Image
                    className="object-cover w-full h-full rounded-lg"
                    alt={asset.title}
                    src={asset.image}
                  ></Image>
                </div>
                <div className="flex flex-col gap-1">
                  <div>{asset.title}</div>
                  <div>
                    <span
                      className={[
                        "inline-flex gap-1 text-sm",
                        "px-2 py-[1px] rounded-md",
                        asset.valueIncreased
                          ? "bg-green-800/30 text-green-500"
                          : "bg-stone-700/50 text-stone-500",
                      ].join(" ")}
                    >
                      <span>{asset.valueIncreased ? "+" : "-"}</span>
                      <span>{asset.valueChange}%</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="h-[1px] bg-gray-700/50"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-2">
                  <span className="opacity-40 text-xs">ROI</span>
                  <span>
                    <span className="text-sm">{asset.roi}</span>
                    <span className="opacity-50"> / share</span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="opacity-40 text-xs">SHARE OWNERS</span>
                  <span>
                    <span className="text-sm">{asset.shareOwners}</span>
                    <span className="opacity-50"> / share</span>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
