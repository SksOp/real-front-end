"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Area } from "@/constants/area";
import { Button } from "@/components/ui/button";
import CalculatorPropertySelector from "@/components/calculator-property-selector";
import CalculatorInputs from "@/components/calculator-inputs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import SecondaryNavbar from "@/components/secondaryNavbar";
import Filters from "@/components/filters";
import { usePathname } from "next/navigation";

const calculatorData = [
  {
    id: 1,
    title: "Sales Value Estimator",
    description:
      "Estimate current property sales value based on market trends and attributes.",
  },
  {
    id: 2,
    title: "Rental Value Estimator",
    description:
      "Calculate the optimal rental price using property features and market benchmarks.",
  },
  {
    id: 3,
    title: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
  },
  {
    id: 4,
    title: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
  },
  {
    id: 5,
    title: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
  },
  {
    id: 6,
    title: "Home Affordability Calculator",
    description:
      "Assess the budget and affordability of purchasing a property based on finances.",
  },
];

function CalculatorPage() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);

    if (!isNaN(id)) {
      setDashboardId(id);
    }
  }, [pathname]);

  const calculator = calculatorData.find((item) => item.id === dashboardId);

  const radioOptions = [
    {
      placeholder: "Transaction Type",
      label: "Transaction Type",
      options: ["Sales", "Rental"],
    },
    {
      placeholder: "Usage",
      label: "Usage",
      options: ["Residential", "Commercial"],
    },
    {
      placeholder: "Property Type",
      label: "Property Type",
      options: ["Apartment", "Villa", "Land"],
    },
  ];

  return (
    <SecondaryNavbar title={calculator?.title ?? ""}>
      <div className="w-full p-4 pt-12">
        <Accordion type="single" collapsible>
          <AccordionItem value="input">
            <AccordionTrigger className="text-base text-secondary w-full font-semibold">
              Inputs
            </AccordionTrigger>
            <AccordionContent className=" flex flex-col items-start justify-center gap-5 w-full">
              <CalculatorPropertySelector />
              {radioOptions.map((radio, idx) => (
                <CalculatorInputs
                  key={idx}
                  title={radio.label}
                  options={radio.options}
                  type="radio"
                />
              ))}

              <CalculatorInputs
                title="Location"
                type="select"
                options={Area.MostPopularAreas}
                isOptional
              />
              <CalculatorInputs
                title="Developer"
                type="select"
                options={["A", "B", "C", "D"]}
              />

              <CalculatorInputs
                title="Annual Appreciation Rate"
                isOptional
                type="slider"
                defaultValue={"34000"}
              />

              <div className="w-full grid grid-cols-2 gap-4">
                <CalculatorInputs
                  title="Bedrooms"
                  type="select"
                  options={["1", "2", "3", "4"]}
                />
                <CalculatorInputs
                  title="Bathrooms"
                  type="select"
                  options={["1", "2", "3", "4"]}
                />

                <CalculatorInputs title="Area" type="text" />
              </div>
              <Separator />
              <Card className="bg-background w-full border p-3">
                <CardHeader className="p-0 flex flex-row justify-between items-center">
                  <CardTitle className="text-sm font-semibold text-secondary">
                    Purchase Costs
                  </CardTitle>
                  <Switch
                    id="purchase-costs"
                    onCheckedChange={(checked) => setExpanded(checked)}
                  />
                </CardHeader>
                {expanded && (
                  <CardContent className="p-0 flex flex-col gap-5 my-2">
                    <CalculatorInputs
                      title="DLD Fee"
                      type="text"
                      placeholder="2430 (4%)"
                    />
                    <CalculatorInputs
                      title="Other Fee"
                      type="slider"
                      defaultValue={"64000"}
                      additionalTexts="Including Broker fee, Legel fee, Extro fee etc."
                    />
                  </CardContent>
                )}
              </Card>

              <div className="w-full mt-4">
                <Button
                  variant={"secondary"}
                  className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-xl border"
                >
                  Calculate
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SecondaryNavbar>
  );
}

export default CalculatorPage;
