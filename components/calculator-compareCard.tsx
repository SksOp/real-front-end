import React from "react";
import { Card } from "./ui/card";

interface CalculatorDualResultProps {
  title1: string;
  title2: string;
  value1: number;
  value2: number;
}

const isNumeric = (value: string) => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};
// Helper function to format the values
const formatValue = (value: number | string) => {
  let numericValue: number;

  // If the value is a string and numeric, convert it to a number
  if (typeof value === "string" && isNumeric(value)) {
    numericValue = parseFloat(value);
  } else if (typeof value === "number") {
    numericValue = value;
  } else {
    return value; // If it's not numeric, return as is
  }

  // Format the numeric value
  if (numericValue >= 1_000_000_000) {
    return (numericValue / 1_000_000_000).toFixed(1) + "B";
  } else if (numericValue >= 1_000_000) {
    return (numericValue / 1_000_000).toFixed(1) + "M";
  } else if (numericValue >= 1_000) {
    return (numericValue / 1_000).toFixed(1) + "K";
  } else {
    return numericValue.toString(); // Return smaller numbers as is
  }
};

function CalculatorCompareCard({
  title1,
  title2,
  value1,
  value2,
}: CalculatorDualResultProps) {
  return (
    <Card className="border rounded-lg bg-background p-4 flex items-center justify-between gap-5 w-full">
      <div className="flex items-start justify-start gap-2 w-1/2">
        <div className="bg-green-400 flex-shrink-0 w-2 h-2 rounded-full mt-1" />
        <div className="flex flex-col gap-1 ">
          <h3 className="text-muted-foreground text-sm font-normal">
            {title1}
          </h3>
          <h3 className="text-secondary font-semibold text-lg truncate">
            {formatValue(value1)} AED
          </h3>
        </div>
      </div>
      <div className="h-16 bg-border shrink-0  w-[1px]" />
      <div className="flex items-start justify-start gap-2 w-1/2">
        <div className="bg-secondary flex-shrink-0 w-2 h-2 rounded-full mt-1" />
        <div className="flex flex-col gap-1">
          <h3 className="text-muted-foreground text-sm font-normal">
            {title2}
          </h3>
          <h3 className="text-secondary font-semibold text-lg truncate">
            {formatValue(value2)} AED
          </h3>
        </div>
      </div>
    </Card>
  );
}

export default CalculatorCompareCard;