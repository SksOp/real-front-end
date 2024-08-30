import React from "react";
import ChartWrapper from "./chart/chartWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TimelineView from "./timeline-view";

function TransactionHistory() {
  return (
    <ChartWrapper
      title="Transaction history"
      description="This shows the number of transactions in Dubai including all the type of sales."
    >
      <Tabs defaultValue="sales">
        <TabsList className="w-full gap-3 items-center justify-start bg-background ">
          <TabsTrigger
            value="sales"
            className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="rental"
            className="rounded-full border border-muted-foreground text-center font-bold data-[state=active]:bg-primary/10 data-[state=active]:text-muted-foreground"
          >
            Rental
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="sales"
          className="w-full flex gap-2 overflow-x-scroll"
        >
          <TimelineView date="2019" price={1000} sqft={1000} growth={23} />
        </TabsContent>
      </Tabs>
    </ChartWrapper>
  );
}

export default TransactionHistory;
