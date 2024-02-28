"use client";

import { Accordion, AccordionItem } from "./Accordion";

export const AccordionExample = () => {
  return (
    <div>
      <Accordion type="multiple" value={["item1"]}>
        <AccordionItem
          value="item1"
          slots={{
            header: <button>Item 1</button>,
            content: (
              <div>
                Content 1
                <p>
                  Ac ut consequat semper viverra nam libero justo, laoreet sit
                  amet cursus sit amet, dictum sit amet justo donec enim diam,
                  vulputate ut pharetra! Tempor commodo, ullamcorper a lacus
                  vestibulum?
                </p>
              </div>
            ),
          }}
        />
        <AccordionItem
          value="item2"
          slots={{
            header: <button>Item 2</button>,
            content: (
              <div>
                Content 2
                <p>
                  Nunc sed velit dignissim sodales ut eu sem integer vitae justo
                  eget magna fermentum iaculis eu non diam. Proin fermentum leo
                  vel orci porta non pulvinar neque laoreet suspendisse
                  interdum!
                </p>
              </div>
            ),
          }}
        />
      </Accordion>
    </div>
  );
};
