import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterIcon, VerticalThreeDots } from "@/public/svg/icons";
import { Separator } from "./ui/separator";
// import { transactionData } from "@/constants/transactionCards";
import TransactionCard from "./transaction-card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { DownIcon, UpIcon } from "@/public/svg/Indicator";
import { ReportCard } from "./ui/reportCard";
import TransactionFilter from "./transaction-filter";
import {
  getAverageValues,
  getLastTransactions,
} from "@/repository/tanstack/queries/functions.queries";
import { useQuery } from "@tanstack/react-query";
import { getTransactionData } from "@/transcation/dataConverter";
import { FilterContext } from "@/context/filter/filter-provider";
import ReportSection from "./insights/reportsection/reportsection";
import MatrixCard from "./matrix-card";

function TransactionTabs({ tabs }: { tabs: string[] }) {
  const {
    data: Transaction,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getLastTransactions());

  const {
    data: avgValue,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery(getAverageValues());

  const props = useContext(FilterContext);

  const transactionData = getTransactionData(avgValue!);

  const matrixData = [
    { title: "Average Rental Value", value: "120 K", growth: -21 },
    { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
    { title: "Total Value", value: "165 K", growth: 21 },
    { title: "No of Transactions", value: "20", growth: -21 },
  ];

  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList className="w-full gap-3 items-center justify-between bg-background mb-2">
        <div className="flex justify-start items-center gap-4">
          <Drawer>
            <DrawerTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
              <FilterIcon />
            </DrawerTrigger>
            <DrawerContent>
              <TransactionFilter />
            </DrawerContent>
          </Drawer>
          <Separator orientation="vertical" className="h-5" />
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab}
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              {tab}
            </TabsTrigger>
          ))}
          {/* <TabsTrigger
            value="all"
            className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="rent"
            className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Rent
          </TabsTrigger>
          <TabsTrigger
            value="gift"
            className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Gift
          </TabsTrigger> */}
        </div>
        <VerticalThreeDots />
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent
          key={index}
          value={tab}
          className="w-full mt-0  flex flex-col gap-2 overflow-x-scroll"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {matrixData.map((item, index) => (
              <MatrixCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
              />
            ))}
          </div>
          {/* {Transaction?.map((transaction, index) => (
          <TransactionCard key={index} {...transaction} />
        ))} */}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default TransactionTabs;
