"use client";

import React, { useEffect, useState } from "react";
import VerticalBarChartComponent from "../../chart/horizontalbarchart/horizontalbarchart"; // Adjust the import path according to your project structure
import { OffplanvsReadyType } from "@/transcation/types";
import { OfVsRe } from "@/actions/offplanvsready";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getOffplanVsReady } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

export interface OfReChartDataTypeYearly {
  Ofplan: number;
  Ready: number;
}

export interface OfReChartDataTypeQuaterly {
  Ofplan: number;
  Ready: number;
}
export interface OfReChartDataTypeMonthly {
  Ofplan: number;
  Ready: number;
}

export function OffplanvsReady() {
  const {
    data: offplanvsready,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getOffplanVsReady());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const frvsre = new OfVsRe();
  const [chartData, setChartData] = useState<
    | OfReChartDataTypeYearly
    | OfReChartDataTypeQuaterly
    | OfReChartDataTypeMonthly
  >(frvsre.getYearlyData({ data: offplanvsready! }));
  const Option = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = frvsre.getYearlyData({ data: offplanvsready! });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = frvsre.getQuarterlyData({ data: offplanvsready! });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = frvsre.getMonthlyData({ data: offplanvsready! });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    if (offplanvsready) {
      const frvsre = new OfVsRe();
      const datat = frvsre.getYearlyData({ data: offplanvsready! });
      setChartData(datat);
    }
  }, [offplanvsready]);

  if (isLoading || !offplanvsready) {
    return <Skeleton />;
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"OffPlan vs Ready"}
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
        {/* <VerticalBarChartComponent
          // title="Offplan"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Ofplan"
          value={chartData?.Ofplan || 0}
          color="hsl(var(--chart-1))"
          selectedOption={selectedOption}
        />

        <VerticalBarChartComponent
          // title="Ready"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Ready"
          value={chartData?.Ready || 0}
          color="hsl(var(--muted))"
          selectedOption={selectedOption}
        /> */}
      </CardContent>
    </Card>
  );
}
