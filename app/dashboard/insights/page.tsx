"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import Filters from "@/components/filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Report } from "@/components/reportcharts/report";
import { PropertiesList } from "@/constants/properties";
import Layout from "@/layout";
import ExploreTab from "@/components/explore-tab";
import TransactionCard from "@/components/transaction-card";
import TransactionTabs from "@/components/transaction-tabs";
import Link from "next/link";
import { FilterProvider } from "@/context/filter/filter-provider";
import ListingTab from "@/components/listing";
import PropertiesCard from "@/components/propertiesCard";

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
        <TabsContent value="insights" className="mb-20">
          <FilterProvider>
            <Report />
          </FilterProvider>
        </TabsContent>
        <TabsContent value="my-listings">
          <ScrollArea className="overflow-y-scroll">
            {PropertiesList.map((property, index) => (
              <Link href={`/my-property/${index + 1}`} key={index} passHref>
                <PropertiesCard
                  title={property.name}
                  key={index}
                  imageURL={property.imageUrl}
                  price={property.price}
                  location={property.location}
                  permitNumber={0}
                />
              </Link>
            ))}
          </ScrollArea>
          <div className="h-20" />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionTabs />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default InsightPage;
