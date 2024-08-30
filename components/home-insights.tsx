import React from "react";
import DataCards from "./data-cards";
import { CalculatorIcon, DashboardIcon } from "@/public/svg/drawerIcons";
import { useRouter } from "next/navigation";

function HomeInsights() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center items-stretch gap-2 ">
      <DataCards
        description="Residential & Commercial dashboards for all usecases including sales,
        rentals, mortgages etc."
        bgColor="bg-[#EEFBFC]"
        onClick={() => router.push("/dashboard/insights")}
      >
        <DashboardIcon />
        <h3 className="text-secondary font-bold text-base ">
          Dashboards (15+)
        </h3>
      </DataCards>
      <DataCards
        description="Advanced calculators includes sales and rental values estimators, ROI Projections etc."
        bgColor="bg-[#EEFCEF]"
        onClick={() => router.push("/dashboard/insights")}
      >
        <CalculatorIcon />
        <h3 className="text-secondary font-bold text-base ">
          Calculators (10+)
        </h3>
      </DataCards>
    </div>
  );
}

export default HomeInsights;
