"use client";

import React, { useState } from "react";
import SalesIndexCardComponent from "../chart/salesIndexcard/salesIndexcard"; // Adjust the import path according to your project structure
import { IQRType } from "@/transcation/types";

export function SalesIndexBenchmarking({ data }: { data: IQRType[] }) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  if (!data) {
    return <p>No data available</p>;
  }

  const percentile25 = data[0].Percentile_25;
  const percentile75 = data[0].Percentile_75;

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
