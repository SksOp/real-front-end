"use client";

import React, { useState } from "react";
import AreaChartComponent from "../chart/areachart/area"; // Adjust the import path as needed
import { LocationSalesTransaction } from "@/transcation/types";
import { Transactions } from "@/actions/sales";
import { TrendingUp } from "lucide-react";
import { ChartConfig } from "../ui/chart";

const chartConfig = {
  Transaction: {
    label: "Transaction",
    color: "#A9A1F4",
  },
} satisfies ChartConfig;

export interface TransactionsChartDataTypeYearly {
  location: string;
  transactions: number;
}

export interface TransactionsChartDataTypeQuaterly {
  location: string;
  transactions: number;
}
export interface TransactionsChartDataTypeMonthly {
  location: string;
  transactions: number;
}

export function LocationTransaction({
  data,
}: {
  data: LocationSalesTransaction;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const Transaction = new Transactions();
  const [chartData, setChartData] = useState<
    | TransactionsChartDataTypeYearly[]
    | TransactionsChartDataTypeQuaterly[]
    | TransactionsChartDataTypeMonthly[]
  >(Transaction.getYearlyTransactions({ data }));

  const Option = ["Yearly", "Qaterly", "Monthly"];
  if (!data) {
    return <>No data available</>;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = Transaction.getYearlyTransactions({ data });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = Transaction.getQuarterlyTransactions({ data });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = Transaction.getMonthlyTransactions({ data });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  const title = (
    <div className="flex justify-between items-center">
      Transactions
      <select
        value={selectedOption}
        onChange={handleOption}
        className="ml-2 p-0.5 rounded text-sm"
      >
        {Option.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );

  const description: React.ReactNode =
    "Showing total Transaction at a location";
  const footer: React.ReactNode = (
    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </div>
  );
  const footerDescription: string = "January - June 2024";

  return (
    <AreaChartComponent
      title={title}
      description={description}
      chartConfig={chartConfig}
      footer={footer}
      footerDescription={footerDescription}
      data={chartData}
      gridStroke="#ccc"
      xAxisDataKey="location"
      yAxisDataKey="transactions"
      areaColor="#A9A1F4"
      areaOpacity={0.4}
      tickLine={true}
      tickFormatter={(value: any) => value.slice(0, 3)}
    />
  );
}
