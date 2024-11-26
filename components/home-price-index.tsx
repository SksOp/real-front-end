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
import { SalesPriceComparison, SalesValueTrend } from "@/config/sales";
import { RentalComparison, RentalValueTrend } from "@/config/rental";
import { ChartDescription } from "@/config/types";
import ChartException from "./chartException";
import PriceChangesTable from "./price-changes-table";

function HomePriceIndex() {
  const [salesData, setSalesData] = React.useState<ChartDescription>();
  const [rentalData, setRentalData] = React.useState<ChartDescription>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await SalesPriceComparison();
      const response2 = await RentalComparison();
      setSalesData(response);
      setRentalData(response2);
      console.log(salesData);
    };
    fetchData();
    console.log(salesData);
  }, []);

  return (
    <UnderlineTabs defaultValue="sales">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl px-3">
        <UnderlineTabsList className=" flex  items-center justify-center md:justify-start  gap-3 ">
          <UnderlineTabsTrigger
            value="sales"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Sales Price Changes
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger
            value="rental"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Rental Price Changes
          </UnderlineTabsTrigger>
        </UnderlineTabsList>
        <div className="md:flex items-center hidden  justify-end gap-4 w-fit">
          <h3
            className="text-xs font-semibold text-primary cursor-pointer "
            onClick={() => router.push("/app/dashboard")}
          >
            View full list
          </h3>
        </div>
      </div>
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col gap-3">
        <UnderlineTabsContent value="sales">
          <CardDescription className="text-sm text-accent my-2 hidden md:block font-normal ">
            Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum
            morbi eu elit. Neque Average price: 750000. View more insights
          </CardDescription>
          <CardContent className="p-0 w-full ">
            {salesData ? (
              <Tabs
                defaultValue={
                  salesData.filters ? salesData?.filters[0].key : "total_value"
                }
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {salesData ? (
                    salesData.filters?.map((filter) => (
                      <TabsTrigger
                        value={filter.key}
                        className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                      >
                        {filter.label}
                      </TabsTrigger>
                    ))
                  ) : (
                    <ChartException />
                  )}
                </TabsList>
                {salesData.filters?.map((filter) => (
                  <TabsContent value={filter.key}>
                    <PriceChangesTable data={salesData.data} />
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
        <UnderlineTabsContent value="rental">
          <CardDescription className="text-sm text-accent my-2 hidden md:block font-normal ">
            Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum
            morbi eu elit. Neque Average price: 750000. View more insights
          </CardDescription>
          <CardContent className="p-0 w-full">
            {rentalData ? (
              <Tabs
                defaultValue={
                  rentalData.filters ? rentalData.filters[0].key : "all"
                }
              >
                <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll  mb-2">
                  {rentalData.filters?.map((filter) => (
                    <TabsTrigger
                      value={filter.key}
                      className="rounded-full border border-muted text-sm text-center font-normal text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                    >
                      {filter.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {rentalData ? (
                  rentalData.filters?.map((filter) => (
                    <TabsContent value={filter.key}>
                      <PriceChangesTable data={rentalData.data} />
                    </TabsContent>
                  ))
                ) : (
                  <ChartException />
                )}
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

export default HomePriceIndex;
