import React, { useEffect } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import {
  Tabs as UnderlineTabs,
  TabsContent as UnderlineTabsContent,
  TabsList as UnderlineTabsList,
  TabsTrigger as UnderlineTabsTrigger,
} from "./ui/underline-tabs";
import { useRouter } from "next/navigation";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import TransactionCard from "./transaction-card";
import LoginTrigger from "./loginTrigger";
import { useAuth } from "@/lib/auth";

function HomeTransactionList() {
  const [salesData, setSalesData] = React.useState<any[]>([]);
  const [rentalData, setRentalData] = React.useState<any[]>([]);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await SalesTransactionApi();
      const response2 = await RentalTransactionApi();
      response.transactions.pop();
      response2.transactions.pop();
      setSalesData(response.transactions);
      setRentalData(response2.transactions);

      console.log(salesData);
    };
    fetchData();
    console.log(salesData);
  }, []);

  return (
    <UnderlineTabs defaultValue="sales">
      <div className="flex w-full items-center border border-border justify-between rounded-t-xl overflow-hidden px-3 ">
        <UnderlineTabsList className=" flex  items-center justify-center md:justify-start   gap-3 ">
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
      <Card className=" rounded-xl bg-background rounded-t-none w-full px-3 pb-4 flex flex-col overflow-y-auto shrink gap-3">
        <UnderlineTabsContent value="sales">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Explore the latest real-time sales and rental transactions with
            unparalleled accuracy. Gain valuable insights and uncover market
            trends at a glance.
          </CardDescription>
          <CardContent className="p-0 w-full flex flex-col gap-3">
            {salesData?.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </CardContent>
        </UnderlineTabsContent>
        <UnderlineTabsContent value="rental">
          <CardDescription className="text-base text-accent my-2  font-normal line-clamp-2">
            Explore the latest real-time sales and rental transactions with
            unparalleled accuracy. Gain valuable insights and uncover market
            trends at a glance.
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
