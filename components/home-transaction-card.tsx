import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Info } from "lucide-react";
import MatrixCard from "./matrix-card";

function HomeTransactionCard() {
  const data = [
    { title: "Average Rental Value", value: "120 K", growth: -21 },
    { title: "Sales per SQFT", value: "$3.5 M", growth: 21 },
    { title: "Total Value", value: "165 K", growth: 21 },
    { title: "No of Transactions", value: "20", growth: -21 },
  ];

  return (
    <Card className="border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-3">
      <CardHeader className="flex flex-row justify-between items-center text-center p-0 w-full ">
        <h3 className="text-base font-semibold text-secondary">Transactions</h3>
        <h3 className="text-xs font-semibold text-primary ">
          Go to transactions
        </h3>
      </CardHeader>
      <CardContent className="p-0 w-full flex flex-col gap-3">
        <Tabs defaultValue="sales">
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll">
            <TabsTrigger
              value="sales"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Rental
            </TabsTrigger>
            <TabsTrigger
              value="mortage"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Mortage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="w-full flex  ">
            <div className="grid grid-cols-2 gap-3 w-full">
              {data.map((item, index) => (
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
        <CardFooter className="flex gap-1 justify-start items-center p-0">
          <Info size={16} className="stroke-accent" />
          <h3 className="text-[0.8rem] font-medium truncate text-accent">
            Compared with previous month.{" "}
            <span className="text-primary font-medium ">learn more.</span>
          </h3>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default HomeTransactionCard;
