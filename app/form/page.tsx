import { LoginForm } from "./components/LoginForm";

const Page = () => {
  return (
    <div className="h-dvh w-screen flex items-center text-zinc-800">
      <div className="container mx-auto max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
