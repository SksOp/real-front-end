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
import InsightCard from "./insightCard";
import { useRouter } from "next/navigation";
import { SalesPriceComparison, SalesValueTrend } from "@/config/sales";
import { RentalComparison, RentalValueTrend } from "@/config/rental";
import { ChartDescription } from "@/config/types";
import ChartException from "./chartException";
import PriceChangesTable from "./price-changes-table";
import { MarketPulseApi } from "@/config/utility";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";

function HomePriceIndex() {
  const [salesData, setSalesData] = React.useState<any[]>([]);
  const [rentalData, setRentalData] = React.useState<ChartDescription>();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await MarketPulseApi();
      const tableData = response.map((item: any) => {
        return {
          name: item.area_name,
          avgPrice: item.avg_price,
          pricePerSqFt: item.avg_price_per_sqft,
          transactions: item.no_of_transactions,
        };
      });
      tableData.pop();
      setSalesData(tableData);
      console.log(response);
    };
    fetchData();
    console.log(salesData);
  }, []);

  return (
    <UnderlineTabs defaultValue="sales">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl overflow-hidden px-3">
        <UnderlineTabsList className=" flex  items-center justify-center md:justify-start  gap-3 ">
          <UnderlineTabsTrigger
            value="sales"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Sales Price Changes
          </UnderlineTabsTrigger>
          {/* <UnderlineTabsTrigger
            value="rental"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Rental Price Changes
          </UnderlineTabsTrigger> */}
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
        </div>
      </div>
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col gap-3">
        <UnderlineTabsContent value="sales">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Explore average prices, price per sqft, and transaction volumes for
            sales and rentals. Track growth trends to stay ahead of market
            shifts and identify lucrative opportunities.
          </CardDescription>
          <CardContent className="p-0 w-full ">
            {salesData ? (
              <PriceChangesTable data={salesData} />
            ) : (
              <ChartException />
            )}
            {/* <CardFooter className=" p-0 mt-3">
              <InsightCard>
                Dubai’s real estate market has shown impressive growth since
                2014, with 2024 seeing the highest appreciation in property
                value.
              </InsightCard>
            </CardFooter> */}
          </CardContent>
        </UnderlineTabsContent>
        {/* <UnderlineTabsContent value="rental">
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
                      key={filter.key}
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
        </UnderlineTabsContent> */}
      </Card>
    </UnderlineTabs>
  );
}

export default HomePriceIndex;
