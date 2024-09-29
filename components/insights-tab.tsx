"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DataCards from "./data-cards";
import { useRouter } from "next/navigation";
import Calculator from "./calculator";

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
  const [view, setView] = useState("selectCalculator");

  return (
    <Tabs value={isActive} onValueChange={(value) => setIsActive(value)}>
      <TabsList className="w-full gap-3 items-center overflow-scroll justify-start bg-background mb-1">
        <TabsTrigger
          value="dashboards"
          className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
        >
          Dashboards
        </TabsTrigger>
        <TabsTrigger
          value="calculators"
          className="rounded-full border border-muted text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
        >
          Calculators
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="dashboards"
        className="grid grid-cols-2 mx-2 gap-2 mt-2"
      >
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

      <TabsContent value="calculators" className=" mt-0 w-full">
        {view === "selectCalculator" && (
          <div className="grid grid-cols-2 mx-2 gap-2">
            {dataCardsContent.map((card) => (
              <DataCards
                key={card.id}
                bgColor={card.bgColor}
                onClick={() => setView("calculator")}
              >
                <h3 className="text-secondary font-semibold text-sm">
                  {card.title}
                </h3>
                <p className="text-base text-muted-foreground font-normal leading-6">
                  {card.description}
                </p>
              </DataCards>
            ))}
          </div>
        )}

        {view === "calculator" && <Calculator />}
      </TabsContent>
    </Tabs>
  );
}

export default InsightsTab;
