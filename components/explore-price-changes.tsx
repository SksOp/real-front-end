import React from "react";
import ExploreFormats from "./explore-formats";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DownIcon, UpIcon } from "@/public/svg/Indicator";
import { SelectSeparator } from "./ui/select";
import PriceChangesTable from "./price-changes-table";

interface priceCardProps {
  title: string;
  avgPrice: number;
  ratePerSqFt: number;
  noOfTransactions: number;
}

function PriceCard({
  title,
  avgPrice,
  ratePerSqFt,
  noOfTransactions,
}: priceCardProps) {
  return (
    <Card className="bg-[#F2F2F2] gap-3 flex flex-col mt-2 px-4 py-6 w-fit rounded-lg">
      <CardHeader className="p-0 m-0">
        <CardTitle className="text-xl truncate">{title}</CardTitle>
        <CardDescription className="text-base text-muted ">
          Average price
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 m-0 flex flex-col gap-1">
        <div className="flex items-center justify-start gap-1">
          <h3 className="text-3xl font-semibold text-secondary tracking-wider">
            {avgPrice}K
          </h3>

          <span className="text-[#0AAE11] font-semibold flex justify-start items-start">
            <UpIcon className="w-5 h-5 " />
            21%
          </span>
        </div>
        <div className="flex items-center justify-start gap-1">
          <h3 className="text-lg font-medium text-muted-foreground whitespace-nowrap tracking-tight">
            {ratePerSqFt} per sqft.
          </h3>

          <span className="text-[#0AAE11] font-semibold flex justify-start items-start">
            <UpIcon className="w-5 h-5 " />
            21%
          </span>
        </div>
        <SelectSeparator className="bg-muted-foreground my-2" />
        <CardDescription className="text-base text-muted-foreground">
          No. of transactions
        </CardDescription>
        <div className="flex items-center justify-start gap-1">
          <h3 className="text-2xl font-semibold text-secondary">
            {noOfTransactions}
          </h3>

          <span className="text-[#EB3C70] font-semibold flex justify-start items-start">
            <DownIcon className="w-5 h-5 " />
            21%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ExplorePriceChanges() {
  const cards = [
    {
      title: "Ready Villa",
      avgPrice: 265,
      ratePerSqFt: 1546,
      noOfTransactions: 2700,
    },
    {
      title: "Ready Apartment",
      avgPrice: 265,
      ratePerSqFt: 1546,
      noOfTransactions: 2700,
    },
    {
      title: "Off-plan Villa",
      avgPrice: 265,
      ratePerSqFt: 1546,
      noOfTransactions: 2700,
    },
    {
      title: " Apartment",
      avgPrice: 265,
      ratePerSqFt: 1546,
      noOfTransactions: 2700,
    },
  ];
  return (
    <ExploreFormats title={"Price Changes"}>
      <Tabs defaultValue="by-property">
        <TabsList className="w-full gap-3 items-center justify-start bg-background mt-2">
          <TabsTrigger
            value="by-property"
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            By Property
          </TabsTrigger>
          <TabsTrigger
            value="by-location"
            className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
          >
            By Location
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="by-property"
          className="w-full flex gap-2 overflow-x-scroll"
        >
          {/* {cards.map((card, index) => (
            <PriceCard key={index} {...card} />
          ))} */}

          <PriceChangesTable />
        </TabsContent>
      </Tabs>
    </ExploreFormats>
  );
}

export default ExplorePriceChanges;
