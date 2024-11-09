import { LightBulbIcon } from "@/public/svg/icons";
import React from "react";
import ChartWrapper from "./chart/chartWrapper";
import TransactionTable from "./transactionTable";

function InsightDrawerView() {
  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex items-center justify-start gap-2 ">
        <LightBulbIcon className="w-8 h-8" />
        <h3 className="text-secondary text-lg font-semibold">
          Insights of Urban Nexus Plaza
        </h3>
      </div>
      <ChartWrapper
        title="Chart"
        description="chart-description"
      ></ChartWrapper>
    </div>
  );
}

export default InsightDrawerView;
