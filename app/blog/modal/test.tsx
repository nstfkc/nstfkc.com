import { Toaster } from "sonner";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFile } from "fs/promises";

import { AdvancedDialog } from "./components/AdvancedDialog";
import { AsyncDialog } from "./components/AsyncDialog";
import { SimpleDialog } from "./components/SimpleDialog";
import Link from "next/link";

export default async function PageX() {
  const buffer = await readFile("./mdx/blog/modal.mdx");
  const source = buffer.toString();
  return (
    <div className="prose mx-auto">
      <MDXRemote source={source} />;
    </div>
  );
}

export function Page(props: any) {
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="container max-w-3xl mx-auto py-8">
        <div className="">
          <h1 className="text-xl font-bold">Modals done right</h1>
          <div className="h-6"></div>
          <div>
            <p>
              A Modal is a tool to acquire user focus and direct it a narrower
              space to make desired action easier to perform for the user.
            </p>
          </div>

          <div className="h-4"></div>
          <div>
            <h2 className="font-bold text-lg">Problem</h2>
            <p>
              When modals suddenly appear and disappear, it makes it harder for
              user to reason about what is really going on. User needs visual
              feedback from the UI to acknowledge if they performed the action
              successfully or not. Usually, opening a modal is not a problem
              because animating a mounting element is easy to do with CSS
              animations. It will trigger as soon as the element is being added
              to the DOM.
            </p>
            <div className="h-2"></div>
            <p>
              On the other hand, the exit animations are often neglected because
              it is harder to implement. The elements need to be removed from
              the DOM after the animations are finished. And it is not possible
              to know when is a CSS animation is finished in javascript.
            </p>
          </div>

          <div className="h-4"></div>
          <div>
            <h2 className="font-bold text-lg">Solution</h2>
            <div>
              <p>
                The solution is to use a javascript based animation library like
                framer motion. Framer motion provides an api to subscribe to an
                animation value so you can discard your elements.
              </p>
            </div>
          </div>
        </div>

        <div className="h-8"></div>
        <div>
          <h2 className="font-bold text-lg">Recipes</h2>
          <div className="h-2"></div>
          <div>
            <h3 className="font-semibold">
              1. Simple Dialog - Welcome message
            </h3>
            <div>
              <p>
                Dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae
                congue eu, consequat. Nulla facilisi nullam vehicula ipsum a
                arcu cursus vitae congue mauris rhoncus aenean vel elit
                scelerisque mauris!
              </p>
            </div>
            <SimpleDialog />
          </div>
          <div>
            <h3 className="font-semibold">Async Dialog - Login form</h3>
            <AsyncDialog />
          </div>
          <div>
            <h3 className="font-semibold">Advanced Dialog</h3>
            <AdvancedDialog />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
