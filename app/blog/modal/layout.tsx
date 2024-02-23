import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose container max-w-2xl mx-auto px-4 md:px-0">
      {children}
      <footer className="py-16 h-16"></footer>
      <Toaster />
    </div>
  );
}
