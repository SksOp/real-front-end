import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

interface CalculatorInputsProps {
  title: string;
  type: string;
  isOptional?: boolean;
  placeholder?: string;
  defaultValue?: string;
  additionalTexts?: string;
  options?: string[];
}

function CalculatorInputs({
  title,
  type,
  isOptional = false,
  placeholder,
  defaultValue = "",
  additionalTexts = "",
  options = [],
}: CalculatorInputsProps) {
  switch (type) {
    case "radio":
      const [selectedOption, setSelectedOption] = React.useState<string | null>(
        null
      );
      return (
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor={title} className="text-sm font-medium text-secondary">
            {title}
            {isOptional && (
              <span className="text-accent font-medium text-sm italic">
                {" "}
                (Optional)
              </span>
            )}
          </Label>
          <RadioGroup className="flex justify-start items-center gap-5 py-2">
            {options?.map((option, idx) => (
              <div key={idx} className="flex items-center justify-start gap-1">
                <RadioGroupItem
                  value={option}
                  id={option}
                  onChange={() => setSelectedOption(option)}
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
      );

    case "text":
      return (
        <div className="flex flex-col gap-0.5 w-full">
          <Label className="text-sm font-medium text-secondary mb-1">
            Area
            {isOptional && (
              <span className="text-accent font-medium text-sm italic">
                {" "}
                (Optional)
              </span>
            )}
          </Label>
          <Input
            type="text"
            className="border rounded-lg bg-card"
            placeholder={placeholder || ""}
            defaultValue={defaultValue || ""}
          />
        </div>
      );

    case "select":
      return (
        <div className="w-full flex flex-col gap-0.5 ">
          <Label className="text-sm font-semibold text-secondary">
            {title}
            {isOptional && (
              <span className="text-accent font-medium text-sm italic">
                {" "}
                (Optional)
              </span>
            )}
          </Label>
          <Select>
            <SelectTrigger className="border rounded-lg bg-card">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "slider":
      const [value, setValue] = React.useState<number>(
        parseFloat(defaultValue)
      );

      const handleSliderChange = (newValue: number) => {
        setValue(newValue);
      };
      return (
        <div className="flex flex-col gap-8 w-full">
          <Label className="text-sm font-semibold text-secondary">
            {title}
            {isOptional && (
              <span className="text-accent font-medium text-sm italic">
                {" "}
                (Optional)
              </span>
            )}
          </Label>
          <div className="relative  ">
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-normal bg-muted-foreground py-1 px-2 rounded-lg text-white "
              style={{ left: `${((value - 1000) / (1000000 - 1000)) * 100}%` }}
            >
              {value}
            </div>
            <Slider
              defaultValue={[parseFloat(defaultValue)]}
              min={10000}
              max={1000000}
              step={1000}
              onValueChange={(value) => setValue(value[0])}
              className="mt-4 "
            />
            <p className="text-accent italic font-normal text-xs mt-2">
              Including Broker fee, Legel fee, Extro fee etc.
            </p>
          </div>
        </div>
      );
  }
}

export default CalculatorInputs;
