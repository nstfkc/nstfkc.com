import { Card } from "./Card";

export const RentCard = () => {
  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">RENT BALANCE</div>
            <div>$ 2,215,950</div>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">TOTAL RENT EARNED</div>
            <div>$ 895,000</div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">PROPERTIES OWNED</div>
            <div>14</div>
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <div className="opacity-40 text-xs">EST. PROPERTY VALUE</div>
            <div>$ 5,125,850</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
