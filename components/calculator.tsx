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
    <Accordion type="single" collapsible className="w-full p-4">
      <AccordionItem value="input">
        <AccordionTrigger className="text-lg font-medium">
          Inputs
        </AccordionTrigger>
        <AccordionContent className="p-2 flex flex-col items-start justify-center gap-2">
          {radioOptions.map((radio, idx) => (
            <div key={idx} className="">
              <Label
                htmlFor={radio.label}
                className="text-base font-medium block"
              >
                {radio.label}
              </Label>
              <RadioGroup className="flex justify-start items-center gap-4 py-2">
                {radio.options.map((option, idx) => (
                  <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem
                      value={option}
                      id={option}
                      onChange={() => radio.onChange(option)}
                      className="border-2 border-gray-300 text-muted rounded-full w-5 h-5"
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <div className="w-full">
            <Label htmlFor={"location"} className="text-base font-medium block">
              Location
            </Label>
            <Select>
              <SelectTrigger className="border-0 bg-muted-foreground rounded-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="">
                {Area.MostPopularAreas.map((area, idx) => (
                  <SelectItem key={idx} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label
              htmlFor={"developer"}
              className="text-base font-medium block"
            >
              Developer
            </Label>
            <Select>
              <SelectTrigger className="border-0 bg-muted-foreground rounded-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="">
                {["A", "B", "C", "D"].map((area, idx) => (
                  <SelectItem key={idx} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <div className="w-1/2">
              <Label
                htmlFor={"bedrooms"}
                className="text-base font-medium block"
              >
                Bedrooms
              </Label>
              <Select>
                <SelectTrigger className="border-0 bg-muted-foreground rounded-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="">
                  {["1", "2", "3", "4"].map((area, idx) => (
                    <SelectItem key={idx} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label
                htmlFor={"bathrooms"}
                className="text-base font-medium block"
              >
                Bathrooms
              </Label>
              <Select>
                <SelectTrigger className="border-0 bg-muted-foreground rounded-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="">
                  {["1", "2", "3", "4"].map((area, idx) => (
                    <SelectItem key={idx} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <div className="w-1/2">
              <Label
                htmlFor={"room-type"}
                className="text-base font-medium block"
              >
                Room Type
              </Label>
              <Select>
                <SelectTrigger className="border-0 bg-muted-foreground rounded-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="">
                  {["Apartment", "Villa", "Land"].map((area, idx) => (
                    <SelectItem key={idx} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label htmlFor={"area"} className="text-base font-medium block">
                Area
              </Label>
              <Input
                type="text"
                className="border-0 bg-muted-foreground rounded-none"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <Button
              variant={"secondary"}
              className="w-full rounded-full text-center text-lg font-bold h-14"
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
