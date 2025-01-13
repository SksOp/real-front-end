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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import MatrixSkeleton from "./matrixSkeleton";

interface TransactionTabsProps {
  matrixData: {
    title: string;
    value: string;
    growth: number;
  }[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  filters: {
    [key: string]: string | number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number;
    }>
  >;
  defaultTab?: string;
  isLoading?: boolean;
}

function TransactionTabs({
  matrixData,
  selectedTab,
  setSelectedTab,
  filters,
  setFilters,
  defaultTab = "sales",
  isLoading = false,
}: TransactionTabsProps) {
  const [sortedBy, setSortedBy] = React.useState<string | null>(null);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] =
    React.useState<boolean>(false);
  const [isOpenFilterMenu, setIsOpenFilterMenu] =
    React.useState<boolean>(false);
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
    setSortedBy(order);
    setFilters((prev) => ({
      ...prev,
      orderBy: order,
      sequence:
        prev.orderBy === order && prev.sequence === "asc" ? "dsc" : "asc",
    }));
  };

  const hasFilters =
    Object.keys(filters).length > 1 ||
    (Object.keys(filters).length > 0 && !filters?.hasOwnProperty("orderBy"));

  return (
    <div className="w-full ">
      <Tabs
        defaultValue={defaultTab}
        value={selectedTab}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center">
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll">
            {["sales", "rental", "mortgage"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
                onClick={() => setSelectedTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="md:hidden flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ",
                  sortedBy && "bg-primary/10"
                )}
              >
                <OrderIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] cursor-pointer rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <DropdownMenuItem
                  onClick={() => handleOrderChange("area")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  By Area Name
                  {sortedBy === "area" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("value")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  By Price
                  {sortedBy === "value" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("INSTANCE_DATE")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  By Date
                  {sortedBy === "INSTANCE_DATE" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("procedure")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  By sqft
                  {sortedBy === "procedure" && <Check size={20} />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Drawer
              open={isOpenFilterDrawer}
              onOpenChange={setIsOpenFilterDrawer}
            >
              <DrawerTrigger
                className={cn(
                  "rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ",
                  hasFilters && "bg-primary/10"
                )}
              >
                <FilterIcon />
              </DrawerTrigger>
              <DrawerContent>
                <TransactionFilter
                  filters={filters}
                  setFilters={setFilters || (() => {})}
                  setIsOpen={setIsOpenFilterDrawer}
                />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="md:flex hidden justify-end items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ",
                  sortedBy && "bg-primary/10"
                )}
              >
                <OrderIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] cursor-pointer rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <DropdownMenuItem
                  onClick={() => handleOrderChange("area")}
                  className="cursor-pointer flex items-center gap-2 "
                >
                  By Area Name
                  {sortedBy === "area" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("value")}
                  className="cursor-pointer flex items-center gap-2 "
                >
                  By Price
                  {sortedBy === "value" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("INSTANCE_DATE")}
                  className="cursor-pointer flex items-center gap-2 "
                >
                  By Date
                  {sortedBy === "INSTANCE_DATE" && <Check size={20} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleOrderChange("procedure")}
                  className="cursor-pointer flex items-center gap-2 "
                >
                  By sqft
                  {sortedBy === "procedure" && <Check size={20} />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu
              open={isOpenFilterMenu}
              onOpenChange={setIsOpenFilterMenu}
            >
              <DropdownMenuTrigger
                className={cn(
                  "rounded-full border border-muted-foreground text-center font-bold px-3 py-1.5 ",
                  hasFilters && "bg-primary/10"
                )}
              >
                <FilterIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[600px] rounded-2xl shadow-[0px_4px_19px_0px_rgba(0,0,0,0.12)] px-6 border-0 py-4 flex flex-col gap-4  overflow-y-auto"
              >
                <TransactionFilter
                  filters={filters}
                  setFilters={setFilters || (() => {})}
                  setIsOpen={setIsOpenFilterMenu}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {["sales", "rental", "mortgage"].map((tab) => (
          <TabsContent key={tab} value={tab} className="w-full flex mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-1">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <MatrixSkeleton key={index} />
                  ))
                : matrixData.map((item, index) => (
                    <MatrixCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      growth={item.growth}
                    />
                  ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default TransactionTabs;
