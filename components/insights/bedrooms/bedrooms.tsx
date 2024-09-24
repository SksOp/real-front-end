"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import PieChartComponent from "../../chart/piechart/piechart"; // Adjust the import path according to your project structure
import { BedroomType } from "@/transcation/types";
import { Bedroom } from "@/actions/bedroom";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getBedrooms } from "@/repository/tanstack/queries/functions.queries";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  "1 B/R": { label: "1 B/R", color: "#f0f9ff" },
  "2 B/R": { label: "2 B/R", color: "#60a5fa" },
  "3 B/R": { label: "3 B/R", color: "#93c5fd" },
  "4 B/R": { label: "4 B/R", color: "#bfdbfe" },
  "5 B/R": { label: "5 B/R", color: "#e0f2fe" },
  "6 B/R": { label: "6 B/R", color: "#3b82f6" },
  "7 B/R": { label: "7 B/R", color: "#2563eb" },
  "9 B/R": { label: "9 B/R", color: "#0891b2" },
  GYM: { label: "GYM", color: "#22d3ee" },
  Office: { label: "Office", color: "#0ea5e9" },
  PENTHOUSE: { label: "PENTHOUSE", color: "#1d4ed8" },
  Shop: { label: "Shop", color: "#1e40af" },
  "Single Room": { label: "Single Room", color: "#1e3a8a" },
  Studio: { label: "Studio", color: "#6366f1" },
};

export interface BedroomChartDataTypeYearly {
  bedrooms: string;
  property_count: number;
}

export interface BedroomChartDataTypeQuaterly {
  bedrooms: string;
  property_count: number;
}
export interface BedroomChartDataTypeMonthly {
  bedrooms: string;
  property_count: number;
}

export function Bedrooms() {
  const {
    data: bedrooms,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getBedrooms());

  const [selectedOption, setSelectedOption] = useState<string>("Yearly");
  const bedroom = new Bedroom();
  const [chartData, setChartData] = useState<
    | BedroomChartDataTypeYearly[]
    | BedroomChartDataTypeQuaterly[]
    | BedroomChartDataTypeMonthly[]
  >([]);
  const Option = ["Yearly", "Qaterly", "Monthly"];

  useEffect(() => {
    if (bedrooms) {
      const bedroom = new Bedroom();
      setChartData(bedroom.getYearlyBedroomData({ data: bedrooms }));
    }
  }, [bedrooms]);

  if (isLoading || !bedrooms) {
    return <Skeleton />;
  }

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Yearly") {
      const datat = bedroom.getYearlyBedroomData({ data: bedrooms! });
      setChartData(datat);
    } else if (selectedValue === "Qaterly") {
      const datat = bedroom.getQuarterlyBedroomData({ data: bedrooms! });
      setChartData(datat);
    } else if (selectedValue === "Monthly") {
      const datat = bedroom.getMonthlyBedroomData({ data: bedrooms! });
      setChartData(datat);
    }
    setSelectedOption(selectedValue);
  };

  const title = (
    <div className="flex justify-between items-center">
      Bedrooms
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

  const description = "2023-2024";
  const footer = (
    <>
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </>
  );
  const footerDescription = "Showing total properties for the last 6 months";

  return (
    <PieChartComponent
      // title={title}
      // description={description}
      chartConfig={chartConfig}
      // footer={footer}
      // footerDescription={footerDescription}
      data={chartData}
      dataKey="property_count"
      nameKey="bedrooms"
      innerRadius={60}
      outerRadius={80}
      strokeWidth={5}
    />
  );
}
