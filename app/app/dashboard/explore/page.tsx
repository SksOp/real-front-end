"use client";
import DashboardData from "@/components/all-dashboard-data";
import CalculatorInputs from "@/components/calculator-inputs";
import ChartException from "@/components/chartException";
import DashboardCharts from "@/components/dashboard-charts";
import DashboardSelector from "@/components/dashboard-selector";
import Feedback from "@/components/feedback";
import Filters from "@/components/filters";
import MatrixCard from "@/components/matrix-card";
import SharingCard from "@/components/sharingCard";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { BASE_URL } from "@/config/constant";
import { dashboards } from "@/config/dashboards";
import { ChartDescription, Dashboard, MatrixData } from "@/config/types";
import { CalculateCharts, CalculateMatrix } from "@/config/utility";
import Layout from "@/layout/secondary";
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
    const date = new Date();
    const presentYear = date.getFullYear();
    const type = transaction_type === "sales" ? "transaction" : "rental";
    const sourceURL = `${BASE_URL}/api/${type}/${subPath}?start_year=${
      presentYear - 1
    }&end_year=${presentYear}`;

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
            <CalculatorInputs
              uniqueKey="usage"
              type="radio"
              title="Usage"
              options={["Residential", "Commercial", "All"]}
              is_mandatory={true}
              value={inputValues.usage}
              onChange={(value) => handleInputChange("usage", value)}
            />

            {inputValues.transaction_type === "Sales" && (
              <CalculatorInputs
                uniqueKey="sale_type"
                type="radio"
                title="Sale type"
                options={["cash", "gift", "mortgage"]}
                is_mandatory={true}
                value={inputValues.sale_type}
                onChange={(value) => handleInputChange("sale_type", value)}
              />
            )}
            {inputValues.transaction_type === "Rental" && (
              <CalculatorInputs
                uniqueKey="rental_type"
                type="radio"
                title="Rental type"
                options={["First Sale", "Resale", "All"]}
                is_mandatory={true}
                value={inputValues.rental_type}
                onChange={(value) => handleInputChange("rental_type", value)}
              />
            )}

            <CalculatorInputs
              uniqueKey="area"
              type="dropdown"
              title="Area"
              options={["1", "2", "3"]}
              is_mandatory={true}
              value={inputValues.area}
              onChange={(value) => handleInputChange("area", value)}
            />

            <CalculatorInputs
              uniqueKey="property_type"
              type="dropdown"
              title="Property Type"
              options={["Unit", "Villa", "Apartment", "Building"]}
              is_mandatory={true}
              value={inputValues.property_type}
              onChange={(value) => handleInputChange("property_type", value)}
            />

            <div className="w-full flex justify-end items-center pt-4">
              <Button
                variant={"outline"}
                className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-full h-14 rounded-xl border"
                // onClick={}
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
              selectOptions={dashboards[0]?.page_filters || []}
              selectedFilters={filters}
              onChange={handleFilterChange}
            />
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
          </div>
        )}
      </div>

      <div className="md:flex w-full justify-between hidden ">
        <Tabs
          defaultValue={"all-dashboards"}
          className="flex flex-col w-full px-2"
        >
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
                  <CalculatorInputs
                    uniqueKey="usage"
                    type="radio"
                    title="Usage"
                    options={["Residential", "Commercial", "All"]}
                    is_mandatory={true}
                    value={inputValues.usage}
                    onChange={(value) => handleInputChange("usage", value)}
                  />

                  {inputValues.transaction_type === "Sales" && (
                    <CalculatorInputs
                      uniqueKey="sale_type"
                      type="radio"
                      title="Sale type"
                      options={["cash", "gift", "mortgage"]}
                      is_mandatory={true}
                      value={inputValues.sale_type}
                      onChange={(value) =>
                        handleInputChange("sale_type", value)
                      }
                    />
                  )}
                  {inputValues.transaction_type === "Rental" && (
                    <CalculatorInputs
                      uniqueKey="rental_type"
                      type="radio"
                      title="Rental type"
                      options={["First Sale", "Resale", "All"]}
                      is_mandatory={true}
                      value={inputValues.rental_type}
                      onChange={(value) =>
                        handleInputChange("rental_type", value)
                      }
                    />
                  )}

                  <CalculatorInputs
                    uniqueKey="rooms"
                    type="dropdown"
                    title="No. of Rooms"
                    options={["1", "2", "3"]}
                    is_mandatory={true}
                    value={inputValues.rooms}
                    onChange={(value) => handleInputChange("rooms", value)}
                  />

                  <CalculatorInputs
                    uniqueKey="property_type"
                    type="dropdown"
                    title="Property Type"
                    options={["Unit", "Villa", "Apartment", "Building"]}
                    is_mandatory={true}
                    value={inputValues.property_type}
                    onChange={(value) =>
                      handleInputChange("property_type", value)
                    }
                  />

                  <div className="w-full flex justify-end items-center gap-4 pt-4">
                    <Button
                      variant={"outline"}
                      className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-1/6 h-14 rounded-xl border"
                      // onClick={}
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
                    selectOptions={dashboards[0]?.page_filters || []}
                    selectedFilters={filters}
                    onChange={handleFilterChange}
                  />
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
                          arr.length % 2 !== 0 && index === 2
                            ? "col-span-2"
                            : ""
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
