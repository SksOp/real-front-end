"use client";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import MatrixCard from "@/components/matrix-card";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { ChartConfig } from "@/components/ui/chart";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChartDescription, Dashboard, MatrixData } from "@/config/types";
import { dashboards } from "@/config/dashboards";
import DashboardCharts from "@/components/dashboard-charts";
import { Spinner } from "@/components/ui/spinner";
import { Tabs } from "@/components/ui/tabs";
import DashboardSelector from "@/components/dashboard-selector";
import DashboardData from "@/components/all-dashboard-data";
import Layout from "@/layout/secondary";
import SharingCard from "@/components/sharingCard";

function DashboardDetailPage() {
  const navRef = useRef<HTMLElement | null>(null);
  const { type } = useParams();
  const [dashboard, setDashboard] = useState<Dashboard | undefined>(
    dashboards.find((item) => item.key === type)
  );
  const [matrixData, setMatrixData] = useState<MatrixData[] | undefined>(
    undefined
  );
  const [charts, setCharts] = useState<ChartDescription[] | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  useEffect(() => {
    const fetchMatrixData = async () => {
      setLoading(true); // Start loading
      const date = new Date();
      const presentYear = date.getFullYear();
      filters.start_year = presentYear - 1;
      filters.end_year = presentYear;
      const matrixOutput = await dashboard?.calculate_matrics?.(filters);
      if (Array.isArray(matrixOutput) && matrixOutput.length > 0) {
        setMatrixData(matrixOutput);
      }
      setLoading(false); // End loading once data is fetched
    };

    if (dashboard) {
      fetchMatrixData();
    }
  }, [dashboard, filters]);

  useEffect(() => {
    const fetchChartsData = async () => {
      setLoading(true); // Start loading
      const date = new Date();
      const presentYear = date.getFullYear();
      filters.year = presentYear;
      if (dashboard?.calculate_charts) {
        const allCharts = await Promise.all(
          dashboard.calculate_charts.map(async (chart) => {
            return await chart.calculate(filters);
          })
        );
        setCharts(allCharts);
      }
      setLoading(false); // End loading once data is fetched
    };

    if (dashboard) {
      fetchChartsData();
    }
  }, [dashboard, filters]);

  return (
    <Layout page="dashboards" title={dashboard?.name ?? ""} className="sticky">
      <div className="flex flex-col w-full gap-3 md:hidden top-11">
        <Filters
          selectOptions={dashboard?.page_filters || []}
          selectedFilters={filters}
          onChange={handleFilterChange}
        />

        <main ref={navRef}>
          <div className="bg-gradient-to-b from-background to-[#FAFAFA] px-3 mb-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 w-full">
              {matrixData?.map((item, index) => (
                <MatrixCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  growth={parseInt(String(item.growth))}
                />
              ))}
            </div>
            {charts?.map((chart, index) => (
              <DashboardCharts
                key={index}
                type={chart.chart_type}
                data={chart.data}
                chartConfig={chart.chartConfig}
                title={chart.name}
                filters={chart.filters}
                columns={chart?.columns}
                otherInfo={chart.otherInfo}
                subCharts={chart.sub_charts}
                insights={chart.insights}
                description={chart.description}
              />
            ))}

            <Feedback />
          </div>
        </main>
      </div>

      <div className="md:flex w-full justify-between hidden ">
        <Tabs
          defaultValue={"all-dashboards"}
          className="flex flex-col w-full px-2"
        >
          <div className="flex w-full items-center justify-center gap-5 mt-16 md:mt-20">
            <DashboardSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <DashboardData />
            </div>
            <div className="md:flex md:flex-col md:w-2/3 hidden flex-grow items-center justify-start gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <Filters
                selectOptions={dashboard?.page_filters || []}
                selectedFilters={filters}
                onChange={handleFilterChange}
              />

              <div className="px-1 mb-4 flex flex-col gap-4 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                  {matrixData?.map((item, index) => (
                    <MatrixCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      growth={parseInt(String(item.growth))}
                    />
                  ))}
                </div>
                {charts && (
                  <DashboardCharts
                    type={charts[0].chart_type}
                    data={charts[0].data}
                    chartConfig={charts[0].chartConfig}
                    title={charts[0].name}
                    filters={charts[0].filters}
                    columns={charts[0]?.columns}
                    otherInfo={charts[0].otherInfo}
                    subCharts={charts[0].sub_charts}
                    insights={charts[0]?.insights}
                    description={charts[0].description}
                  />
                )}

                <div className="grid grid-cols-2 gap-4 items-stretch w-full">
                  {charts?.slice(1, -1).map((chart, index, arr) => (
                    <DashboardCharts
                      key={index + 1}
                      type={chart.chart_type}
                      data={chart.data}
                      chartConfig={chart.chartConfig}
                      title={chart.name}
                      filters={chart.filters}
                      columns={chart?.columns}
                      otherInfo={chart.otherInfo}
                      subCharts={chart.sub_charts}
                      description={chart.description}
                      insights={chart?.insights}
                      className={
                        arr.length % 2 !== 0 && index === 2 ? "col-span-2" : ""
                      }
                    />
                  ))}
                </div>

                {charts && (
                  <DashboardCharts
                    type={charts[charts.length - 1].chart_type}
                    data={charts[charts.length - 1].data}
                    chartConfig={charts[charts.length - 1].chartConfig}
                    title={charts[charts.length - 1].name}
                    filters={charts[charts.length - 1].filters}
                    columns={charts[charts.length - 1]?.columns}
                    otherInfo={charts[charts.length - 1].otherInfo}
                    subCharts={charts[charts.length - 1].sub_charts}
                    description={charts[charts.length - 1].description}
                    insights={charts[charts.length - 1]?.insights}
                  />
                )}
                <Feedback />
                <SharingCard />
              </div>
            </div>
            <div className="lg:flex md:w-1/3 hidden md:bg-primary/5 max-w-md justify-center md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              insights
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default DashboardDetailPage;
