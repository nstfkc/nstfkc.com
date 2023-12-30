import { TbBuilding } from "react-icons/tb";
import { PageHeader } from "./PageHeader";
import { CompaniesTable } from "./CompaniesTable";

export const Companies = () => {
  return (
    <div className="w-full">
      <PageHeader>
        <TbBuilding /> <span className="font-semibold">Companies</span>
      </PageHeader>
      <CompaniesTable />
    </div>
  );
};
