"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import Filters from "@/components/filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertiesCard from "@/components/propertiesCard";
import { Report } from "@/components/reportcharts/report";
import { PropertiesList } from "@/constants/properties";
import Layout from "@/layout";
import ExploreTab from "@/components/explore-tab";
import TransactionTabs from "@/components/transaction-tabs";
import { InsightIcon } from "@/public/svg/navIcons";
import Link from "next/link";

function InsightPage() {
  const [isActive, setIsActive] = useState("");
  return (
    <Layout page="insights">
      <Tabs
        defaultValue="explore"
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
        <TabsContent value="insights"></TabsContent>
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

// <Layout page="insights">
//   <Tabs
//     defaultValue="explore"
//     className="w-full items-center justify-center"
//   >
//     <TabsList className="w-full items-center justify-between px-4 py-3">
//       <TabsTrigger value="explore">Explore</TabsTrigger>
//       <TabsTrigger value="insights">Insights</TabsTrigger>
//       <TabsTrigger value="my-listings">My listings</TabsTrigger>
//       <TabsTrigger value="transactions">Transactions</TabsTrigger>
//     </TabsList>
//     <TabsContent value="explore" className="mb-20">
//       <ExploreTab />
//     </TabsContent>
//     <TabsContent value="insights" className="mb-20">
//       <Filters />
//       <Report />
//     </TabsContent>
//     <TabsContent value="my-listings">
//       <ScrollArea className="overflow-y-scroll">
//         {PropertiesList.map((property, index) => (
//           // <Link href={`/my-property/${index + 1}`} key={index} passHref>
//           <PropertiesCard {...property} key={index} />
//           // </Link>
//         ))}
//       </ScrollArea>
//       <div className="h-20" />
//     </TabsContent>
//     <TabsContent value="transactions">
//       <TransactionTabs />
//     </TabsContent>
//   </Tabs>
// </Layout>
