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

function TransactionTabs() {
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

  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full gap-3 items-center justify-between bg-background ">
        <div className="flex justify-start items-center gap-4">
          <Drawer>
            <DrawerTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ml-2">
              <FilterIcon />
            </DrawerTrigger>
            <DrawerContent>
              <TransactionFilter />
            </DrawerContent>
          </Drawer>
          <Separator orientation="vertical" className=" h-5" />
          <TabsTrigger
            value="all"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="rent"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Rent
          </TabsTrigger>
          <TabsTrigger
            value="gift"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Gift
          </TabsTrigger>
        </div>
        <VerticalThreeDots className="mr-4" />
      </TabsList>
      <TabsContent
        value="all"
        className="w-full flex flex-col gap-2 overflow-x-scroll"
      >
        <ReportSection transactionData={transactionData} />
        {Transaction?.map((transaction, index) => (
          <TransactionCard key={index} {...transaction} />
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default TransactionTabs;
