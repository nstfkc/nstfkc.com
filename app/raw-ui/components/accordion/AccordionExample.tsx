"use client";

import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "./Accordion";

export const AccordionExample = () => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <h2 className="font-bold text-lg">F.A.Q</h2>
      <Accordion
        className="flex flex-col gap-2 max-w-md"
        type="single"
        value={"item1"}
      >
        <AccordionItem
          value="item1"
          className="bg-white/50 hover:bg-white p-4 rounded-xl"
        >
          <AccordionItemTrigger>
            <button className="group font-medium w-full flex justify-between">
              <span>1. What are the services you provide?</span>
              <span className="group-data-[state=open]:hidden">+</span>
              <span className="group-data-[state=closed]:hidden">-</span>
            </button>
          </AccordionItemTrigger>
          <AccordionItemContent>
            We are specialised in web development and design. We provide you our
            expertise to bring your ideas to life.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem
          value="item2"
          className="bg-white/50 hover:bg-white p-4 rounded-xl"
        >
          <AccordionItemTrigger>
            <button className="group font-medium w-full flex justify-between">
              <span>2. What makes us different?</span>
              <span className="group-data-[state=open]:hidden">+</span>
              <span className="group-data-[state=closed]:hidden">-</span>
            </button>
          </AccordionItemTrigger>
          <AccordionItemContent>
            We focus on providing the maximum value in minimum time to your
            organisation. We understand your needs and provide pragmatic
            solutions.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem
          value="item3"
          className="bg-white/50 hover:bg-white p-4 rounded-xl"
        >
          {" "}
          <AccordionItemTrigger>
            <button className="group font-medium w-full flex justify-between">
              <span>3. How can we get started?</span>
              <span className="group-data-[state=open]:hidden">+</span>
              <span className="group-data-[state=closed]:hidden">-</span>
            </button>
          </AccordionItemTrigger>
          <AccordionItemContent>
            Go to our subscription page and pick the one fits to your needs.
            Then we will set up a discovery call to pin point your problems and
            start working on them immediately.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
