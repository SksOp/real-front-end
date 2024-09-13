import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Info } from "lucide-react";
import MatrixCard from "./matrix-card";

function HomeTransactionCard() {
  const data = [
    { title: "Average Rental Value", value: 120, growth: 20 },
    { title: "Average Rental Value", value: 120, growth: -20 },
    { title: "Average Rental Value", value: 120, growth: -15 },
    { title: "Average Rental Value", value: 120, growth: 20 },
  ];

  return (
    <Card className="border-2 rounded-xl bg-background w-full p-0">
      <CardHeader className="flex flex-row justify-between items-center text-center p-3 w-full ">
        <h3 className="text-lg font-semibold text-secondary">Transactions</h3>
        <h3 className="text-base font-semibold text-primary">
          Go to transactions
        </h3>
      </CardHeader>
      <CardContent className="px-3 py-0 pb-4 w-full">
        <Tabs defaultValue="sales">
          <TabsList className="w-full gap-3 items-center justify-start bg-background ">
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
        <CardFooter className="flex truncate gap-2 justify-start items-center p-0 mt-3">
          <Info size={15} />
          <h3 className="text-sm text-muted-foreground">
            Compared with previous month.{" "}
            <span className="text-primary">learn more.</span>
          </h3>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default HomeTransactionCard;
