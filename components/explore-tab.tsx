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

function ExploreTab() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full gap-3 border-0 items-center justify-start bg-background mb-4 px-4">
        <TabsTrigger
          value="all"
          className="rounded-full border border-muted-foreground text-center font-bold  data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="sales"
          className="rounded-full border border-muted-foreground font-bold   data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        >
          Sales
        </TabsTrigger>
        <TabsTrigger
          value="rental"
          className="rounded-full border border-muted-foreground font-bold   data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
        >
          Rental
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="all"
        className="flex flex-col gap-8 justify-center items-start "
      >
        <ExplorePriceChanges />
        <ExploreDemand />
        <ExploreTotalSales />
        <ExploreAdsTab />
      </TabsContent>
    </Tabs>
  );
}

export default ExploreTab;
