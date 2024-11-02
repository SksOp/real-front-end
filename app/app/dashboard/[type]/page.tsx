"use client";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import MatrixCard from "@/components/matrix-card";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { ChartConfig } from "@/components/ui/chart";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChartDescription, Dashboard, MatrixData } from "@/config/types";
import { dashboards } from "@/config/dashboards";
import DashboardCharts from "@/components/dashboard-charts";
import { Spinner } from "@/components/ui/spinner";

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
  const [loading, setLoading] = useState<boolean>(false); // New loading state

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
    <SecondaryNavbar title={dashboard?.name ?? ""} className="sticky">
      <Filters
        selectOptions={dashboard?.page_filters || []}
        selectedFilters={filters}
        onChange={handleFilterChange}
      />

      {loading ? ( // Display loading screen when loading
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <Spinner />
        </div>
      ) : (
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
                styles={chart.styles}
                description={chart.description}
              />
            ))}

            <Feedback />
          </div>
        </main>
      )}
    </SecondaryNavbar>
  );
}

export default MyPage;
