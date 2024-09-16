"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DataCards from "./data-cards";
import { useRouter } from "next/navigation";

const dataCardsContent = [
  {
    id: 1,
    bgColor: "bg-[#EEFBFC]",
    title: "Sales Estimator",
    description:
      "Analyze cash-based property sales in Dubai, excluding mortgage and gift transactions.",
  },
  {
    id: 2,
    bgColor: "bg-[#EFEEFC]",
    title: "Sales Estimator",
    description:
      "Analyze cash-based property sales in Dubai, excluding mortgage and gift transactions.",
  },
  {
    id: 3,
    bgColor: "bg-[#FCEEEE]",
    title: "Sales Estimator",
    description:
      "Analyze cash-based property sales in Dubai, excluding mortgage and gift transactions.",
  },
  {
    id: 4,
    bgColor: "bg-[#EEFCEF]",
    title: "Sales Estimator",
    description:
      "Analyze cash-based property sales in Dubai, excluding mortgage and gift transactions.",
  },
];

function InsightsTab({ selected }: { selected?: string }) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(selected ?? "dashboards");

  return (
    <Tabs value={isActive} onValueChange={(value) => setIsActive(value)}>
      <TabsList className="w-full gap-3 items-center justify-start bg-background mx-2 ">
        <TabsTrigger
          value="dashboards"
          className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
        >
          Dashboards
        </TabsTrigger>
        <TabsTrigger
          value="calculators"
          className="rounded-full border border-muted text-center font-bold text-muted data-[state=active]:bg-secondary data-[state=active]:text-white"
        >
          Calculators
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboards" className="grid grid-cols-2 mx-2 gap-2">
        {dataCardsContent.map((card) => (
          <DataCards
            key={card.id}
            bgColor={card.bgColor}
            onClick={() => router.push("/dashboard/my-page")}
          >
            <h3 className="text-secondary font-semibold text-sm">
              {card.title}
            </h3>
            <p className="text-base text-muted-foreground font-normal leading-6">
              {card.description}
            </p>
          </DataCards>
        ))}
      </TabsContent>

      <TabsContent value="calculators" className="grid grid-cols-2 mx-2 gap-2">
        {dataCardsContent.map((card) => (
          <DataCards key={card.id} bgColor={card.bgColor}>
            <h3 className="text-secondary font-semibold text-sm">
              {card.title}
            </h3>
            <p className="text-base text-muted-foreground font-normal leading-6">
              {card.description}
            </p>
          </DataCards>
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default InsightsTab;
