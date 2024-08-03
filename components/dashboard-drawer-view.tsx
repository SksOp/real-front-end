import { CalculatorIcon, DashboardIcon } from "@/public/svg/drawerIcons";
import React from "react";

function DashboardDrawerView() {
  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full">
      <div>
        <ul>
          <li>Sales Market Overview</li>
          <li>Mortgage Insights</li>
          <li>Property Demand Analysis</li>
          <li>Rental Market Overview</li>
          <li>Demographic Insights</li>
        </ul>
      </div>
      <div>
        <div className="flex justify-start items-center gap-2">
          <CalculatorIcon />
          <h3 className="text-base font-normal">Calculators</h3>
        </div>
        <ul>
          <li>Rental value estimator</li>
          <li>Sales value estimator</li>
          <li>Investment ROI calculator</li>
          <li>Property comparison</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardDrawerView;
