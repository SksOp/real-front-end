"use client";

import React, { useEffect, useState } from "react";
import VerticalBarChartComponent from "../../chart/verticalbarchart/verticalbarchart"; // Adjust the import path according to your project structure
import { FreeholdVsLeaseType } from "@/transcation/types";
import { FrVsRe } from "@/actions/freeholdvs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getFreeholdVsLease,
  getOffplanVsReady,
} from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

export interface FrvReChartDataTypeYearly {
  Freehold: number;
  Lease: number;
}

export interface FrvReChartDataTypeQuaterly {
  Freehold: number;
  Lease: number;
}

export interface FrvReChartDataTypeMonthly {
  Freehold: number;
  Lease: number;
}

export function FreeholdvsLease() {
  const {
    data: freeholdbslease,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getFreeholdVsLease());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const frvsre = new FrVsRe();
  const [chartData, setChartData] = useState<
    | FrvReChartDataTypeYearly
    | FrvReChartDataTypeQuaterly
    | FrvReChartDataTypeMonthly
  >(frvsre.getYearlyData({ data: freeholdbslease! }));
  const options = ["Yearly", "Qaterly", "Monthly"];

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      setChartData(frvsre.getYearlyData({ data: freeholdbslease! }));
    } else if (selectedValue === "Qaterly") {
      setChartData(frvsre.getQuarterlyData({ data: freeholdbslease! }));
    } else if (selectedValue === "Monthly") {
      setChartData(frvsre.getMonthlyData({ data: freeholdbslease! }));
    }
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    if (freeholdbslease) {
      const frvsre = new FrVsRe();
      setChartData(frvsre.getYearlyData({ data: freeholdbslease! }));
    }
  }, [freeholdbslease]);

  if (isLoading || !freeholdbslease) {
    return <Skeleton />;
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {"Freehold vs Lease"}
          <select
            value={selectedOption}
            onChange={handleOption}
            className="ml-2 p-0.5 rounded text-sm"
          >
            {options.map((opt) => (
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
          // title="Freehold"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Freehold"
          value={chartData?.Freehold || 0}
          color="hsl(var(--chart-1))"
          selectedOption={selectedOption}
        />

        <VerticalBarChartComponent
          // title="Lease"
          // description="You're averaging more steps a day this year than last year."
          dataKey="Lease"
          value={chartData?.Lease || 0}
          color="hsl(var(--muted))"
          selectedOption={selectedOption}
        />
      </CardContent>
    </Card>
  );
}
