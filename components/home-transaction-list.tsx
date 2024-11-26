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
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import TransactionCard from "./transaction-card";

function HomeTransactionList() {
  const [salesData, setSalesData] = React.useState<any[]>([]);
  const [rentalData, setRentalData] = React.useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await SalesTransactionApi();
      const response2 = await RentalTransactionApi();
      setSalesData(response.transactions);
      setRentalData(response2.transactions);
      console.log(salesData);
    };
    fetchData();
    console.log(salesData);
  }, []);

  return (
    <UnderlineTabs defaultValue="sales">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl px-3 ">
        <UnderlineTabsList className=" flex  items-center justify-center md:justify-start  gap-3 ">
          <UnderlineTabsTrigger
            value="sales"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Sales
          </UnderlineTabsTrigger>
          <UnderlineTabsTrigger
            value="rental"
            className="flex text-secondary text-sm font-semibold justify-center items-center gap-2 w-1/2 md:w-fit translate-y-0.5"
          >
            Rental
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
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col overflow-y-auto shrink gap-3">
        <UnderlineTabsContent value="sales">
          <CardDescription className="text-sm text-accent my-2 hidden md:block font-normal ">
            Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum
            morbi eu elit. Neque Average price: 750000. View more insights
          </CardDescription>
          <CardContent className="p-0 w-full flex flex-col gap-3">
            {salesData?.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          <CardDescription className="text-sm text-accent my-2 hidden md:block font-normal ">
            Lorem ipsum 4% sit amet consectetur. Gravida augue aliquam interdum
            morbi eu elit. Neque Average price: 750000. View more insights
          </CardDescription>
          <CardContent className="p-0 w-full flex flex-col gap-3">
            {rentalData?.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </CardContent>
        </UnderlineTabsContent>
      </Card>
    </UnderlineTabs>
  );
}

export default HomeTransactionList;
