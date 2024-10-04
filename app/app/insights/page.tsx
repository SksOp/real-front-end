"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/underline-tabs";
import { properties1 } from "@/constants/properties";
import Layout from "@/layout";
import TransactionTabs from "@/components/transaction-tabs";
import Link from "next/link";
import InsightsTab from "@/components/insights-tab";

interface Props {
  searchParams: {
    tabs?: string;
    subtab?: string;
  };
}
import PropertiesCard from "@/components/propertiesCard";
import TransactionCard from "@/components/transaction-card";

function InsightPage({ searchParams }: Props) {
  const [isActive, setIsActive] = useState(searchParams.tabs ?? "insights");
  const [subtab, setSubtab] = useState(searchParams.subtab ?? "dashboards");

  return (
    <Layout page="insights">
      <Tabs
        value={isActive}
        onValueChange={(value) => setIsActive(value)}
        className="w-full items-center justify-center pt-5"
      >
        <TabsList className="w-full border-0 border-b  border-border items-center justify-around gap-3 mb-1 mt-8">
          <TabsTrigger
            value="insights"
            className="flex justify-center items-center gap-2"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger value="my-listings">My listings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="">
          <InsightsTab selected={subtab} />
        </TabsContent>
        <TabsContent value="my-listings">
          <div className="overflow-y-scroll flex flex-col gap-3 px-3 ">
            <h3 className="text-secondary font-semibold text-base pl-2">
              My listings ({properties1.length})
            </h3>
            {properties1.map((property, index) => (
              <Link href={`/my-property/${index + 1}`} key={index} passHref>
                <PropertiesCard
                  name={property.title}
                  key={index}
                  imageUrl={property?.imageURLs ? property?.imageURLs[0]! : ""}
                  price={Number(property.price.replace(/[^0-9.]/g, ""))}
                  location={property.location}
                  area={Number(property.area.replace(/[^0-9.]/g, ""))}
                  bedrooms={Number(property.bedrooms)}
                  bathrooms={Number(property.bathrooms)}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <div className="overflow-y-scroll flex flex-col gap-3 px-3 "></div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default InsightPage;
