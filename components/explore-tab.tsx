import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ExplorePriceChanges from "./explore-price-changes";
import ExploreDemand from "./explore-demand";
import ExploreActiveListing from "./explore-area-listing";
import ExploreAdsTab from "./explore-ads-tab";
import { ScrollArea } from "./ui/scroll-area";
import ExploreListingIndex from "./explore-listing-index";
import ExploreTotalSales from "./explore-total-sales";
import ExploreAreaWise from "./explore-area-wise";
import TransactionHistory from "./transaction-history";

function ExploreTab() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full gap-3 border-0 items-center justify-start bg-background mb-4 px-4">
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
          value="rental"
          className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
        >
          Rental
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="all"
        className="flex flex-col gap-8 justify-center items-start "
      >
        <ExplorePriceChanges />
        <TransactionHistory />
        <ExploreDemand />
        <ExploreTotalSales />
        <ExploreAdsTab />
      </TabsContent>
    </Tabs>
  );
}

export default ExploreTab;
