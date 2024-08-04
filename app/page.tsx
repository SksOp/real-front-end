import { GrowthChart } from "@/components/salestransactions/salestransactions";
import { Report } from "@/components/reportcharts/report";
import Layout from "@/layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import React from "react";
import Filters from "@/components/filters";
import PropertiesCard from "@/components/propertiesCard";
import { PropertiesList } from "@/constants/properties";
import { ScrollArea } from "@/components/ui/scroll-area";
import Calculator from "@/components/calculator";

export default function Home() {
  return (
    <Layout>
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
          <Calculator />
        </TabsContent>
        <TabsContent value="insights">
          <Filters />
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
