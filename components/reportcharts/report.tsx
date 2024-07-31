"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/card";
import { ReportCard } from "../ui/reportCard";
import { fetchAverageValues } from "@/actions/functions";
import { getTransactionData } from "@/transcation/charts";

export const Report = () => {
  const [averageValue, setAverageValue] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(0);
  const [yoyGrowth, setYoYGrowth] = React.useState(0);
  const [totalTransactions, setTotalTransactions] = React.useState(0);

  // interface TransactionAverageValues {
  //   [year: string]: { [monthName: string]: {sales: number, Transactions: number} };
  // }

  useEffect(() => {
    console.log("fetching data");
    fetchAverageValues().then((data) => {
      
      const { averageValue, totalValue, yoyGrowth, totalTransactions } = getTransactionData(data!);
      if (data) {
        setAverageValue(averageValue);
        setTotalValue(totalValue);
        setYoYGrowth(yoyGrowth);
        setTotalTransactions(totalTransactions);
      }
    });
  })
  const handelAverageValue = () => {
    setAverageValue(10000);
    return "10,000";
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      <ReportCard
        title="Average Rental Value"
        value={averageValue}
        color="green"
        description="Last 24 hours"
      />
      <ReportCard
        title="Total Rental Value"
        value={totalValue}
        color="green"
        description="Last 24 hours"
      />

      <ReportCard
        title="YoY Growth"
        value={yoyGrowth}
        color="green"
        description="Last 24 hours"
      />
      <ReportCard
        title="Total Rental Transactions"
        value={totalTransactions}
        color="green"
        description="Last 24 hours"
      />
    </div>
  );
};
