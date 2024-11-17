"use client";
import DashboardCharts from "@/components/dashboard-charts";
import Filters from "@/components/filters";
import MatrixCard from "@/components/matrix-card";
import { KeyMatrices, Matrices } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import Layout from "@/layout/secondary";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function MatrixDataPage() {
  const { matrix } = useParams<{ matrix: string }>();
  const [selectedMatrix, setSelectedMatrix] = useState<Matrices | null>(
    KeyMatrices.find((m) => m.key === matrix) || null
  );
  const [selectedChart, setSelectedChart] = useState<
    ChartDescription | MatrixData | null
  >(null);
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterKey]: value };
      console.log("Updated filters", updatedFilters);
      return updatedFilters;
    });
  };
  useEffect(() => {
    const fetchMatrixData = async () => {
      const matrixData = KeyMatrices.find((m) => m.key === matrix);
      setSelectedMatrix(matrixData || null);
      const chartData = await matrixData?.calculate_charts?.calculate(filters);
      setSelectedChart(chartData || null);
    };
    fetchMatrixData();
  }, [matrix, filters]);

  return (
    <Layout page="key-matrices" title={selectedMatrix?.title || "Matrix Name"}>
      <div className="pt-12 px-2 ">
        <Filters
          selectOptions={selectedMatrix?.filters || []}
          selectedFilters={filters}
          onChange={handleFilterChange}
        />

        {selectedChart && (
          <>
            {/* If selectedChart is of type ChartDescription */}
            {"chart_type" in selectedChart ? (
              <DashboardCharts
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
        )}
      </div>
    </Layout>
  );
}

export default MatrixDataPage;
