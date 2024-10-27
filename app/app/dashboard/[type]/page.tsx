"use client";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import MatrixCard from "@/components/matrix-card";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { ChartConfig } from "@/components/ui/chart";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChartDescription, Dashboard, MatrixData } from "@/config/types";
import { dashboards } from "@/config/dashboards";
import DashboardCharts from "@/components/dashboard-charts";

const chartConfig = {
  Cash: {
    color: "#DDF8E4",
  },
  Mortgage: {
    color: "#EFEEFC",
  },
  Gifts: {
    color: "#FFDBDB",
  },
} as ChartConfig;

const chartConfig2 = {
  "Dubai Marina": { color: "#FFC8C8" },
  "Dubai Central": { color: "#EFEEFC" },
  "Dubai East": { color: "#D1F6DB" },
  "Dubai West": { color: "#FCF8D1" },
} as ChartConfig;

const chartConfig3 = {
  Residential: { color: "#FFDBDB" },
  Commercial: { color: "#DDF8E4" },
} as ChartConfig;

const data = [
  { name: "Dubai Marina", value: 20, colorClass: "bg-[#FFC8C8]" },
  { name: "Dubai Central", value: 12, colorClass: "bg-[#EFEEFC]" },
  { name: "Dubai East", value: 21, colorClass: "bg-[#D1F6DB]" },
  { name: "Dubai West", value: 6, colorClass: "bg-[#FCF8D1]" },
];

const sampleData1 = [
  { year: "2018", value: 28 },
  { year: "2019", value: 39 },
  { year: "2020", value: 18 },
  { year: "2021", value: 35 },
  { year: "2022", value: 30 },
  { year: "2023", value: 34 },
  { year: "2024", value: 32 },
];

function MyPage() {
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [dashboard, setDashboard] = useState<Dashboard | undefined>(undefined);
  const [matrixData, setMatrixData] = useState<MatrixData[] | undefined>(
    undefined
  );
  const [charts, setCharts] = useState<ChartDescription[] | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );
  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const key = pathSegments[pathSegments.length - 1];
    if (key) {
      const selectedDashboard = dashboards.find((item) => item.key === key);

      setDashboard(selectedDashboard);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchMatricsData = async () => {
      console.log("fetching matrics data");
      const date = new Date();
      const presentYear = date.getFullYear();
      filters.start_year = presentYear - 1;
      filters.end_year = presentYear;
      console.log("filters", filters);
      const matrixOutput = await dashboard?.calculate_matrics?.(filters);

      console.log("matrixOutput", matrixOutput);
      if (Array.isArray(data) && data.length > 0) setMatrixData(matrixOutput);
    };

    if (dashboard) {
      fetchMatricsData();
    }
  }, [dashboard, filters]);

  useEffect(() => {
    const fetchChartsData = async () => {
      console.log("fetching charts data");

      if (dashboard?.calculate_charts) {
        // Map over calculate_charts and wait for all async calculate calls to resolve
        const allCharts = await Promise.all(
          dashboard.calculate_charts.map(async (chart) => {
            const chartData = await chart.calculate(filters);
            console.log("chartData", chartData);
            return chartData;
          })
        );

        setCharts(allCharts);
        console.log("charts", allCharts);
      }
    };

    if (dashboard) {
      fetchChartsData();
    }
  }, [dashboard, filters]);

  // const dashboard = dashboards.find((item) => item.key === dashboardId);

  // const matrixData = [
  //   { title: "Average Rental Value", value: "120 K", growth: -21 },
  //   { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
  //   { title: "Total Value", value: "165 K", growth: 21 },
  //   { title: "No of Transactions", value: "20", growth: -21 },
  // ];

  return (
    <SecondaryNavbar title={dashboard?.name ?? ""} className="sticky">
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

          {charts?.map((chart) => (
            <DashboardCharts
              type={chart.chart_type}
              data={chart.data}
              chartConfig={chart.chartConfig}
              title={chart.name}
              filters={chart.filters}
              columns={chart?.columns}
              otherInfo={chart.otherInfo}
              subCharts={chart.sub_charts}
              description={chart.description}
            />
          ))}

          <Feedback />
        </div>
      </main>
    </SecondaryNavbar>
  );
}

export default MyPage;
