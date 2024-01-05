// eslint-disable-file @next/next/no-img-element, jsx-a11y/alt-text
"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ComponentProps } from "react";
import {
  TbArrowsDownUp,
  TbBolt,
  TbBuilding,
  TbCalendar,
  TbChevronDown,
  TbCircleFilled,
  TbFilter,
  TbMinusVertical,
  TbPlus,
  TbSettings,
  TbSquareRoundedFilled,
  TbStack,
  TbTable,
} from "react-icons/tb";

export type CompanyData = {
  name: string;
  website: string;
  stage: "Won" | "Expansion Chance" | "Demo seen" | "In trial" | "Follow up";
  nextMeeting:
    | "Tomorrow"
    | "Next month"
    | "In 30 minutes"
    | "In 3 hours"
    | "In 3 days"
    | "In 5 days"
    | "In 6 hours"
    | "In 6 days"
    | "No contact";
  connectionStrength:
    | "No communication"
    | "Weak"
    | "Very weak"
    | "Good"
    | "Strong"
    | "Very Strong";
  contact?: string;
};

const stageToColorMap: Record<CompanyData["stage"], string> = {
  Won: "text-green-300",
  "Demo seen": "text-blue-300",
  "In trial": "text-orange-300",
  "Follow up": "text-orange-400",
  "Expansion Chance": "text-blue-400",
};

const connectionStrengthToIconMap: Record<
  CompanyData["connectionStrength"],
  JSX.Element
> = {
  "Very Strong": <TbBolt className="text-green-400 fill-green-400 text-xs" />,
  Good: <TbSquareRoundedFilled className="text-[10px] text-blue-400" />,
  Strong: <TbSquareRoundedFilled className="text-[10px] text-green-400" />,
  Weak: <TbSquareRoundedFilled className="text-[10px] text-orange-400" />,
  "Very weak": <TbSquareRoundedFilled className="text-[10px] text-red-400" />,
  "No communication": (
    <TbSquareRoundedFilled className="text-[10px] text-stone-300" />
  ),
};

const getMeetingLabelColors = (time: CompanyData["nextMeeting"]) => {
  if (time.includes("Tomorrow")) {
    return "bg-blue-100 text-blue-500 border-blue-200/40";
  }
  if (time.includes("days")) {
    return "bg-yellow-100 text-stone-500 border-yellow-300/60";
  }
  if (time.includes("minutes") || time.includes("hours")) {
    return "bg-green-200 text-green-800 border-green-400/80";
  }
  if (time.includes("month")) {
    return "bg-stone-200 text-stone-500 border-stone-300/20";
  }
  if (time.includes("No")) {
    return "bg-red-100 text-red-500 border-red-300/20";
  }
};

const companies: CompanyData[] = [
  {
    name: "Stripe",
    website: "stripe.com",
    stage: "Won",
    connectionStrength: "Very Strong",
    contact: "Albert Lund",
    nextMeeting: "Tomorrow",
  },
  {
    name: "Canva",
    website: "canva.com",
    stage: "Expansion Chance",
    connectionStrength: "Very Strong",
    contact: "Xian Ho",
    nextMeeting: "Next month",
  },
  {
    name: "Digital Ocean",
    website: "digitalocean.com",
    stage: "Won",
    nextMeeting: "In 30 minutes",
    connectionStrength: "Good",
    contact: "Victor Cardoso",
  },
  {
    name: "Gong",
    website: "gong.io",
    stage: "Demo seen",
    nextMeeting: "In 30 minutes",
    connectionStrength: "No communication",
  },
  {
    name: "Linear",
    website: "linear.app",
    stage: "In trial",
    nextMeeting: "In 3 days",
    connectionStrength: "Weak",
    contact: "Ana Fernandes",
  },
  {
    name: "Dropbox",
    website: "dropbox.com",
    stage: "Expansion Chance",
    nextMeeting: "Tomorrow",
    connectionStrength: "Very Strong",
    contact: "Adam Ghent",
  },
  {
    name: "OpenAI",
    website: "openai.com",
    stage: "Won",
    nextMeeting: "In 5 days",
    connectionStrength: "Strong",
    contact: "Jan Weissmuller",
  },
  {
    name: "Miro",
    website: "miro.com",
    stage: "Demo seen",
    nextMeeting: "Next month",
    connectionStrength: "Good",
    contact: "Lisa Monterray",
  },
  {
    name: "Retool",
    website: "retool.io",
    stage: "Won",
    nextMeeting: "In 3 hours",
    connectionStrength: "Strong",
    contact: "Kelli E. Brooks",
  },
  {
    name: "Webflow",
    website: "webflow.com",
    stage: "In trial",
    nextMeeting: "No contact",
    connectionStrength: "Good",
    contact: "Lilian O'Brien",
  },
  {
    name: "Square",
    website: "squareup.com",
    stage: "Demo seen",
    nextMeeting: "In 6 hours",
    connectionStrength: "Very weak",
    contact: "Tony Fergus",
  },
  {
    name: "Chime",
    website: "chime.com",
    stage: "Follow up",
    nextMeeting: "In 6 days",
    connectionStrength: "Strong",
    contact: "Bradley Jones",
  },
];

