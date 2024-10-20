"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { SalesTransactionsType } from "@/transcation/types";
import { SalesTransactions } from "@/actions/salestransaction";
import {
  SalesChartDataTypeMonthly,
  SalesChartDataTypeQuaterly,
  SalesChartDataTypeYearly,
} from "../sales-market-trend/sales-market-trend";
import { Skeleton } from "@/components/ui/skeleton";
import AreaChartComponent from "@/components/chart/areachart/area"; // Adjust the import path according to your project structure

const chartConfig = {
  desktop: {
    label: "Sales",
    color: "#A9A1F4",
  },
};

export function GrowthChart({ data }: { data: SalesTransactionsType }) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const [chartData, setChartData] = useState<
    | SalesChartDataTypeYearly[]
    | SalesChartDataTypeQuaterly[]
    | SalesChartDataTypeMonthly[]
  >([]);

  useEffect(() => {
    if (data) {
      const salestransaction = new SalesTransactions();
      setChartData(salestransaction.getYearlySalesData({ data }));
    }
  }, [data]);

  if (!data) {
    return <Skeleton />;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const salestransaction = new SalesTransactions();

    if (selectedValue === "Yearly") {
      setChartData(salestransaction.getYearlySalesData({ data }));
    } else if (selectedValue === "Qaterly") {
      setChartData(salestransaction.getQuarterlySalesData({ data }));
    } else if (selectedValue === "Monthly") {
      setChartData(salestransaction.getMonthlySalesData({ data }));
    }
    setSelectedOption(selectedValue);
  };

  const title = (
    <div className="flex justify-between items-center">
      Sales Transactions
      <select
        value={selectedOption}
        onChange={handleOption}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {["Yearly", "Qaterly", "Monthly"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const description = "Aliquam porta nisl dolor, molestie pellentesque";
  const footer = (
    <>
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </>
  );
  const footerDescription = "Showing total visitors for the last 6 months";

  return (
    <AreaChartComponent
      // title={title}
      // description={description}
      chartConfig={chartConfig}
      // footer={footer}
      // footerDescription={footerDescription}
      data={chartData}
      xAxisDataKey="duration"
      areas={[{ yAxisDataKey: "property_count" }]}
      gridStroke="#FFFFFF"
      tickColor="black"
      tickFontSize="8px"
      tickFormatter={(value) => value.slice(0, 4)}
      tickLine={true}
      axisLine={false}
    />
  );
}
