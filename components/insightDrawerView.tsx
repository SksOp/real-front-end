import { LightBulbIcon } from "@/public/svg/icons";
import React, { useEffect } from "react";
import ChartWrapper from "./chart/chartWrapper";
import TransactionTable from "./transactionTable";
import { ChartDescription, MatrixData } from "@/config/types";
import { BASE_URL } from "@/config/constant";
import { CalculateCharts, CalculateMatrix } from "@/config/utility";
import MatrixCard from "./matrix-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DashboardCharts from "./dashboard-charts";
import TransactionInsightsChart from "./transaction-insights-chart";
import TransactionFairPrice from "./transaction-fairPrice";

function InsightDrawerView({
  location_name,
  priceperSqft,
}: {
  location_name: string;
  priceperSqft?: number;
}) {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("sales");
  const [salesMatrix, setSalesMatrix] = React.useState<MatrixData[]>([]);
  const [rentalMatrix, setRentalMatrix] = React.useState<MatrixData[]>([]);
  const [chartDataSales, setChartDataSales] = React.useState<
    ChartDescription[]
  >([]);
  const [chartDataRental, setChartDataRental] = React.useState<
    ChartDescription[]
  >([]);

  const getAllChartData = async () => {
    const year = new Date().getFullYear();
    let params = { end_year: year, location: location_name };
    const allChartsSales = await CalculateCharts("sales", params);
    const allChartsRental = await CalculateCharts("rental", params);

    allChartsSales.shift();
    allChartsRental.shift();

    allChartsSales.forEach((chart) => {
      chart.sub_charts = [];
      chart.filters = [];
    });
    allChartsRental.forEach((chart) => {
      chart.sub_charts = [];
      chart.filters = [];
    });

    setChartDataSales(allChartsSales);
    setChartDataRental(allChartsRental);
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const date = new Date();
      const presentYear = date.getFullYear();

      // Fetch Sales Matrix Data
      const sourceURLSales = `${BASE_URL}/api/transaction/trends?start_year=${
        presentYear - 1
      }&end_year=${presentYear}&location=${location_name}`;
      const matrixOutputSales = await CalculateMatrix(sourceURLSales, "sales");
      setSalesMatrix(matrixOutputSales);

      // Fetch Rental Matrix Data
      const sourceURLRental = `${BASE_URL}/api/rental/average?start_year=${
        presentYear - 1
      }&end_year=${presentYear}&location=${location_name}`;
      const matrixOutputRental = await CalculateMatrix(
        sourceURLRental,
        "rental"
      );
      setRentalMatrix(matrixOutputRental);
    };

    fetchChartData();
    getAllChartData();
  }, [location_name]);

  const currentChartData =
    selectedFilter === "sales" ? chartDataSales : chartDataRental;

  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-start justify-start gap-2">
        <LightBulbIcon className="w-8 h-8" />
        <h3 className="text-secondary text-base font-semibold">
          Insights of {location_name}
        </h3>
      </div>

      <ChartWrapper title="Similar Transaction Rules">
        <Tabs
          value={selectedFilter}
          onValueChange={(value: string) => setSelectedFilter(value)}
        >
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll">
            <TabsTrigger
              value="sales"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Rental
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="w-full flex">
            <div className="grid grid-cols-2 gap-3 w-full">
              {salesMatrix.map((item, index) => (
                <MatrixCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  growth={item.growth}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="rental" className="w-full flex mt-0">
            <div className="grid grid-cols-2 gap-3 w-full">
              {rentalMatrix.map((item, index) => (
                <MatrixCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  growth={item.growth}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ChartWrapper>

      <TransactionFairPrice priceperSqft={priceperSqft} />

      {currentChartData.map((chart, index) => (
        <TransactionInsightsChart
          key={index}
          dashboardType={selectedFilter as "sales" | "rental"}
          type={chart.chart_type}
          title={chart.name}
          chartConfig={chart.chartConfig}
          data={chart.data}
          columns={chart.columns}
          description={chart.description}
          otherInfo={chart.otherInfo}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      ))}
    </div>
  );
}

export default InsightDrawerView;
