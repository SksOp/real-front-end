import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DownPaymentIcon,
  DurationIcon,
  InterstRateIcon,
} from "@/public/svg/mortageCalculatorIcon";
import { Slider } from "./ui/slider";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

const sliderConfig: Record<string, SliderProps> = {
  down_payment: {
    min: 10000000,
    max: 30000000,
    step: 20000,
    defaultValue: 12350000,
  },
  interest_rate: { min: 2, max: 15, step: 1, defaultValue: 4 },
  duration: { min: 4, max: 25, step: 1, defaultValue: 10 },
};

// Defining types for state values
type ValueKeys = "downPayment" | "interestRate" | "duration";

interface ValuesState {
  downPayment: number;
  interestRate: number;
  duration: number;
}

function MortageCalculator() {
  const [values, setValues] = useState<ValuesState>({
    downPayment: sliderConfig.down_payment.defaultValue,
    interestRate: sliderConfig.interest_rate.defaultValue,
    duration: sliderConfig.duration.defaultValue,
  });

  const updateValue = (key: ValueKeys, newValue: number) => {
    setValues((prevValues) => ({ ...prevValues, [key]: newValue }));
  };

  const calculateMonthlyPayment = (): number => {
    const { downPayment, interestRate, duration } = values;
    const loanAmount = downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = duration * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return Math.round(monthlyPayment);
  };

  const renderSlider = (
    label: string,
    icon: React.ElementType,
    unit: string,
    valueKey: ValueKeys
  ) => (
    <div className="flex gap-4  items-center w-full">
      {React.createElement(icon, { className: "h-8 w-8" })}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-muted-foreground text-sm font-normal">{label}</h3>
        <p className="text-sm text-secondary bg-white font-semibold p-2">
          {values[valueKey]} {unit}
        </p>
        <Slider
          {...sliderConfig[valueKey.replace(/([A-Z])/g, "_$1").toLowerCase()]}
          defaultValue={[
            sliderConfig[
              valueKey
                .replace(/([A-Z])/g, "_$1")
                .toLowerCase() as keyof typeof sliderConfig
            ].defaultValue,
          ]}
          onValueChange={(value) => updateValue(valueKey, value[0])}
        />
      </div>
    </div>
  );

  return (
    <Card className="border shadow-none rounded-xl bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg text-secondary font-medium">
          Mortage Calculator
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center w-full">
        {renderSlider("Down Payment", DownPaymentIcon, "", "downPayment")}
        {renderSlider("Interest Rate", InterstRateIcon, "%", "interestRate")}
        {renderSlider("Duration (Years)", DurationIcon, "Years", "duration")}
      </CardContent>
      <CardFooter className="w-full flex flex-col gap-1 items-start">
        <h3 className="text-secondary text-3xl font-semibold">
          {calculateMonthlyPayment()}{" "}
          <span className="text-muted-foreground text-sm font-normal">
            / Month
          </span>
        </h3>
        <p className="text-muted-foreground text-sm font-normal">
          is the monthly payment as per the given input
          <span className="text-purple-500 font-semibold">
            {" "}
            View detailed illustration
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}

export default MortageCalculator;
