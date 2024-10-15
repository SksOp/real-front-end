"use client";
import React, { useState } from "react";
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

interface CalculatorInputsProps {
  title: string;
  type: string;
  is_mandatory: boolean;
  placeholder?: string;
  default_value?: string | number;
  additionalTexts?: string;
  options?: (string | number)[];
  source?: string;
  searchable?: boolean;
  value: any;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
}

function CalculatorInputs({
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
                    {options?.map((option, idx) => (
                      <CommandItem
                        key={idx}
                        value={String(option)}
                        onSelect={(value) => {
                          onChange(value);
                          setOpen(false);
                        }}
                      >
                        {option}
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

    case "textSlider":
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

    default:
      return null;
  }
}

export default CalculatorInputs;