const Button = (props: ComponentProps<"button">) => {
  return (
    <button className="text-xs flex items-center gap-1 border border-stone-200/70 rounded-lg shadow-sm px-2 h-[30px] font-medium">
      {props.children}
    </button>
  );
};

const TableFilters = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center justify-center gap-2">
        <Button>
          <TbTable className="opacity-60" />
          <span>Table View</span>
          <TbChevronDown />
        </Button>
        <Button>
          <TbFilter className="opacity-60" />
          <span>Filter</span>
          <span className="bg-blue-200/50 h-4 rounded-md px-1 text-[10px]">
            2
          </span>
        </Button>
        <Button>
          <TbArrowsDownUp className="opacity-60" />
          <span>Sort</span>
        </Button>
      </div>
      <div className="flex items-center gap-2 hidden md:flex">
        <Button>
          <TbSettings className="opacity-60" />
          <span>View Settings</span>
        </Button>
        <Button>
          <TbPlus className="opacity-60" />
          <span>Import export</span>
          <TbMinusVertical className="opacity-30" />
          <TbChevronDown className="opacity-60" />
        </Button>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead className="sticky top-0 z-[10] bg-white">
      <tr className="w-full border-y">
        <td className="border-r">
          <div className="flex items-center gap-1 font-normal text-sm p-2">
            <TbBuilding className="opacity-60" />
            <span className="opacity-70">Company</span>
          </div>
        </td>
        <td className="border-r">
          <div className="flex items-center gap-1 font-normal text-sm p-2">
            <TbStack className="opacity-60" />
            <span className="opacity-70">Stage</span>
          </div>
        </td>
        <td className="border-r">
          <div className="flex items-center gap-1 font-normal text-sm p-2">
            <TbCalendar className="opacity-60" />
            <span className="opacity-70">Next Meeting</span>
          </div>
        </td>
        <td className="">
          <div className="flex items-center gap-1 font-normal text-sm p-2">
            <TbBolt className="opacity-60" />
            <span className="opacity-70">Connection Strength</span>
          </div>
        </td>
      </tr>
    </thead>
  );
};

const TableBody = () => {
  return (
    <tbody className="">
      {[...companies, ...companies].map((companyData, index) => {
        return (
          <tr className="border-b" key={companyData.website + index}>
            <td className="border-r">
              <div className="flex items-center gap-2 p-2">
                <input
                  type="checkbox"
                  className="rounded-md border-none opacity-60"
                />
                <div className="flex items-center gap-1">
                  <img
                    alt="any"
                    className="size-4 rounded-md"
                    src={`https://logo.clearbit.com/${companyData.website}?format=png`}
                  />
                  {companyData.name}
                </div>
              </div>
            </td>
            <td className="border-r">
              <div className="flex items-center gap-1 p-2">
                <TbCircleFilled
                  className={[
                    "text-[8px]",
                    stageToColorMap[companyData.stage],
                  ].join(" ")}
                />
                <span>{companyData.stage}</span>
              </div>
            </td>
            <td className="border-r">
              <div className="p-2">
                <span
                  className={[
                    "px-[6px] py-[2px] rounded-md text-xs border",
                    getMeetingLabelColors(companyData.nextMeeting),
                  ].join(" ")}
                >
                  {companyData.nextMeeting}
                </span>
              </div>
            </td>
            <td className="">
              <div className="flex items-center gap-1 p-2">
                {connectionStrengthToIconMap[companyData.connectionStrength]}
                <span className="text-xs font-medium opacity-80">
                  {companyData.connectionStrength}{" "}
                  {companyData.contact ? "with " : ""}
                  {companyData.contact}
                </span>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const TableFooter = () => {
  return (
    <tfoot className="sticky bottom-0 bg-white">
      <tr>
        <td className="border-r">
          <div className="text-right p-2">
            1.064 <span className="opacity-60">count</span>
          </div>
        </td>
        <td className="border-r">
          <div className="text-right p-2 opacity-60">+ Add Calculation</div>
        </td>
        <td className="border-r">
          <div className="text-right p-2 opacity-60">+ Add Calculation</div>
        </td>
        <td className="">
          <div className="text-right p-2 opacity-60">+ Add Calculation</div>
        </td>
      </tr>
    </tfoot>
  );
};

const Table = () => {
  return (
    <table className="table-fixed min-w-[825px] w-full border-collapse text-xs">
      <TableHead />
      <TableBody />
      <TableFooter />
    </table>
  );
};

export const CompaniesTable = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="">
        <TableFilters />
      </div>
      <div className="flex-1 relative">
        <div className="absolute w-full h-full overflow-scroll px-4">
          <Table />
        </div>
      </div>
    </div>
  );
};
