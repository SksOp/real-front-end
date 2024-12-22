import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import {
  HamburgerIcon,
  HorizontalDotsIcon,
  VerticalThreeDots,
} from "@/public/svg/icons";
import { SalesValueTrend } from "@/config/sales";
import { RentalValueTrend } from "@/config/rental";
import { ChartDescription, MatrixData } from "@/config/types";
import ChartException from "./chartException";
import { SalesIndexMatrices } from "@/config/sales_index";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";
import EllipsisMenu from "./ellipsisMenu";

function HomeSalesIndex() {
  const [salesIndex, setSalesIndex] = React.useState<ChartDescription>();
  const [salesValue, setSalesValue] = React.useState<ChartDescription>();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      const response = (await SalesIndexMatrices[0].calculate_charts?.calculate(
        params
      )) as ChartDescription;
      const response2 =
        (await SalesIndexMatrices[1].calculate_charts?.calculate(
          params
        )) as ChartDescription;
      console.log(response);
      setSalesIndex(response);
      setSalesValue(response2);
      console.log(salesIndex);
    };
    fetchData();
    console.log(salesIndex);
  }, []);

  return (
    <UnderlineTabs defaultValue="index">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl px-3 overflow-hidden">
        <UnderlineTabsList className=" flex  items-center justify-center md:justify-start gap-3 ">
          <UnderlineTabsTrigger
            value="index"
            className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Sales Index
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger
            value="value"
            className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Sales Value
          </UnderlineTabsTrigger>
        </UnderlineTabsList>
        <div className="md:flex items-center hidden  justify-end gap-4 w-fit">
          {auth.user ? (
            <h3
              className="text-sm font-semibold text-primary cursor-pointer"
              onClick={() => router.push("/app/dashboard")}
            >
              View All
            </h3>
          ) : (
            <LoginTrigger>
              <h3 className="text-sm font-semibold text-primary cursor-pointer">
                View All
              </h3>
            </LoginTrigger>
          )}
          <EllipsisMenu />
        </div>
      </div>
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col gap-3">
        <UnderlineTabsContent value="index">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Explore the official sales index and value trends, developed by DLD
            and PropertyFinder. Base year 2012, powered by advanced statistical
            and ML methodologies.
          </CardDescription>
          <CardContent className="p-0 w-full ">
            {salesIndex ? (
              <Tabs
                defaultValue={
                  salesIndex.filters
                    ? salesIndex?.filters[0]?.key
                    : "total_value"
                }
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {salesIndex.filters?.map((filter) => (
                    <TabsTrigger
                      key={filter.key}
                      value={filter.key}
                      className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                    >
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {salesIndex.filters?.map((filter) => (
                  <TabsContent
                    key={filter.key}
                    value={filter.key}
                    className="overflow-x-scroll"
                  >
                    <AreaChartComponent
                      key={filter.key}
                      chartConfig={salesIndex.chartConfig}
                      data={filter.data}
                      xAxisDataKey={"year"}
                      areas={[{ yAxisDataKey: "value1" }]}
                      tickFormatter={(value) => value.toString()}
                      className="min-w-full"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ChartException />
            )}
            <CardFooter className=" p-0 mt-3">
              <InsightCard>
                Dubai’s real estate market has shown impressive growth since
                2014, with 2024 seeing the highest appreciation in property
                value.
              </InsightCard>
            </CardFooter>
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="value">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Explore the official sales index and value trends, developed by DLD
            and PropertyFinder. Base year 2012, powered by advanced statistical
            and ML methodologies.
          </CardDescription>
          <CardContent className="p-0 w-full">
            {salesValue ? (
              <Tabs
                defaultValue={
                  salesValue.filters ? salesValue.filters[0]?.key : "all"
                }
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {salesValue.filters?.map((filter) => (
                    <TabsTrigger
                      key={filter.key}
                      value={filter.key}
                      className="rounded-full border border-muted text-sm text-center font-normal text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                    >
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {salesValue.filters?.map((filter) => (
                  <TabsContent
                    key={filter.key}
                    value={filter.key}
                    className="overflow-x-scroll"
                  >
                    <AreaChartComponent
                      key={filter.key}
                      chartConfig={salesValue.chartConfig}
                      data={filter.data}
                      xAxisDataKey={"year"}
                      areas={[{ yAxisDataKey: "value1" }]}
                      tickFormatter={(value) => value.toString()}
                      className="min-w-full"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ChartException />
            )}
            <CardFooter className=" p-0 mt-3">
              <InsightCard>
                Dubai’s real estate market has shown impressive growth since
                2014, with 2024 seeing the highest appreciation in property
                value.
              </InsightCard>
            </CardFooter>
          </CardContent>
        </UnderlineTabsContent>
      </Card>
    </UnderlineTabs>
  );
}

export default HomeSalesIndex;
