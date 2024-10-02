"use client";
import AreaChartComponent from "@/components/chart/areachart/area";
import Barchart from "@/components/chart/barchart/barchart";
import ChartWrapper from "@/components/chart/chartWrapper";
import HorizontalBarChartComponent from "@/components/chart/horizontalbarchart/horizontalbarchart";
import LineChartComponent from "@/components/chart/lineChart/lineChart";
import PieChartComponent from "@/components/chart/piechart/piechart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import DashboardTabs from "@/components/dashboard-tabs";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import HomeTransactionCard from "@/components/home-transaction-card";
import InsightCard from "@/components/insightCard";
import MatrixCard from "@/components/matrix-card";
import PriceChangesTable from "@/components/price-changes-table";
import Progressbar from "@/components/progressbar";
import SecondaryNavbar from "@/components/secondaryNavbar";
import SimilarTransaction from "@/components/similar-transaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import Layout from "@/layout";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

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

const dashboardData = [
  {
    id: 1,
    title: "Sales Transactions Overview",
    description:
      "Analyze sales transactions, values, and trends across the Dubai property market.",
  },
  {
    id: 2,
    title: "Mortgage Transactions Analysis",
    description:
      "Insights into property purchases made using mortgage financing trends and details.",
  },
  {
    id: 3,
    title: "Gift Transactions Insights",
    description:
      "Track and analyze property transactions gifted, highlighting market behavior and trends.",
  },
  {
    id: 4,
    title: "Overall Market Transactions",
    description:
      "Comprehensive overview of all sales, mortgages, and gift property transactions.",
  },
  {
    id: 5,
    title: "Residential Sales Breakdown",
    description:
      "Analysis of residential property sales, including pricing, volumes, and market activity.",
  },
  {
    id: 6,
    title: "Commercial Sales Overview",
    description:
      "Track and analyze sales in the commercial property sector including offices and shops.",
  },
  {
    id: 7,
    title: "Rental Market Trends",
    description:
      "Overview of rental transactions and trends, showing market performance across Dubai.",
  },
  {
    id: 8,
    title: "Residential Rentals Analysis",
    description:
      "In-depth look into rental transactions for residential properties, including rates and trends.",
  },
  {
    id: 9,
    title: "Commercial Rentals Overview",
    description:
      "Analysis of commercial property rentals including warehouses, offices, and retail units.",
  },
  {
    id: 10,
    title: "Developer Sales Comparison",
    description:
      "Compare sales performance among Dubai's leading property developers.",
  },
  {
    id: 11,
    title: "Residential Index Overview",
    description:
      "Key metrics and index to track trends in residential property sales and rentals.",
  },
  {
    id: 12,
    title: "Commercial Index Overview",
    description:
      "Commercial property index tracking trends and performance across different sectors and areas.",
  },
  {
    id: 13,
    title: "Annual Performance Summary",
    description:
      "Annual overview of market performance, transactions, growth, and other vital metrics.",
  },
  {
    id: 14,
    title: "Supply Trends Dashboard",
    description:
      "Insights on property supply, including available inventory across various Dubai areas.",
  },
  {
    id: 15,
    title: "Top Performing Areas",
    description:
      "Discover high-performing areas based on transactions, demand, and property trends.",
  },
  {
    id: 16,
    title: "Offplan Market Insights",
    description:
      "Analysis of offplan property sales trends, developer performance, and future inventory.",
  },
];

function MyPage() {
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);

    if (!isNaN(id)) {
      setDashboardId(id);
    }
  }, [pathname]);

  const dashboard = dashboardData.find((item) => item.id === dashboardId);

  const matrixData = [
    { title: "Average Rental Value", value: "120 K", growth: -21 },
    { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
    { title: "Total Value", value: "165 K", growth: 21 },
    { title: "No of Transactions", value: "20", growth: -21 },
  ];

  return (
    <SecondaryNavbar title={dashboard?.title ?? ""} className="sticky">
      <Filters />
      {/* <Progressbar target={navRef} className="top-12" /> */}
      <main ref={navRef}>
        <div className="bg-gradient-to-b from-background to-[#FAFAFA] px-3 mb-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            {matrixData.map((item, index) => (
              <MatrixCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
              />
            ))}
          </div>
          <ChartWrapper title="Transaction Type" description="">
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
          </ChartWrapper>
          <ChartWrapper
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
                yAxisDataKey="value1"
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
              <PieChartComponent
                chartConfig={chartConfig2}
                data={data}
                dataKey="value"
                nameKey="name"
              />
            </div>
          </ChartWrapper>
          <ChartWrapper title="Similar Transactions" viewAll={true}>
            <SimilarTransaction />
          </ChartWrapper>
          <ChartWrapper title="Price Comparison" viewAll={true}>
            <PriceChangesTable selectedRow={2} />
          </ChartWrapper>

          <ChartWrapper
            title="Sales segmentation"
            description="Compare sales segmentation across residential and commercial."
          >
            <div className="flex flex-col gap-2">
              <PieChartComponent
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
          </ChartWrapper>

          <Feedback />
        </div>
      </main>
    </SecondaryNavbar>
  );
}

export default MyPage;
