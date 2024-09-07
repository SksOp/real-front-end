"use client";

import React, { useEffect, useState } from "react";
import VerticalBarChartComponent from "../../chart/verticalbarchart/verticalbarchart"; // Adjust the import path according to your project structure
import { ResidentialVsCommercialType } from "@/transcation/types";
import { ResvsCo } from "@/actions/residentialvscommercial";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getResidentialVsCommercialType } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

export interface RandCChartDataTypeYearly {
  Residential: number;
  Commercial: number;
}

export interface RandCChartDataTypeQuaterly {
  Residential: number;
  Commercial: number;
}
export interface RandCChartDataTypeMonthly {
  Residential: number;
  Commercial: number;
}

export function ResidentialVsCommercial() {
  const {
    data: residentialVsCommercialData,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getResidentialVsCommercialType());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const revsco = new ResvsCo();
  const [chartData, setChartData] = useState<
    | RandCChartDataTypeYearly
    | RandCChartDataTypeQuaterly
    | RandCChartDataTypeMonthly
  >(revsco.getYearlyData({ data: residentialVsCommercialData! }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  useEffect(() => {
    if (residentialVsCommercialData) {
      const revsco = new ResvsCo();
      const datat = revsco.getYearlyData({
        data: residentialVsCommercialData!,
      });
      setChartData(datat);
    }
  }, [residentialVsCommercialData]);

  if (isLoading || !residentialVsCommercialData) {
    return <Skeleton />;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = revsco.getYearlyData({
        data: residentialVsCommercialData!,
      });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = revsco.getQuarterlyData({
        data: residentialVsCommercialData!,
      });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = revsco.getMonthlyData({
        data: residentialVsCommercialData!,
      });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Residential Vs Commercial"}
          <select
            value={selectedOption}
            onChange={handleOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {Option.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </CardTitle>
        <CardDescription>
          {"You're averaging more steps a day this year than last year."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VerticalBarChartComponent
          // title="Residential"
          // description="Residential data"
          dataKey="Residential"
          value={chartData?.Residential || 0}
          color="hsl(var(--chart-1))"
          selectedOption={selectedOption}
        />
        <VerticalBarChartComponent
          // title="Commercial"
          // description="Commercial data"
          dataKey="Commercial"
          value={chartData?.Commercial || 0}
          color="var(--color-commercial)"
          selectedOption={selectedOption}
        />
      </CardContent>
    </Card>
  );
}
