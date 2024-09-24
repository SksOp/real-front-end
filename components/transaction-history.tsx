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
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="rental"
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            Rental
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="sales"
          className="w-full flex flex-col gap-1 min-h-20"
        >
          <TimelineView date="2019" price={1000} sqft={1000} growth={23} />
          <TimelineView date="2019" price={1000} sqft={1000} growth={23} />
          <TimelineView
            date="2019"
            price={1000}
            sqft={1000}
            growth={23}
            lastLine={false}
          />
        </TabsContent>
      </Tabs>
    </ChartWrapper>
  );
}

export default TransactionHistory;
