import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs as UnderlineTabs,
  TabsContent as UnderlineTabsContent,
  TabsList as UnderlineTabsList,
  TabsTrigger as UnderlineTabsTrigger,
} from "./ui/underline-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChartConfig } from "./ui/chart";
import AreaChartComponent from "./chart/areachart/area";
import InsightCard from "./insightCard";

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

const sampleData = [
  { month: 2014, value: 5 },
  { month: 2016, value: 11 },
  { month: 2018, value: 17 },
  { month: 2020, value: 12 },
  { month: 2022, value: 15 },
  { month: 2024, value: 7 },
];

function HomeSalesIndex() {
  return (
    <UnderlineTabs defaultValue="sales">
      <UnderlineTabsList className="w-full border border-border items-center justify-center rounded-t-xl gap-3 px-3">
        <UnderlineTabsTrigger
          value="sales"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Sales Price Index
        </UnderlineTabsTrigger>
        <UnderlineTabsTrigger
          value="rental"
          className="flex justify-center items-center gap-2 w-1/2"
        >
          Rental Price Index
        </UnderlineTabsTrigger>
      </UnderlineTabsList>
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col gap-3">
        <UnderlineTabsContent value="sales">
          {/* <CardHeader className="w-full p-0">
            <CardTitle className="text-sm font-semibold text-secondary">
              Dubai Sales Price Index
            </CardTitle>
            <CardDescription className="text-sm text-accent font-normal truncate">
              explore various Dubai price index here.
            </CardDescription>
          </CardHeader> */}
          <CardContent className="p-0 w-full ">
            <Tabs defaultValue="residential">
              <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                <TabsTrigger
                  value="residential"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Residential
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Commercial
                </TabsTrigger>
              </TabsList>
              <TabsContent value="residential" className="">
                <AreaChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  areas={[{ yAxisDataKey: "value" }]}
                  tickFormatter={(value) => value.toString()}
                />
              </TabsContent>
            </Tabs>
            <CardFooter className=" p-0 mt-3">
              <InsightCard linkText="Explore full market index here.">
                Dubai has seen commendable growth in sales value and sales
                volume over time, remarkable growth in 2024.
              </InsightCard>
            </CardFooter>
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          {/* <CardHeader className="w-full p-0">
            <CardTitle className="text-sm font-semibold text-secondary">
              Dubai Rental Price Index
            </CardTitle>
            <CardDescription className="text-sm text-accent font-normal truncate">
              explore various Dubai price index here.
            </CardDescription>
          </CardHeader> */}
          <CardContent className="p-0 w-full">
            <Tabs defaultValue="residential">
              <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                <TabsTrigger
                  value="residential"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Residential
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                >
                  Commercial
                </TabsTrigger>
              </TabsList>
              <TabsContent value="residential" className="">
                <AreaChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  areas={[{ yAxisDataKey: "value" }]}
                  tickFormatter={(value) => value.toString()}
                />
              </TabsContent>
            </Tabs>
            <CardFooter className=" p-0 mt-3">
              <InsightCard linkText="Explore full market index here.">
                Dubai has seen commendable growth in sales value and sales
                volume over time, remarkable growth in 2024.
              </InsightCard>
            </CardFooter>
          </CardContent>
        </UnderlineTabsContent>
      </Card>
    </UnderlineTabs>
  );
}

export default HomeSalesIndex;
