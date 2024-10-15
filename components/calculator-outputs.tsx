import React from "react";
import CalculatorResultCard from "./calculator-resultCard";
import CalculatorCompareCard from "./calculator-compareCard";

interface CalculatorOutputsProps {
  type: string;
  title: string;
  secondaryTitle?: string;
  value: number;
  secondaryValue?: number;
  percentage?: number;
}

function CalculatorOutputs({
  type,
  title,
  secondaryTitle = "",
  value,
  secondaryValue = 0,
  percentage,
}: CalculatorOutputsProps) {
  switch (type) {
    case "resultCard":
      return (
        <CalculatorResultCard
          title={title}
          value={value}
          percentage={percentage}
        />
      );

    case "compareCard":
      return (
        <CalculatorCompareCard
          title1={title}
          title2={secondaryTitle}
          value1={value}
          value2={secondaryValue}
        />
      );
  }
}

export default CalculatorOutputs;
