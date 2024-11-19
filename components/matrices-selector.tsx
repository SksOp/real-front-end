import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";

function MatricesSelector() {
  return (
    <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background">
      <TabsTrigger
        value="all"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        All
      </TabsTrigger>
      <TabsTrigger
        value="sales"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Sales
      </TabsTrigger>
      <TabsTrigger
        value="rentals"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        rentals
      </TabsTrigger>
      <TabsTrigger
        value="supply"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Supply
      </TabsTrigger>
      <TabsTrigger
        value="offplan"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        OffPlan
      </TabsTrigger>
      <TabsTrigger
        value="sales_index"
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Sales Index
      </TabsTrigger>
    </TabsList>
  );
}

export default MatricesSelector;
