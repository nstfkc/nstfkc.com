"use client";
import { LuChevronUp } from "react-icons/lu";

import { Collapsible } from "./Collapsible";

export const CollapsibleExample = () => {
  return (
    <div>
      <Collapsible
        isInitiallyOpen={true}
        slots={{
          trigger: (
            <button className="group flex items-center">
              <span>Toggle</span>
              <LuChevronUp className="transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-[180deg]" />
            </button>
          ),
          preview: <p>Preview</p>,
          content: (
            <p>
              Nunc, non blandit massa enim nec dui nunc mattis enim ut tellus
              elementum sagittis vitae et leo duis ut diam quam? Facilisi cras
              fermentum, odio eu feugiat pretium, nibh ipsum.
            </p>
          ),
        }}
      ></Collapsible>
    </div>
  );
};
