"use client";

import { LocationSalesTransaction } from "@/transcation/types";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import Barchart from "../../chart/barchart/barchart";
import { Sales } from "@/actions/sales";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getLocationSales } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";
export interface SalesChartDataTypeYearly {
  location: string;
  sales: number;
}

export interface SalesChartDataTypeQuaterly {
  location: string;
  sales: number;
}
export interface SalesChartDataTypeMonthly {
  location: string;
  sales: number;
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#A9A1F4",
  },
};

export function LocationSales() {
  const {
    data: locationSales,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getLocationSales());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const sales = new Sales();
  const [chartData, setChartData] = useState<
    | SalesChartDataTypeYearly[]
    | SalesChartDataTypeQuaterly[]
    | SalesChartDataTypeMonthly[]
  >(sales.getYearlySales({ data: locationSales! }));
  const Option = ["Yearly", "Qaterly", "Monthly"];
  useEffect(() => {
    if (locationSales) {
      const sales = new Sales();
      const datat = sales.getYearlySales({ data: locationSales! });
      setChartData(datat);
    }
  }, [locationSales]);

  if (isLoading || !locationSales) {
    return <Skeleton />;
  }
  const handelOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Yearly") {
      const datat = sales.getYearlySales({ data: locationSales! });
      setChartData(datat);
      setSelectedOption(selectedValue);
    } else if (selectedValue === "Qaterly") {
      const datat = sales.getQuarterlySales({ data: locationSales! });
      setChartData(datat);
      setSelectedOption(selectedValue);
    } else if (selectedValue === "Monthly") {
      const datat = sales.getMonthlySales({ data: locationSales! });
      setChartData(datat);
      setSelectedOption(selectedValue);
    }
  };

  const title = (
    <div className="flex justify-between items-center">
      Sales
      <select
        value={selectedOption}
        onChange={handelOption}
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

  const description: ReactNode = "Showing total Sales at a location";
  const footer: ReactNode = (
    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </div>
  );

  const footerDescription: string = "January - June 2024";
  const tickFormatter = (value: any) => value.slice(0, 3);
  const customTickFormatter = (value: any): string => {
    const result = tickFormatter(value);
    return result !== undefined ? result.toString() : "";
  };

  return (
    <Barchart
      // title={title}
      // description={description}
      chartConfig={chartConfig}
      // footer={footer}
      // footerDescription={footerDescription}
      data={chartData}
      xAxisDataKey="location"
      yAxisDataKeys={["sales"]}
      barColors={["#A9A1F4"]}
      barRadius={8}
      tickLine={true}
      gridStroke="#ccc"
      tickFontSize="12px"
      tickFormatter={(value) => value.slice(0, 3)}
    />
  );
}
