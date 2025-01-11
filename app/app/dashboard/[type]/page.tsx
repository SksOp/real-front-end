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
import HomeTransactionCard from "@/components/home-transaction-card";
import { cn } from "@/lib/utils";
import SecondaryChartWrapper from "@/components/secondaryChartWrapper";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import InsightCard from "@/components/insightCard";
import DonutChartComponent from "@/components/chart/donutChart/donutChart";
import ChartWrapper from "@/components/chart/chartWrapper";
import Exceptions from "@/components/exceptions";
import {
  FlaskException,
  NoDataException,
  SelectDataException,
} from "@/public/svg/exceptions";
import { Separator } from "@/components/ui/separator";
import { MainLogo } from "@/public/svg/logo";
import LoadingWidget from "@/components/loadingWidget";
import { useAuth } from "@/lib/auth";

function DashboardDetailPage() {
  const navRef = useRef<HTMLElement | null>(null);
  const { type } = useParams();
  const auth = useAuth();
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
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchMatrixData = async () => {
      const date = new Date();
      const token = await auth.user?.getIdToken(true);
      if (filters && !filters?.end_year) filters.end_year = date.getFullYear();

      const matrixOutput = await dashboard?.calculate_matrics?.(filters, token);
      if (Array.isArray(matrixOutput) && matrixOutput.length > 0) {
        setMatrixData(matrixOutput);
      }
    };

    const fetchChartsData = async () => {
      const date = new Date();
      const token = await auth.user?.getIdToken(true);
      if (filters && !filters?.end_year) filters.end_year = date.getFullYear();
      if (dashboard?.calculate_charts) {
        const allCharts = await Promise.all(
          dashboard.calculate_charts.map(async (chart) => {
            return await chart.calculate(filters, token);
          })
        );
        setCharts(allCharts);
      }
    };

    const fetchData = async () => {
      if (dashboard) {
        setLoading(true);
        await Promise.all([fetchChartsData(), fetchMatrixData()]);
        setLoading(false);
      }
    };

    fetchData();
  }, [dashboard, filters]);

  return (
    <Layout
      page="dashboards"
      title={dashboard?.name ?? ""}
      className={cn(
        dashboard?.page_filters &&
          dashboard?.page_filters.length > 0 &&
          "sticky"
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full pt-8  md:hidden ",
          dashboard?.page_filters &&
            dashboard?.page_filters.length > 0 &&
            "pt-0"
        )}
      >
        {dashboard?.tag === "upcoming" ? (
          <Exceptions
            svg={<FlaskException />}
            title={"Coming Soon!"}
            description={
              "This dashboard is not yet available, this is getting cooked!"
            }
          />
        ) : (
          <>
            <Filters
              selectOptions={dashboard?.page_filters || []}
              selectedFilters={filters}
              onChange={handleFilterChange}
            />
            <main ref={navRef}>
              <div className="bg-gradient-to-b from-background to-[#FAFAFA] px-3 mb-4 flex flex-col gap-3">
                {loading ? (
                  <LoadingWidget className="min-h-[calc(100vh-10rem)]" />
                ) : (
                  <>
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
                        dashboardType={
                          dashboard?.dashboard_filters?.mode || "sales"
                        }
                        key={index}
                        type={chart.chart_type}
                        data={chart.data}
                        chartConfig={chart.chartConfig}
                        title={chart.name}
                        filters={chart.filters}
                        viewAll={chart.view_all}
                        columns={chart?.columns}
                        otherInfo={chart.otherInfo}
                        subCharts={chart.sub_charts}
                        insights={chart.insights}
                        description={chart.description}
                      />
                    ))}
                    <Feedback />
                    <SharingCard
                      link={`https://www.keypilot.io/app/dashboard/${dashboard?.key}`}
                    />
                  </>
                )}
              </div>
            </main>
          </>
        )}
      </div>

      <div className="md:flex w-full justify-between hidden pt-12  md:pt-20 px-4 ">
        <Tabs
          defaultValue={"standard"}
          className="flex flex-col gap-4 w-full md:p-3 md:pb-0 border-0 md:border rounded-xl"
        >
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full max-h-[calc(100vh-7rem)] overflow-y-auto">
              <DashboardSelector />
              <DashboardData className="md:flex flex-col gap-3" />
            </div>
            <Separator orientation="vertical" />
            <div className="md:flex md:flex-col md:w-2/3 hidden flex-grow items-center justify-start gap-3 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {dashboard?.tag === "upcoming" ? (
                <Exceptions
                  svg={<FlaskException />}
                  title={"Coming Soon!"}
                  description={
                    "This dashboard is not yet available, this is getting cooked!"
                  }
                />
              ) : (
                <>
                  {" "}
                  <Filters
                    selectOptions={dashboard?.page_filters || []}
                    selectedFilters={filters}
                    onChange={handleFilterChange}
                  />
                  {loading ? (
                    <LoadingWidget className="min-h-[calc(100vh-10rem)]" />
                  ) : (
                    <>
                      {matrixData && matrixData[3].value === "N/A" ? (
                        <Exceptions
                          svg={<NoDataException />}
                          title="No data available for the selected filter"
                          description="No data for the selected criteria. try changing the filters."
                          className="col-span-2"
                        />
                      ) : (
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

                          <div className="grid grid-cols-2 gap-4  justify-items-center w-full">
                            {charts?.map((chart, index) =>
                              index === 3 &&
                              dashboard?.key !== "supply_trends_dashboard" &&
                              dashboard?.key !== "offplan_market_insights" &&
                              dashboard?.key !== "sales_price_index" ? (
                                <ChartWrapper
                                  title="Transactions Value Index"
                                  description="Analyze property value trends across low, medium, and high segments with detailed price distribution. Understand the market landscape and uncover opportunities for every budget range."
                                  className="col-span-2"
                                >
                                  <div className="flex justify-center items-stretch   gap-3">
                                    <SecondaryChartWrapper className="flex flex-col justify-center items-center ">
                                      <div className="flex flex-col justify-between items-center  gap-10 ">
                                        <SalesIndexCardComponent
                                          percentile25={chart.data[0]}
                                          percentile75={chart.data[1]}
                                          knob={
                                            (chart.data[0] + chart.data[1]) / 2
                                          }
                                        />
                                        <InsightCard>
                                          {chart.insights}
                                        </InsightCard>
                                      </div>
                                    </SecondaryChartWrapper>
                                    <SecondaryChartWrapper>
                                      <div className="flex flex-col justify-between items-center gap-10 ">
                                        <DonutChartComponent
                                          chartConfig={
                                            chart.sub_charts[0]?.chartConfig
                                          }
                                          data={chart.sub_charts[0].data}
                                          dataKey="value"
                                          nameKey="name"
                                        />
                                        <InsightCard>
                                          {chart.sub_charts[0].insights}
                                        </InsightCard>
                                      </div>
                                    </SecondaryChartWrapper>
                                  </div>
                                </ChartWrapper>
                              ) : (
                                <DashboardCharts
                                  key={index + 1}
                                  dashboardType={
                                    dashboard?.dashboard_filters?.mode ||
                                    "sales"
                                  }
                                  type={chart.chart_type}
                                  data={chart.data}
                                  chartConfig={chart.chartConfig}
                                  title={chart.name}
                                  filters={chart.filters}
                                  viewAll={chart.view_all}
                                  columns={chart?.columns}
                                  otherInfo={chart.otherInfo}
                                  subCharts={chart.sub_charts}
                                  description={chart.description}
                                  insights={chart?.insights}
                                  className={cn(
                                    "",
                                    (index === 0 ||
                                      index === charts.length - 1) &&
                                      "col-span-2"
                                  )}
                                />
                              )
                            )}{" "}
                            <Feedback />
                            <SharingCard
                              link={`https://www.keypilot.io/app/dashboard/${dashboard?.key}`}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {/* <div className="lg:flex md:w-1/3 hidden md:bg-primary/5 max-w-md justify-center md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              insights
            </div> */}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default DashboardDetailPage;
