"use client";

import React, { useState } from "react";
import SalesIndexCardComponent from "../../chart/salesIndexcard/salesIndexcard"; // Adjust the import path according to your project structure
import { IQRType } from "@/transcation/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getIQR } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesIndexBenchmarking() {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  const {
    data: IQR,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getIQR());

  if (isLoading || !IQR) {
    return <Skeleton />;
  }

  const percentile25 = IQR[0].Percentile_25;
  const percentile75 = IQR[0].Percentile_75;

  return (
    <SalesIndexCardComponent
      title="Sales Index Benchmarking"
      description="Aggregated Monthly Data"
      percentile25={percentile25}
      percentile75={percentile75}
      trendDescription="Trending up by 5.2% this month"
      footerText="Showing total visitors for the last 6 months"
    />
  );
}
