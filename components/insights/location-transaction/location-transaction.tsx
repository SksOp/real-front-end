"use client";

import React, { useEffect, useState } from "react";
import AreaChartComponent from "../../chart/areachart/area"; // Adjust the import path as needed
import { LocationSalesTransaction } from "@/transcation/types";
import { Transactions } from "@/actions/sales";
import { TrendingUp } from "lucide-react";
import { ChartConfig } from "../../ui/chart";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getLocationSales } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

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

export function LocationTransaction() {
  const {
    data: locationSales,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getLocationSales());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const Transaction = new Transactions();
  const [chartData, setChartData] = useState<
    | TransactionsChartDataTypeYearly[]
    | TransactionsChartDataTypeQuaterly[]
    | TransactionsChartDataTypeMonthly[]
  >(Transaction.getYearlyTransactions({ data: locationSales! }));

  useEffect(() => {
    if (locationSales) {
      const Transaction = new Transactions();
      const datat = Transaction.getYearlyTransactions({ data: locationSales! });
      setChartData(datat);
    }
  }, [locationSales]);

  if (isLoading || !locationSales) {
    return <Skeleton />;
  }
  const Option = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = Transaction.getYearlyTransactions({ data: locationSales! });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = Transaction.getQuarterlyTransactions({
        data: locationSales!,
      });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = Transaction.getMonthlyTransactions({
        data: locationSales!,
      });
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
      // title={title}
      // description={description}
      chartConfig={chartConfig}
      // footer={footer}
      // footerDescription={footerDescription}
      data={chartData}
      gridStroke="#ccc"
      xAxisDataKey="location"
      areas={[
        { yAxisDataKey: "transactions", areaColor: "#", areaOpacity: 0.4 },
      ]}
      tickFormatter={(value: any) => value.slice(0, 3)}
    />
  );
}
