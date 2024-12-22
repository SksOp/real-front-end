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
import { SalesTrend, SalesValueTrend } from "@/config/sales";
import { ChartDescription } from "@/config/types";
import ChartException from "./chartException";
import Barchart from "./chart/barchart/barchart";
import LoginTrigger from "./loginTrigger";
import { useAuth } from "@/lib/auth";
import EllipsisMenu from "./ellipsisMenu";

function HomeVolumeIndex() {
  const [volume, setVolume] = React.useState<ChartDescription>();
  const [value, setValue] = React.useState<ChartDescription>();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const presentYear = new Date().getFullYear();
      const params = {
        end_year: presentYear,
      };
      const response = await SalesTrend(params);
      const response2 = await SalesValueTrend(params);
      setVolume(response);
      setValue(response2);
      console.log(volume);
    };
    fetchData();
    console.log(volume);
  }, []);

  return (
    <UnderlineTabs defaultValue="volume">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl px-3 overflow-hidden">
        <UnderlineTabsList className="  items-center justify-center md:justify-start  gap-3 ">
          <UnderlineTabsTrigger
            value="volume"
            className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Transaction (Volume)
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger
            value="value"
            className="flex text-secondary text-sm  justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Transaction (Value)
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
        <UnderlineTabsContent value="volume">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Track the trends in transaction value and volume over time. Analyze
            market growth and activity patterns with year-on-year comparisons.
          </CardDescription>
          <CardContent className="p-0 w-full ">
            {volume ? (
              <Tabs
                defaultValue={
                  volume.filters ? volume?.filters[0]?.key : "total_value"
                }
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {volume.filters?.map((volume) => (
                    <TabsTrigger
                      key={volume.key}
                      value={volume.key}
                      className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                    >
                      {volume.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {volume.filters?.map((filter) => (
                  <TabsContent
                    key={filter.key}
                    value={filter.key}
                    className="overflow-x-scroll"
                  >
                    <AreaChartComponent
                      chartConfig={volume.chartConfig}
                      data={filter.data}
                      xAxisDataKey={"year"}
                      tickFormatter={(value) => value.toString()}
                      areas={[{ yAxisDataKey: "value1" }]}
                      className="min-w-full"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ChartException />
            )}
            <CardFooter className=" p-0 mt-3">
              <InsightCard linkText="Explore index.">
                Dubai’s real estate market has shown impressive growth since
                2014, with 2024 seeing the highest appreciation in property
                value.
              </InsightCard>
            </CardFooter>
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="value">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Track the trends in transaction value and volume over time. Analyze
            market growth and activity patterns with year-on-year comparisons.
          </CardDescription>
          <CardContent className="p-0 w-full">
            {value ? (
              <Tabs
                defaultValue={value.filters ? value.filters[0]?.key : "all"}
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {value.filters?.map((filter) => (
                    <TabsTrigger
                      value={filter.key}
                      className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                    >
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {value.filters?.map((filter) => (
                  <TabsContent
                    key={filter.key}
                    value={filter.key}
                    className="overflow-x-scroll"
                  >
                    <Barchart
                      chartConfig={value.chartConfig}
                      data={filter.data}
                      xAxisDataKey={"year"}
                      yAxisDataKeys={["value"]}
                      tickFormatter={(value) => value.toString()}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ChartException />
            )}
            <CardFooter className=" p-0 mt-3">
              <InsightCard linkText="Explore full market index here.">
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

export default HomeVolumeIndex;
