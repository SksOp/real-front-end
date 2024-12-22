import { LightBulbIcon } from "@/public/svg/icons";
import React, { useEffect } from "react";
import ChartWrapper from "./chart/chartWrapper";
import TransactionTable from "./transactionTable";
import { ChartDescription, MatrixData } from "@/config/types";
import { BASE_URL } from "@/config/constant";
import { CalculateCharts, RentalMatrix, SalesMatrix } from "@/config/utility";
import MatrixCard from "./matrix-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DashboardCharts from "./dashboard-charts";
import TransactionInsightsChart from "./transaction-insights-chart";
import TransactionFairPrice from "./transaction-fairPrice";
import LoadingWidget from "./loadingWidget";
import { Spinner } from "./ui/spinner";
import MatrixSkeleton from "./matrixSkeleton";
import {
  getRentalMatrix,
  getSalesMatrix,
} from "@/repository/tanstack/queries/matrices.queries";
import {
  RentalApiResponse,
  SalesApiResponse,
} from "@/types/apiResponses/matrices";

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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const {
    data: SalesTransactions,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    location: location_name,
  });

  const {
    data: rentalTransactions,
    isLoading: isRentalLoading,
    isError: isRentalError,
  } = getRentalMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    location: location_name,
  });

  const getAllChartData = async () => {
    const year = new Date().getFullYear();
    let params = { end_year: year, location: location_name };
    const allChartsSales = await CalculateCharts("sales", params);
    const allChartsRental = await CalculateCharts("rental", params);

    allChartsSales.shift();
    allChartsRental.shift();

    allChartsSales.forEach((chart) => {
      chart.filters = [];
    });
    allChartsRental.forEach((chart) => {
      chart.filters = [];
    });

    setChartDataSales(allChartsSales);
    setChartDataRental(allChartsRental);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getAllChartData();
      setIsLoading(false);
    };

    if (SalesTransactions && rentalTransactions) {
      const matrixOutputSales = SalesMatrix(
        SalesTransactions as SalesApiResponse
      );
      setSalesMatrix(matrixOutputSales);
    }
    if (rentalTransactions) {
      const matrixOutputRental = RentalMatrix(
        rentalTransactions as RentalApiResponse
      );
      setRentalMatrix(matrixOutputRental);
    }

    loadData();
  }, [location_name]);

  const currentChartData =
    selectedFilter === "sales" ? chartDataSales : chartDataRental;

  return (
    <div className="py-4 px-3 flex flex-col gap-4 overflow-y-auto">
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <MatrixSkeleton key={index} />
                  ))
                : salesMatrix.map((item, index) => (
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <MatrixSkeleton key={index} />
                  ))
                : rentalMatrix.map((item, index) => (
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

      {isLoading ? (
        <div className="flex  items-center justify-center">
          <Spinner />
          <div className="ml-2">Loading...</div>
        </div>
      ) : (
        currentChartData.map((chart, index) => (
          <TransactionInsightsChart
            key={index}
            dashboardType={selectedFilter as "sales" | "rental"}
            type={chart.chart_type}
            title={chart.name}
            chartConfig={chart.chartConfig}
            data={chart.data}
            subcharts={chart.sub_charts}
            columns={chart.columns}
            description={chart.description}
            insights={chart.insights}
            otherInfo={chart.otherInfo}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        ))
      )}
    </div>
  );
}

export default InsightDrawerView;
