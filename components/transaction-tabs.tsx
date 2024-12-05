import React, { use, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterIcon, VerticalThreeDots } from "@/public/svg/icons";
import { Separator } from "./ui/separator";
// import { transactionData } from "@/constants/transactionCards";
import TransactionCard from "./transaction-card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import TransactionFilter from "./transaction-filter";
import MatrixCard from "./matrix-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TransactionTabsProps {
  matrixData: {
    title: string;
    value: string;
    growth: number;
  }[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  defaultTab?: string;
}

function TransactionTabs({
  matrixData,
  selectedTab,
  setSelectedTab,
  defaultTab = "sales",
}: TransactionTabsProps) {
  // const {
  //   data: Transaction,
  //   isLoading: isLoading,
  //   isError: isError,
  // } = useQuery(getLastTransactions());

  // const {
  //   data: avgValue,
  //   isLoading: isLoading1,
  //   isError: isError1,
  // } = useQuery(getAverageValues());

  // const props = useContext(FilterContext);

  // const transactionData = getTransactionData(avgValue!);

  // const matrixData = [
  //   { title: "Average Rental Value", value: "120 K", growth: -21 },
  //   { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
  //   { title: "Total Value", value: "165 K", growth: 21 },
  //   { title: "No of Transactions", value: "20", growth: -21 },
  // ];

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full ">
      <Tabs
        defaultValue={defaultTab}
        value={selectedTab}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center">
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll ">
            <TabsTrigger
              value="sales"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
              onClick={() => setSelectedTab("sales")}
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
              onClick={() => setSelectedTab("rental")}
            >
              Rental
            </TabsTrigger>
            <TabsTrigger
              value="mortage"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Mortage
            </TabsTrigger>
            {/* <Separator orientation="vertical" className="h-5" /> */}
          </TabsList>
          <div className="md:hidden block">
            <Drawer>
              <DrawerTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
                <FilterIcon />
              </DrawerTrigger>
              <DrawerContent>
                <TransactionFilter />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="md:flex hidden justify-end items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FilterIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[400px] overflow-y-auto">
                <TransactionFilter />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="sales" className="w-full flex mt-0 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-1">
            {matrixData.map((item, index) => (
              <MatrixCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rental" className="w-full flex  mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-1">
            {matrixData.map((item, index) => (
              <MatrixCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mortgage" className="w-full flex  mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-1">
            {matrixData.map((item, index) => (
              <MatrixCard
                key={index}
                title={item.title}
                value={item.value}
                growth={item.growth}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransactionTabs;
