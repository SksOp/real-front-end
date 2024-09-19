import React from "react";
import {
  Card,
  CardContent,
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
  { month: 2014, value: 0.5 },
  { month: 2016, value: 1.1 },
  { month: 2018, value: 0.78 },
  { month: 2020, value: 1.02 },
  { month: 2022, value: 1.15 },
  { month: 2024, value: 0.7 },
];

function HomeSalesIndex() {
  return (
    <Card className="border-2 rounded-xl bg-background w-full p-0">
      <UnderlineTabs defaultValue="sales">
        <UnderlineTabsList className="w-full border-b-2 border-border items-center justify-start rounded-t-xl gap-3 px-4 pt-1">
          <UnderlineTabsTrigger value="sales" className=" ">
            Sales
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger value="rental">Rental</UnderlineTabsTrigger>
        </UnderlineTabsList>

        <UnderlineTabsContent value="sales">
          <CardHeader className="w-full p-4">
            <CardTitle className="text-base font-semibold text-secondary">
              Dubai Sales Price Index
            </CardTitle>
            <h3 className="text-sm text-muted-foreground font-light truncate">
              explore various Dubai price index here.
            </h3>
          </CardHeader>
          <CardContent className="px-3 py-0 pb-4 w-full">
            <Tabs defaultValue="residential">
              <TabsList className="w-full gap-3 overflow-scroll items-center justify-start bg-background mb-4">
                <TabsTrigger
                  value="residential"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  Residential
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  Commercial
                </TabsTrigger>
              </TabsList>
              <TabsContent value="residential" className="">
                <AreaChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  yAxisDataKey={"value"}
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
          <CardHeader className="w-full p-4">
            <CardTitle className="text-base font-semibold text-secondary">
              Dubai Rental Price Index
            </CardTitle>
            <h3 className="text-sm text-muted-foreground font-light truncate">
              explore various Dubai price index here.
            </h3>
          </CardHeader>
          <CardContent className="px-3 py-0 pb-4 w-full">
            <Tabs defaultValue="residential">
              <TabsList className="w-full gap-3 overflow-scroll items-center justify-start bg-background mb-4">
                <TabsTrigger
                  value="residential"
                  className="rounded-full border border-muted text-sm text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  Residential
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  className="rounded-full border border-muted text-sm text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  Commercial
                </TabsTrigger>
              </TabsList>
              <TabsContent value="residential" className="">
                <AreaChartComponent
                  chartConfig={chartConfig}
                  data={sampleData}
                  xAxisDataKey={"month"}
                  yAxisDataKey={"value"}
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
      </UnderlineTabs>
    </Card>
  );
}

export default HomeSalesIndex;
