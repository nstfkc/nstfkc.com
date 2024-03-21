import { RegisterForm } from "./components/RegisterForm";
import { Toaster } from "sonner";

const Page = () => {
  return (
    <>
      <div className="h-dvh w-screen flex items-center text-zinc-800">
        <div className="container mx-auto max-w-sm">
          <RegisterForm />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Page;
