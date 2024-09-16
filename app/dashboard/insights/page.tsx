"use client";
import React, { useEffect, useState } from "react";
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
import TransactionTabs from "@/components/transaction-tabs";
import { InsightIcon } from "@/public/svg/navIcons";
import Link from "next/link";
import InsightsTab from "@/components/insights-tab";

interface Props {
  searchParams: {
    tabs?: string;
    subtab?: string;
  };
}
import { FilterProvider } from "@/context/filter/filter-provider";
import ListingTab from "@/components/listing";
import PropertiesCard from "@/components/propertiesCard";

function InsightPage({ searchParams }: Props) {
  const [isActive, setIsActive] = useState(searchParams.tabs ?? "insights");
  const [subtab, setSubtab] = useState(searchParams.subtab ?? "dashboards");

  return (
    <Layout page="insights">
      <Tabs
        value={isActive}
        onValueChange={(value) => setIsActive(value)}
        className="w-full items-center justify-center"
      >
        <TabsList className="w-full items-center justify-between px-4 py-3">
          <TabsTrigger
            value="insights"
            className="flex justify-center items-center gap-2"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger value="my-listings">My listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="insights">
          <InsightsTab selected={subtab} />
        </TabsContent>
        <TabsContent value="my-listings">
          <div className="overflow-y-scroll flex flex-col gap-4 px-4">
            {PropertiesList.map((property, index) => (
              <Link href={`/my-property/${index + 1}`} key={index} passHref>
                <PropertiesCard {...property} key={index} />
              </Link>
            ))}
          </div>
          <div className="h-20" />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default InsightPage;
