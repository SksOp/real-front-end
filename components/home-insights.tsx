import React from "react";
import DataCards from "./data-cards";
import { CalculatorIcon, DashboardIcon } from "@/public/svg/drawerIcons";
import { useRouter } from "next/navigation";

function HomeInsights() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center items-stretch gap-2 ">
      <DataCards
        bgColor="bg-[#EEFBFC]"
        onClick={() => router.push("/app/dashboard")}
      >
        <DashboardIcon />
        <h3 className="text-secondary font-semibold text-base ">Dashboards</h3>
        <p className="text-sm text-muted-foreground font-normal">
          <span className="font-semibold">15+</span> dashboards for sales,
          rentals, commercial etc.
        </p>
      </DataCards>
      <DataCards
        bgColor="bg-[#EEFCEF]"
        onClick={() => router.push("/app/calculator")}
      >
        <CalculatorIcon />
        <h3 className="text-secondary font-semibold text-base ">Calculators</h3>
        <p className="text-sm font-normal text-muted-foreground">
          <span className="font-semibold">10+</span> calculators to Estimate
          sales, rentals, ROI etc.
        </p>
      </DataCards>
    </div>
  );
}

export default HomeInsights;
