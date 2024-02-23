import { useState } from "react";
import { Button } from "./Button";
import { Dialog, DialogApi, DialogClose, DialogTitle } from "./Dialog";

const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <label>
          <span>First Name</span>
          <input type="text" />
        </label>
        <label>
          <span>Last Name</span>
          <input type="text" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
      </div>
    </form>
  );
};

export const DialogWithForm = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (cb: VoidFunction) => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      setLoading(false);
      cb();
    });
  };

  return (
    <Dialog trigger={<Button>Open</Button>}>
      <div className="p-4 max-w-md">
        <div className="relative bg-white rounded-md p-4 w-full flex flex-col gap-4">
          <DialogClose className="absolute right-0 top-0 size-8">
            &#x2715;
          </DialogClose>
          <DialogTitle className="text-lg font-semibold">
            Terms and Conditions
          </DialogTitle>
          <div className="">
            Quis blandit turpis cursus in hac habitasse platea dictumst quisque
            sagittis, purus sit. Facilisis leo, vel fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam quis enim lobortis
            scelerisque fermentum?
          </div>
          <DialogApi>
            {(dialog) => (
              <Button onClick={() => handleFormSubmit(dialog.close)}>
                Close {loading && "Loading..."}
              </Button>
            )}
          </DialogApi>

          <div>
            <DialogClose asChild>
              <Button>Accept</Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
