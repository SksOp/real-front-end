"use client";
import ChartWrapper from "@/components/chart/chartWrapper";
import DashboardCharts from "@/components/dashboard-charts";
import KeyMatricesCard from "@/components/keyMatricesCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { KeyMatrices, Matrices } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import Layout from "@/layout/secondary";
import Link from "next/link";
import React, { useState } from "react";

function KeyMatricesPage() {
  const [selectedChart, setSelectedChart] = useState<
    ChartDescription | MatrixData | null
  >(null);

  const handleChartSelection = async (chart: Matrices) => {
    if (chart.calculate_charts) {
      const chartData = await chart.calculate_charts.calculate();
      setSelectedChart(chartData);
    }
  };

  return (
    <Layout page="key-matrices" title="Key Matrices">
      <div className="flex flex-col gap-3 px-4 pt-16 md:pt-20 pb-8">
        {KeyMatrices.map((matrix) => (
          <Link href={`/app/key-matrices/${matrix.key}`}>
            <KeyMatricesCard
              key={matrix.key}
              title={matrix.title}
              description={matrix.description}
              tag={matrix.tag}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default KeyMatricesPage;
