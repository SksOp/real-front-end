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
    <Card className="border-2 rounded-xl bg-background w-full p-0">
      <CardHeader className="flex flex-row justify-between items-center text-center p-4 w-full ">
        <h3 className="text-lg font-semibold text-secondary">Transactions</h3>
        <h3 className="text-sm font-semibold text-primary ">
          Go to transactions
        </h3>
      </CardHeader>
      <CardContent className="px-4 py-0 pb-4 w-full">
        <Tabs defaultValue="sales">
          <TabsList className="w-full gap-3 items-center justify-start bg-background overflow-x-scroll">
            <TabsTrigger
              value="sales"
              className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              Rental
            </TabsTrigger>
            <TabsTrigger
              value="mortage"
              className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              Mortage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="w-full flex gap-2 ">
            <div className="grid grid-cols-2 gap-2 w-full">
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
        <CardFooter className="flex gap-1 justify-start items-center p-0 mt-3">
          <Info size={16} className="stroke-accent" />
          <h3 className="text-[0.74rem] font-medium truncate text-accent">
            Compared with previous month.{" "}
            <span className="text-primary font-medium text-[0.74rem]">
              learn more.
            </span>
          </h3>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default HomeTransactionCard;
