"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import Barchart from "@/components/chart/barchart/barchart"; // Adjust the import path according to your project structure
import { SalesTransactionsType } from "@/transcation/types";
import { SalesTransactions } from "@/actions/salestransaction";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Transactions",
    color: "#A9A1F4",
  },
};

export interface SalesChartDataTypeYearly {
  duration: string;
  property_count: number;
}

export interface SalesChartDataTypeQuaterly {
  duration: string;
  property_count: number;
}

export interface SalesChartDataTypeMonthly {
  duration: string;
  property_count: number;
}

export function SalesMarketTrend({ data }: { data: SalesTransactionsType }) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const salestransaction = new SalesTransactions();
  const [chartData, setChartData] = useState<
    | SalesChartDataTypeYearly[]
    | SalesChartDataTypeQuaterly[]
    | SalesChartDataTypeMonthly[]
  >(salestransaction.getYearlySalesData({ data }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = salestransaction.getYearlySalesData({ data });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = salestransaction.getQuarterlySalesData({ data });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = salestransaction.getMonthlySalesData({ data });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    if (data) {
      const salestransaction = new SalesTransactions();
      const datat = salestransaction.getYearlySalesData({ data });
      setChartData(datat);
    }
  }, [data]);

  if (!data) {
    return <Skeleton />;
  }

  const title = (
    <div className="flex justify-between items-center">
      {"Sales Market Value Trend"}
      <select
        value={selectedOption}
        onChange={handleOption}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {Option.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const description = "Aliquam porta nisl dolor, molestie pellentesque";
  const footer = (
    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </div>
  );
  const footerDescription = "Showing total visitors for the last 6 months";

  return (
    <Barchart
      // title={title}
      // description={description}
      chartConfig={chartConfig}
      // footer={footer}
      // footerDescription={footerDescription}
      data={chartData}
      xAxisDataKey="duration"
      yAxisDataKeys={["property_count"]}
      barColors={["#A9A1F4"]}
      barRadius={8}
      tickLine={true}
      gridStroke="#ccc"
      tickFontSize="12px"
      tickFormatter={(value) => value.slice(0, 4)}
    />
  );
}
