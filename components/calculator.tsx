"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Area } from "@/constants/area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CalculatorPropertySelector from "./calculator-property-selector";
import CalculatorInputs from "./calculator-inputs";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";

function Calculator() {
  const [expanded, setExpanded] = useState<boolean>(false);

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
    <div className="w-full p-4 pt-0">
      {/* <CalculatorPropertySelector /> */}
      {/* <Accordion type="single" collapsible>
        <AccordionItem value="input">
          <AccordionTrigger className="text-base text-secondary w-full font-semibold">
            Inputs
          </AccordionTrigger>
          <AccordionContent className=" flex flex-col items-start justify-center gap-5 w-full">
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
      </Accordion> */}
    </div>
  );
}

export default Calculator;
