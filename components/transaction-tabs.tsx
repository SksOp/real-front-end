import React, { use, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterIcon, OrderIcon, VerticalThreeDots } from "@/public/svg/icons";
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
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number;
    }>
  >;
  defaultTab?: string;
}

function TransactionTabs({
  matrixData,
  selectedTab,
  setSelectedTab,
  setFilters,
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

  const handleOrderChange = (order: string) => {
    setFilters((prev) => ({ ...prev, ["orderBy"]: order }));
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
              value="mortgage"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
              onClick={() => setSelectedTab("mortgage")}
            >
              Mortgage
            </TabsTrigger>
            {/* <Separator orientation="vertical" className="h-5" /> */}
          </TabsList>
          <div className="md:hidden flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
                <OrderIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] cursor-pointer rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <div
                  onClick={() => handleOrderChange("area")}
                  className="cursor-pointer"
                >
                  By Name
                </div>
                <div
                  onClick={() => handleOrderChange("value")}
                  className="cursor-pointer"
                >
                  By Price
                </div>
                <div
                  onClick={() => handleOrderChange("INSTANCE_DATE")}
                  className="cursor-pointer"
                >
                  By Date
                </div>
                <div
                  onClick={() => handleOrderChange("procedure")}
                  className="cursor-pointer"
                >
                  By sqft
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Drawer>
              <DrawerTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
                <FilterIcon />
              </DrawerTrigger>
              <DrawerContent>
                <TransactionFilter setFilters={setFilters || (() => {})} />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="md:flex hidden justify-end items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
                <OrderIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] cursor-pointer rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <div
                  onClick={() => handleOrderChange("area")}
                  className="cursor-pointer"
                >
                  By Name
                </div>
                <div
                  onClick={() => handleOrderChange("value")}
                  className="cursor-pointer"
                >
                  By Price
                </div>
                <div
                  onClick={() => handleOrderChange("INSTANCE_DATE")}
                  className="cursor-pointer"
                >
                  By Date
                </div>
                <div
                  onClick={() => handleOrderChange("procedure")}
                  className="cursor-pointer"
                >
                  By sqft
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ">
                <FilterIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <TransactionFilter setFilters={setFilters || (() => {})} />
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
