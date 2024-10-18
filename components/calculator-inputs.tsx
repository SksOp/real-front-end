"use client";
import React, { use, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { InputField } from "@/config/types";
import CalculatorSwitchCard from "./calculator-switch-card";
import { Card } from "./ui/card";

interface CalculatorInputsProps {
  uniqueKey: string;
  title: string;
  type: string;
  is_mandatory: boolean;
  placeholder?: string;
  default_value?: string | number;
  additionalTexts?: string;
  options?: (string | number)[] | InputField[];
  source?: string;
  searchable?: boolean;
  value: any;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
}

const fetchAndStoreOptions = async (
  key: string,
  apiUrl: string,
  expirationTime: number = 24 * 60 * 60 * 1000
) => {
  const now = new Date().getTime();
  const storedData = localStorage.getItem(key);
  const storedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (
    storedData &&
    storedTimestamp &&
    now - parseInt(storedTimestamp) < expirationTime
  ) {
    return JSON.parse(storedData);
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const uniqueData = data.data.uniqueAreas;

    if (Array.isArray(uniqueData)) {
      localStorage.setItem(key, JSON.stringify(uniqueData));
      localStorage.setItem(`${key}_timestamp`, now.toString());
      return uniqueData;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
    return [];
  }
};

function CalculatorInputs({
  uniqueKey,
  title,
  type,
  is_mandatory,
  placeholder,
  default_value,
  additionalTexts,
  options,
  source,
  searchable,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: CalculatorInputsProps) {
  const [fetchedOptions, setFetchedOptions] = useState<
    (string | number)[] | InputField[]
  >(options || []);

  useEffect(() => {
    const fetchOptions = async () => {
      if (source) {
        const data = await fetchAndStoreOptions(uniqueKey, source);
        if (Array.isArray(data) && data.length > 0) setFetchedOptions(data);
      }
    };
    fetchOptions();
  }, [source, uniqueKey]);

  const renderOptionalLabel = () =>
    !is_mandatory && (
      <span className="text-accent font-medium text-sm italic">
        {" "}
        (Optional)
      </span>
    );

  switch (type) {
    case "radio":
      return (
        <div className="flex flex-col gap-2 w-full px-1">
          <Label htmlFor={title} className="text-sm font-medium text-secondary">
            {title}
            {renderOptionalLabel()}
          </Label>
          <RadioGroup
            className="flex justify-start items-center gap-5 py-2"
            value={value}
            onValueChange={onChange}
          >
            {options?.map((option, idx) => (
              <div key={idx} className="flex items-center justify-start gap-1">
                <RadioGroupItem
                  value={String(option)}
                  id={String(option)}
                  className="border-accent text-secondary pb-[0.05rem]"
                />
                <Label
                  htmlFor={String(option)}
                  className="text-muted-foreground font-medium text-sm"
                >
                  {String(option)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case "value":
      return (
        <div className="flex flex-col gap-0.5 w-full px-1">
          <Label className="text-sm font-medium text-secondary mb-1 truncate">
            {title}
            {renderOptionalLabel()}
          </Label>
          <Input
            type="text"
            className="border rounded-lg bg-card"
            placeholder={placeholder || ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {additionalTexts && (
            <p className="text-accent italic font-normal text-xs mt-2">
              {additionalTexts}
            </p>
          )}
        </div>
      );

    case "dropdown":
      const [open, setOpen] = useState(false);
      return (
        <div className="w-full flex flex-col gap-0.5 px-1">
          <Label className="text-sm font-semibold text-secondary">
            {title}
            {renderOptionalLabel()}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className="flex flex-row justify-between items-center border rounded-lg bg-card"
              asChild
            >
              <Button
                variant="outline"
                className="text-muted-foreground  text-sm justify-between"
              >
                {value ? (
                  <>{value}</>
                ) : (
                  <span className="font-normal">{placeholder}</span>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] p-0"
              align="center"
            >
              <Command>
                {searchable && <CommandInput placeholder="Search..." />}
                <CommandList>
                  <CommandEmpty className="h-fit px-4 py-2 pb-0 text-sm font-normal">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup>
                    {fetchedOptions?.map((option, idx) => (
                      <CommandItem
                        key={idx}
                        value={String(option)} // Ensure this is the correct value
                        onSelect={(value) => {
                          onChange(value);
                          setOpen(false);
                        }}
                      >
                        {String(option)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );

    case "slider":
      console.log(default_value);
      return (
        <div className="flex flex-col gap-8 w-full px-1">
          <Label className="text-sm font-semibold text-secondary">
            {title}
            {renderOptionalLabel()}
          </Label>
          <div className="relative">
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-normal bg-muted-foreground py-1 px-2 rounded-lg text-white"
              style={{
                left: `calc(${Math.min(
                  Math.max(((value - min) / (max - min)) * 100, 10),
                  90
                )}%)`,
              }}
            >
              {value}
            </div>
            <Slider
              value={[value]}
              min={min}
              max={max}
              step={step}
              defaultValue={[Number(default_value)]}
              onValueChange={(val) => onChange(val[0])}
              className="mt-4"
            />
            {additionalTexts && (
              <p className="text-accent italic font-normal text-xs mt-2">
                {additionalTexts}
              </p>
            )}
          </div>
        </div>
      );

    case "slider_with_text":
      return (
        <div className="w-full flex flex-col gap-0.5 px-1">
          <Label className="text-sm font-semibold text-secondary">
            {title}
            {renderOptionalLabel()}
          </Label>
          <Input
            type="text"
            className="border rounded-lg bg-card"
            placeholder={placeholder || ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <Slider
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={(val) => onChange(val[0])}
            className="mt-4"
          />
        </div>
      );

    case "currency_text":
      return (
        <div className="flex flex-col gap-0.5 w-full px-1">
          <Label className="text-sm font-medium text-secondary mb-1 truncate">
            {title}
            {renderOptionalLabel()}
          </Label>
          <div className="flex items-center border border-input rounded-lg bg-card focus-within:ring-ring focus-within:ring-2 focus-within:outline-none">
            <span className="px-2 text-sm text-accent">AED</span>
            <Input
              type="text"
              className="focus-visible:ring-0 border-0 bg-card focus-visible:ring-offset-0 px-1"
              placeholder={placeholder || ""}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          {additionalTexts && (
            <p className="text-accent italic font-normal text-xs mt-2">
              {additionalTexts}
            </p>
          )}
        </div>
      );

    case "switch":
      return (
        <CalculatorSwitchCard title={title}>
          {Array.isArray(options) &&
            options.every((opt) => typeof opt === "object") &&
            (options as InputField[]).map((input: InputField) => (
              <CalculatorInputs
                key={input?.key}
                uniqueKey={input?.key}
                title={input?.label}
                type={input?.type}
                is_mandatory={input?.is_mandatory}
                default_value={input?.default_value}
                additionalTexts={input?.helper_text}
                placeholder={input?.placeholder ?? "enter value"}
                value={value[input?.key]}
                onChange={(newValue) =>
                  onChange({
                    ...value,
                    [input?.key]: newValue,
                  })
                }
                options={input?.options}
                min={input?.min}
                max={input?.max}
                step={input?.step}
              />
            ))}
        </CalculatorSwitchCard>
      );

    case "read_only_auto_compute":
      return (
        <Card className="border rounded-lg p-3 flex flex-col gap-1 w-full">
          <h3 className="text-muted-foreground text-sm font-normal">{title}</h3>
          <div className="flex gap-1">
            <h3 className="text-secondary font-semibold text-xl">
              {value === "NaN" ? "" : value ?? ""} AED
            </h3>
          </div>
        </Card>
      );

    default:
      return null;
  }
}

export default CalculatorInputs;
