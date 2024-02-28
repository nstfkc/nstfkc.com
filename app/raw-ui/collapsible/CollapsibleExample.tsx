"use client";
import { LuChevronUp } from "react-icons/lu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

export const CollapsibleExample = () => {
  return (
    <div className="max-w-[200px]">
      <Collapsible isInitiallyOpen={true}>
        <CollapsibleTrigger>
          <button className="group flex items-center">
            <span>Toggle</span>
            <LuChevronUp className="transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-[180deg]" />
          </button>
        </CollapsibleTrigger>
        <p>Preview</p>
        <CollapsibleContent>
          <div className="bg-black/30">
            <p>
              Nunc, non blandit massa enim nec dui nunc mattis enim ut tellus
              elementum sagittis vitae et leo duis ut diam quam? Facilisi cras
              fermentum, odio eu feugiat pretium, nibh ipsum.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="h-4"></div>
      <Collapsible isInitiallyOpen={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <p>Preview</p>
        <CollapsibleContent>
          <div className="bg-black/30">
            <p>
              Nunc, non blandit massa enim nec dui nunc mattis enim ut tellus
              elementum sagittis vitae et leo duis ut diam quam? Facilisi cras
              fermentum, odio eu feugiat pretium, nibh ipsum.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
