"use client";

import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "./Accordion";

export const AccordionExample = () => {
  return (
    <div>
      <Accordion type="multiple" value={["item1"]}>
        <AccordionItem value="item1">
          <AccordionItemTrigger>
            <button>Item 1</button>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <div>
              Content 1
              <p>
                Ac ut consequat semper viverra nam libero justo, laoreet sit
                amet cursus sit amet, dictum sit amet justo donec enim diam,
                vulputate ut pharetra! Tempor commodo, ullamcorper a lacus
                vestibulum?
              </p>
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item2">
          <AccordionItemTrigger>
            <button>Item 1</button>
          </AccordionItemTrigger>
          <p>Preview</p>
          <AccordionItemContent>
            <div>
              Content 1
              <p>
                Ac ut consequat semper viverra nam libero justo, laoreet sit
                amet cursus sit amet, dictum sit amet justo donec enim diam,
                vulputate ut pharetra! Tempor commodo, ullamcorper a lacus
                vestibulum?
              </p>
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
