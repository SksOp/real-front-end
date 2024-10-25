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
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({
    year: 2024,
  });
  const [chartFilter, setChartFilter] = useState<string>("Total Value");

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
      filters.year = presentYear;
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
    console.log(filters);
    const fetchChartsData = async () => {
      console.log("fetching charts data");
      dashboard?.calculate_charts?.forEach(async (chart) => {
        const chartData = await chart.calculate();
        setCharts((prev) => [...(prev ?? []), chartData]);
      });
      console.log("charts", charts);
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
      {/* <Progressbar target={navRef} className="top-12" /> */}
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
              description={chart.description}
            />
          ))}
          {/* <ChartWrapper title="Transaction Type" description="">
            <HorizontalBarChartComponent
              chartConfig={chartConfig}
              data={[
                { name: "Cash", value: 90, fill: "#DDF8E4" },
                { name: "Mortgage", value: 30, fill: "#EFEEFC" },
                { name: "Gifts", value: 20, fill: "#FFDBDB" },
              ]}
              xAxisDataKey={"name"}
              yAxisDataKey={"value"}
              className="max-h-[140px]"
            />
          </ChartWrapper> */}
          {/* <ChartWrapper
            title="Transactions Value Trend"
            description="Compare transactional total value and value per sqft over time."
            filters={["Total Value", "Value per SQFT"]}
          >
            <div className="flex flex-col gap-2">
              <Barchart
                chartConfig={chartConfig}
                data={sampleData1}
                xAxisDataKey={"year"}
                yAxisDataKeys={["value"]}
              />
              <InsightCard className="bg-purple-50">
                Lorem ipsum <span className="font-bold">4%</span> sit amet
                consectetur. Gravida augue aliquam interdum morbi eu elit. Neque
                <br />
                Average price: <span className="font-bold">750000.</span>
              </InsightCard>
            </div>
          </ChartWrapper>
          <ChartWrapper
            title="Sales Transactions Trend"
            description="Compare number of transactions over time!"
            filters={["Monthly", "Quarterly", "Yearly"]}
          >
            <div className="flex flex-col gap-2">
              <AreaChartComponent
                chartConfig={chartConfig}
                data={[
                  { month: "January", value1: 10 },
                  { month: "March", value1: 20 },
                  { month: "May", value1: 30 },
                  { month: "Jul", value1: 20 },
                  { month: "Sep", value1: 10 },
                  { month: "Dec", value1: 30 },
                ]}
                xAxisDataKey="month"
                areas={[{ yAxisDataKey: "value1" }]}
              />
              <InsightCard className="bg-purple-50">
                This type of properties has high demand in this area and demand
                is 10% higher than the overall Dubai overage.
              </InsightCard>
            </div>
          </ChartWrapper>

          <ChartWrapper
            title="Sales Index"
            description="This is overall sales value index in Dubai."
            viewAll={true}
          >
            <div className="flex flex-col gap-4">
              <SalesIndexCardComponent
                percentile25={247685}
                percentile75={566778}
              />
              <InsightCard className="bg-purple-50">
                Above chart indicates that most properties sold in Dubai ranges
                between 2.4 Million to 5.6 Million. Average price:{" "}
                <span className="font-bold">750000.</span>
              </InsightCard>
              <DonutChartComponent
                chartConfig={chartConfig2}
                data={data}
                dataKey="value"
                nameKey="name"
              />
            </div>
          </ChartWrapper>
          <ChartWrapper title="Similar Transactions" viewAll={true}>
            <SimilarTransaction
              columns={["Date", "Sell Price", "Area (ft)"]}
              data={[
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
                {
                  Date: "17/Jun/24",
                  "Sell Price": "750,000",
                  "Area (ft)": "494",
                },
              ]}
              headerText="Average sales price"
              headerValue={"2345678"}
            />
          </ChartWrapper>
          <ChartWrapper title="Price Comparison" viewAll={true}>
            <PriceChangesTable selectedRow={2} />
          </ChartWrapper>

          <ChartWrapper
            title="Sales segmentation"
            description="Compare sales segmentation across residential and commercial."
          >
            <div className="flex flex-col gap-2">
              <DonutChartComponent
                chartConfig={chartConfig3}
                data={[
                  {
                    name: "Residential",
                    value: 30,
                    colorClass: "bg-[#FFDBDB]",
                  },
                  { name: "Commercial", value: 20, colorClass: "bg-[#DDF8E4]" },
                ]}
                dataKey="value"
                nameKey="name"
              />
              <DashboardTabs />
            </div>
          </ChartWrapper> */}

          <Feedback />
        </div>
      </main>
    </SecondaryNavbar>
  );
}

export default MyPage;
