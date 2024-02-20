import { DialogSection } from "./components/DialogSection";

export default function Page(props: any) {
  return (
    <div className="bg-slate-200 min-h-screen">
      <DialogSection initialSpringOptions={props.searchParams as any} />
    </div>
  );
}
