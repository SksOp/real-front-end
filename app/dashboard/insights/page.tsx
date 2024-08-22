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
import ExploreTab from "@/components/explore-tab";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";

function InsightPage() {
  return (
    <Layout page="insights">
      <Tabs
        defaultValue="explore"
        className="w-full items-center mt-12  justify-center"
      >
        <TabsList className="w-full items-center justify-between px-4 py-3">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="my-listings">My listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="mb-20">
          <ExploreTab />
        </TabsContent>
        <TabsContent value="insights" className="">
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
        <TabsContent value="transactions">
          <TransactionTabs />
          <TransactionCard />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default InsightPage;
