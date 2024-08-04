"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

function Calculator() {
  const [transactionType, setTransactionType] = React.useState<string | null>(
    null
  );
  const [usage, setUsage] = React.useState<string | null>(null);
  const [propertyType, setPropertyType] = React.useState<string | null>(null);

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
              <label
                htmlFor={radio.label}
                className="text-base font-medium block"
              >
                {radio.label}
              </label>
              <div className="flex justify-start items-center gap-4 py-2">
                {radio.options.map((option, idx) => (
                  <div className="flex items-center justify-start gap-2">
                    <input
                      type="radio"
                      name={option}
                      checked={radio.value === option}
                      onChange={() => radio.onChange(option)}
                      className="form-radio  h-4 w-4 text-muted transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor={option || ""}
                      className="text-base font-medium "
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Calculator;
