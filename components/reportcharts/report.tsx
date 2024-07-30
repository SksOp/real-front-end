import { Card } from "../ui/card";
import { ReportCard } from "../ui/reportCard";

export const Report = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-2">
      <ReportCard
        title="Average Rental Value"
        value={() => "10,000"}
        color="green"
        description="Last 24 hours"
      />
      <ReportCard
        title="Total Rental Value"
        value={() => "10,000"}
        color="green"
        description="Last 24 hours"
      />

      <ReportCard
        title="YoY Growth"
        value={() => "10,000"}
        color="green"
        description="Last 24 hours"
      />
      <ReportCard
        title="Total Rental Transactions"
        value={() => "10,000"}
        color="green"
        description="Last 24 hours"
      />
    </div>
  );
};
