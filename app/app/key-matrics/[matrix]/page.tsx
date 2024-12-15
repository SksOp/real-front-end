"use client";
import DashboardCharts from "@/components/dashboard-charts";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import FrequentQuestions from "@/components/frequent-questions";
import HomeIntro from "@/components/home-intro";
import MatricesData from "@/components/matrices-data";
import MatricesSelector from "@/components/matrices-selector";
import MatrixCard from "@/components/matrix-card";
import SharingCard from "@/components/sharingCard";
import { Tabs } from "@/components/ui/tabs";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import Layout from "@/layout/secondary";
import { cn } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner"; // Import Spinner component

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
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
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
    <Layout
      page="key-matrices"
      title={selectedMatrix?.title || "Matrix Name"}
      className={cn(
        selectedMatrix?.filters &&
          selectedMatrix?.filters.length > 0 &&
          "sticky"
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full pt-8  md:hidden px-2",
          selectedMatrix?.filters &&
            selectedMatrix?.filters.length > 0 &&
            "pt-0"
        )}
      >
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
            <div className="">
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
            </div>
          )
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
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default MatrixDataPage;
