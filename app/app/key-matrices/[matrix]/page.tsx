"use client";
import DashboardCharts from "@/components/dashboard-charts";
import Filters from "@/components/filters";
import MatricesData from "@/components/matrices-data";
import MatricesSelector from "@/components/matrices-selector";
import MatrixCard from "@/components/matrix-card";
import { Tabs } from "@/components/ui/tabs";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import Layout from "@/layout/secondary";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function MatrixDataPage() {
  const { matrix } = useParams<{ matrix: string }>();
  const [selectedMatrix, setSelectedMatrix] = useState<Matrix | null>(
    KeyMatrices.find((m) => m.key === matrix) || null
  );
  const [selectedChart, setSelectedChart] = useState<
    ChartDescription | MatrixData | null
  >(null);
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";

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
    <Layout
      page="key-matrices"
      title={selectedMatrix?.title || "Matrix Name"}
      className="sticky"
    >
      <div className="flex flex-col w-full  md:hidden px-2">
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

      <div className="md:flex w-full justify-between hidden ">
        <Tabs defaultValue={tab} className="flex flex-col w-full px-2">
          <div className="flex w-full items-center justify-center gap-5 mt-16 md:mt-20 md:mb-2">
            <MatricesSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <MatricesData />
            </div>
            <div className="md:flex md:flex-col md:w-2/3 hidden flex-grow items-center justify-start md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
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
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default MatrixDataPage;