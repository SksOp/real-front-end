"use client";
import React from "react";
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

function Calculator() {
  const [transactionType, setTransactionType] = React.useState<string | null>(
    null
  );
  const [usage, setUsage] = React.useState<string | null>(null);
  const [propertyType, setPropertyType] = React.useState<string | null>(null);
  const [Location, setLocation] = React.useState<string | null>(null);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter((prev: any) => (prev === value ? null : value));
  };

  const selectOptions = [
    {
      value: transactionType,
      onChange: (val: string) => handleChange(setTransactionType, val),
      placeholder: "Transaction Type",
      label: "Transaction Type",
      options: ["Sales", "Rental"],
    },
    {
      value: usage,
      onChange: (val: string) => handleChange(setUsage, val),
      placeholder: "Usage",
      label: "Usage",
      options: ["Residential", "Commercial"],
    },
    {
      value: propertyType,
      onChange: (val: string) => handleChange(setPropertyType, val),
      placeholder: "Property Type",
      label: "Property Type",
      options: ["Apartment", "Villa", "Land"],
    },
  ];

  const renderSelect = (
    label: string,
    options: string[],
    placeholder = "Select"
  ) => (
    <div className="w-full flex flex-col gap-0.5">
      <Label className="text-sm font-semibold text-secondary">{label}</Label>
      <Select>
        <SelectTrigger className="border rounded-lg bg-card">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, idx) => (
            <SelectItem key={idx} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const radioOptions = [
    {
      value: transactionType,
      onChange: (val: string) => handleChange(setTransactionType, val),
      placeholder: "Transaction Type",
      label: "Transaction Type",
      options: ["Sales", "Rental"],
    },
    {
      value: usage,
      onChange: (val: string) => handleChange(setUsage, val),
      placeholder: "Usage",
      label: "Usage",
      options: ["Residential", "Commercial"],
    },
    {
      value: propertyType,
      onChange: (val: string) => handleChange(setPropertyType, val),
      placeholder: "Property Type",
      label: "Property Type",
      options: ["Apartment", "Villa", "Land"],
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full p-4 pt-0">
      <AccordionItem value="input">
        <AccordionTrigger className="text-base text-secondary w-full font-semibold">
          Inputs
        </AccordionTrigger>
        <AccordionContent className=" flex flex-col items-start justify-center gap-5 w-full">
          {radioOptions.map((radio, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Label
                htmlFor={radio.label}
                className="text-sm font-semibold text-secondary"
              >
                {radio.label}
              </Label>
              <RadioGroup className="flex justify-start items-center gap-5 py-2">
                {radio.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-start gap-1"
                  >
                    <RadioGroupItem
                      value={option}
                      id={option}
                      onChange={() => radio.onChange(option)}
                      className="border-accent text-secondary pb-[0.05rem]"
                    />
                    <Label
                      htmlFor={option}
                      className="text-muted-foreground font-medium text-sm"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          {renderSelect("Location", Area.MostPopularAreas)}
          {renderSelect("Developer", ["A", "B", "C", "D"])}

          <div className="w-full grid grid-cols-2 gap-4">
            {renderSelect("Bedrooms", ["1", "2", "3", "4"])}
            {renderSelect("Bathrooms", ["1", "2", "3", "4"])}{" "}
            {renderSelect("Room Type", ["Apartment", "Villa", "Land"])}
            <div className="">
              <Label className="text-sm font-semibold text-secondary mb-1">
                Area
              </Label>
              <Input type="text" className="border rounded-lg bg-card" />
            </div>
          </div>

          <div className="w-full mt-4">
            <Button
              variant={"secondary"}
              className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-lg border"
            >
              Calculate
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Calculator;
