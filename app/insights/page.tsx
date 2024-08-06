import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import Filters from "@/components/filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertiesCard from "@/components/propertiesCard";
import Report from "@/components/reportcharts/report";
import { PropertiesList } from "@/constants/properties";
import Layout from "@/layout";
import { Caladea } from "next/font/google";
import Calculator from "@/components/calculator";
import ExploreTab from "@/components/explore-tab";
import ExploreFormats from "@/components/explore-formats";
import { ChartStyle } from "@/components/ui/chart";
import ExplorePriceChanges from "@/components/explore-price-changes";

function InsightPage() {
  return (
    <Layout page="insights">
      <Tabs
        defaultValue="explore"
        className="w-full items-center justify-center"
      >
        <TabsList className="w-full items-center justify-between px-4 py-3">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="my-listings">My listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <ExploreTab />
        </TabsContent>
        <TabsContent value="insights">
          <Filters />
          <Report />
        </TabsContent>
        <TabsContent value="my-listings">
          <ScrollArea className="overflow-y-scroll">
            {PropertiesList.map((property, index) => (
              <PropertiesCard key={index} {...property} />
            ))}
          </ScrollArea>
          <div className="h-20" />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default InsightPage;
