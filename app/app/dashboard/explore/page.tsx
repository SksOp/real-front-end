"use client";
import DashboardData from "@/components/all-dashboard-data";
import CalculatorInputs from "@/components/calculator-inputs";
import ChartWrapper from "@/components/chart/chartWrapper";
import DonutChartComponent from "@/components/chart/donutChart/donutChart";
import SalesIndexCardComponent from "@/components/chart/salesIndexcard/salesIndexcard";
import ChartException from "@/components/chartException";
import DashboardCharts from "@/components/dashboard-charts";
import DashboardSelector from "@/components/dashboard-selector";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import InsightCard from "@/components/insightCard";
import MatrixCard from "@/components/matrix-card";
import SecondaryChartWrapper from "@/components/secondaryChartWrapper";
import SharingCard from "@/components/sharingCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs } from "@/components/ui/tabs";
import { BASE_URL } from "@/config/constant";
import {
  ExploreFilterOptionsRental,
  ExploreFilterOptionsSales,
} from "@/config/filters";
import { ChartDescription, MatrixData } from "@/config/types";
import { CalculateCharts, CalculateMatrix } from "@/config/utility";
import Layout from "@/layout/secondary";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

function ExplorePage() {
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("input");
  const [inputValues, setInputValues] = useState<{
    [key: string]: any;
  }>({});
  const [filters, setFilters] = useState<{ [key: string]: string | number }>(
    {}
  );
  const [matrixData, setMatrixData] = useState<MatrixData[] | undefined>(
    undefined
  );
  const [charts, setCharts] = useState<ChartDescription[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (key: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleFilterChange(key, value);
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
    console.log("filters", filters);
  };

  const calculateMatrix = async (
    transaction_type: "sales" | "rental",
    subPath: string,
    params?: { [key: string]: string | number }
  ) => {
    const type = transaction_type === "sales" ? "transaction" : "rental";
    const sourceURL = `${BASE_URL}/api/${type}/${subPath}`;
    const matrixOutput = await CalculateMatrix(
      sourceURL,
      transaction_type,
      params
    );
    if (Array.isArray(matrixOutput) && matrixOutput.length > 0) {
      setMatrixData(matrixOutput);
    }
    console.log("maaatrrr ", matrixOutput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transaction_type =
        inputValues.transaction_type === "Sales" ? "sales" : "rental";
      const subPath =
        inputValues.transaction_type === "Sales" ? "trends" : "average";
      const date = new Date();
      if (filters && !filters?.end_year) filters.end_year = date.getFullYear();
      await calculateMatrix(transaction_type, subPath, filters);

      const allCharts = await CalculateCharts(transaction_type, filters);
      setCharts(allCharts);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  const handleCalculate = async (params: {
    [key: string]: string | number;
  }) => {
    console.log(inputValues);
    const transaction_type =
      inputValues.transaction_type === "Sales" ? "sales" : "rental";
    const subPath =
      inputValues.transaction_type === "Sales" ? "trends" : "average";

    await calculateMatrix(transaction_type, subPath);
    const allCharts = await CalculateCharts(transaction_type, params);
    setCharts(allCharts);
    setShowOutput(true);
    setActiveAccordion("output");
  };

  const handleClearAll = () => {
    setInputValues({ transaction_type: "", usage: "" });
    setFilters({});
  };

  return (
    <Layout page="dashboards" title={"Explore"}>
      <div className="w-full p-4 pt-12  md:hidden">
        {!showOutput && (
          <div className="flex flex-col items-start justify-center gap-5 w-full">
            <h3 className="text-muted-foreground font-normal text-sm">
              Explore rental market or sales market in the UAE from the data
              perspective.
            </h3>

            <CalculatorInputs
              uniqueKey="transaction_type"
              type="radio"
              title="Transaction Type"
              options={["Sales", "Rental"]}
              is_mandatory={true}
              value={inputValues.transaction_type}
              onChange={(value) => handleInputChange("transaction_type", value)}
            />

            {inputValues.transaction_type === "Sales" &&
              ExploreFilterOptionsSales.map((filter, index) => (
                <CalculatorInputs
                  key={index}
                  uniqueKey={filter.key}
                  type={filter.type || "dropdown"}
                  title={filter.label}
                  options={filter.options}
                  source={filter.source}
                  is_mandatory={false}
                  searchable={filter.searchable}
                  value={inputValues[filter.key]}
                  onChange={(value) => handleInputChange(filter.key, value)}
                />
              ))}
            {inputValues.transaction_type === "Rental" &&
              ExploreFilterOptionsRental.map((filter, index) => (
                <CalculatorInputs
                  key={index}
                  uniqueKey={filter.key}
                  type={filter.type || "dropdown"}
                  title={filter.label}
                  options={filter.options}
                  source={filter.source}
                  is_mandatory={false}
                  searchable={filter.searchable}
                  value={inputValues[filter.key]}
                  onChange={(value) => handleInputChange(filter.key, value)}
                />
              ))}

            <div className="w-full flex justify-between gap-4 items-center  pt-4">
              <Button
                variant={"outline"}
                className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-full h-14 rounded-xl border"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
              <Button
                variant={"secondary"}
                className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-xl border"
                onClick={() => handleCalculate(filters)}
              >
                Explore
              </Button>
            </div>
          </div>
        )}
        {showOutput && (
          <div className="flex flex-col items-start justify-center gap-4 w-full">
            <Filters
              selectOptions={
                inputValues.transaction_type === "Sales"
                  ? ExploreFilterOptionsSales
                  : ExploreFilterOptionsRental || []
              }
              selectedFilters={filters}
              onChange={handleFilterChange}
            />
            {loading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
                <div className="ml-2">Loading...</div>
              </div>
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
                      inputValues.transaction_type === "Sales"
                        ? "sales"
                        : "rental"
                    }
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
              </>
            )}
          </div>
        )}
      </div>

      <div className="md:flex w-full justify-between hidden ">
        <Tabs defaultValue={"standard"} className="flex flex-col w-full px-2">
          <div className="flex w-full items-center justify-center gap-5 pt-20 pb-2">
            <DashboardSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <DashboardData />
            </div>
            <div className="md:flex md:flex-col md:w-2/3 hidden flex-grow items-center justify-start gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              {!showOutput && (
                <div className="flex flex-col items-start justify-center gap-5 w-full">
                  <h3 className="text-muted-foreground font-normal text-sm">
                    Explore rental market or sales market in the UAE from the
                    data perspective.
                  </h3>
                  <CalculatorInputs
                    uniqueKey="transaction_type"
                    type="radio"
                    title="Transaction Type"
                    options={["Sales", "Rental"]}
                    is_mandatory={true}
                    value={inputValues.transaction_type}
                    onChange={(value) =>
                      handleInputChange("transaction_type", value)
                    }
                  />

                  {inputValues.transaction_type === "Sales" &&
                    ExploreFilterOptionsSales.map((filter, index) => (
                      <CalculatorInputs
                        key={index}
                        uniqueKey={filter.key}
                        type={filter.type || "dropdown"}
                        title={filter.label}
                        options={filter.options}
                        source={filter.source}
                        is_mandatory={false}
                        searchable={filter.searchable}
                        value={inputValues[filter.key]}
                        onChange={(value) =>
                          handleInputChange(filter.key, value)
                        }
                      />
                    ))}
                  {inputValues.transaction_type === "Rental" &&
                    ExploreFilterOptionsRental.map((filter, index) => (
                      <CalculatorInputs
                        key={index}
                        uniqueKey={filter.key}
                        type={filter.type || "dropdown"}
                        title={filter.label}
                        options={filter.options}
                        source={filter.source}
                        is_mandatory={false}
                        searchable={filter.searchable}
                        value={inputValues[filter.key]}
                        onChange={(value) =>
                          handleInputChange(filter.key, value)
                        }
                      />
                    ))}

                  <div className="w-full flex justify-end items-center gap-4 pt-4">
                    <Button
                      variant={"outline"}
                      className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-1/6 h-14 rounded-xl border"
                      onClick={handleClearAll}
                    >
                      Clear All
                    </Button>
                    <Button
                      variant={"secondary"}
                      className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-1/6 h-14 rounded-xl border"
                      onClick={() => handleCalculate(filters)}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              )}

              {showOutput && (
                <div className="flex flex-col items-start justify-center gap-4 w-full">
                  <Filters
                    selectOptions={
                      inputValues.transaction_type === "Sales"
                        ? ExploreFilterOptionsSales
                        : ExploreFilterOptionsRental || []
                    }
                    selectedFilters={filters}
                    onChange={handleFilterChange}
                  />
                  {loading ? (
                    <div className="flex h-full w-full  items-center justify-center">
                      <Spinner />
                      <div className="ml-2">Loading...</div>
                    </div>
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

                      <div className="grid grid-cols-2 gap-4  justify-items-center w-full">
                        {charts?.map((chart, index) =>
                          index === 3 ? (
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
                                      knob={(chart.data[0] + chart.data[1]) / 2}
                                    />
                                    <InsightCard>{chart.insights}</InsightCard>
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
                                inputValues.transaction_type === "Sales"
                                  ? "sales"
                                  : "rental"
                              }
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
                              className={cn(
                                "",
                                (index === 0 || index === 6) && "col-span-2"
                              )}
                            />
                          )
                        )}{" "}
                        <Feedback />
                        <SharingCard />
                      </div>
                    </>
                  )}
                </div>
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

export default ExplorePage;
