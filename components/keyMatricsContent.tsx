"use client";
import React, { useEffect, useState } from "react";
import Filters from "./filters";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import { useSearchParams } from "next/navigation";
import { Spinner } from "./ui/spinner";
import DashboardCharts from "./dashboard-charts";
import MatrixCard from "./matrix-card";

function KeyMatricsContent({ matrix }: { matrix: string }) {
  const [selectedMatrix, setSelectedMatrix] = useState<Matrix | null>(
    KeyMatrices.find((m) => m.key === matrix) || null
  );
  const [selectedChart, setSelectedChart] = useState<
    ChartDescription | MatrixData | null
  >(null);
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";

  const handleFilterChange = (filterKey: string, value: string | null) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (value === null) {
        // Remove the filter key if the value is null
        delete updatedFilters[filterKey];
      } else {
        // Update the filter key with the new value
        updatedFilters[filterKey] = value;
      }

      console.log("Updated filters", updatedFilters);
      return updatedFilters;
    });
  };
  console.log("KeyMatricsContent", matrix);
  useEffect(() => {
    const fetchMatrixData = async () => {
      setLoading(true); // Set loading to true before fetching data
      const matrixData = KeyMatrices.find((m) => m.key === matrix);
      setSelectedMatrix(matrixData || null);
      const date = new Date();
      if (filters && !filters?.end_year) filters.end_year = date.getFullYear();
      const chartData = await matrixData?.calculate_charts?.calculate(filters);
      setSelectedChart(chartData || null);
      setLoading(false); // Set loading to false after fetching data
    };
    fetchMatrixData();
  }, [matrix, filters]);
  return (
    <div className="w-full">
      <Filters
        selectOptions={selectedMatrix?.filters || []}
        selectedFilters={filters}
        onChange={handleFilterChange}
      />

      {loading ? ( // Display loading indicator when loading is true
        <div className="flex h-full items-center justify-center">
          <Spinner />
          <div className="ml-2">Loading...</div>
        </div>
      ) : (
        selectedChart && (
          <>
            {/* If selectedChart is of type ChartDescription */}
            {"chart_type" in selectedChart ? (
              <DashboardCharts
                dashboardType={"sales"}
                type={selectedChart.chart_type}
                data={selectedChart.data}
                chartConfig={selectedChart.chartConfig}
                title={selectedChart.name}
                filters={selectedChart.filters}
                columns={selectedChart?.columns}
                otherInfo={selectedChart.otherInfo}
                subCharts={selectedChart.sub_charts}
                insights={selectedChart.insights}
                description={selectedChart.description}
              />
            ) : (
              /* If selectedChart is of type MatrixData */
              <MatrixCard
                key={selectedMatrix?.key}
                title={selectedChart?.title}
                value={selectedChart?.value}
                growth={parseInt(String(selectedChart?.growth))}
              />
            )}
          </>
        )
      )}
    </div>
  );
}

export default KeyMatricsContent;