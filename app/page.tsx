import { add } from "date-fns/add";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { Companies } from "./components/Companies";
import { CompanyData } from "./components/CompaniesTable";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  const companies: CompanyData[] = [
    {
      name: "Stripe",
      website: "stripe.com",
      stage: "Won",
      connectionStrength: "Very Strong",
      contact: "Albert Lund",
      nextMeeting: formatDistanceToNow(add(Date.now(), { days: 1 })),
    },
  ];
  return (
    <main className="text-gray-700">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Companies companies={companies} />
        </div>
      </div>
    </main>
  );
}
