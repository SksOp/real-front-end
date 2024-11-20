"use client";
import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

function MatricesSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("tab", value);
    console.log(`Updating query to: ${currentParams.toString()}`);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background">
      <TabsTrigger
        value="all"
        onClick={() => updateQueryParams("all")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        All
      </TabsTrigger>
      <TabsTrigger
        value="sales"
        onClick={() => updateQueryParams("sales")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Sales
      </TabsTrigger>
      <TabsTrigger
        value="rentals"
        onClick={() => updateQueryParams("rentals")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        rentals
      </TabsTrigger>
      <TabsTrigger
        value="supply"
        onClick={() => updateQueryParams("supply")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Supply
      </TabsTrigger>
      <TabsTrigger
        value="offplan"
        onClick={() => updateQueryParams("offplan")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        OffPlan
      </TabsTrigger>
      <TabsTrigger
        value="sales_index"
        onClick={() => updateQueryParams("sales_index")}
        className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
      >
        Sales Index
      </TabsTrigger>
    </TabsList>
  );
}

export default MatricesSelector;
