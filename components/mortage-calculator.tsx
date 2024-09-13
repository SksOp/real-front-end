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
  MonthlyPaymentIcon,
} from "@/public/svg/mortageCalculatorIcon";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

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

function MortageCalculator() {
  const [downPayment, setDownPayment] = useState<number>(
    sliderConfig["down_payment"].defaultValue
  );
  const [interestRate, setInterestRate] = useState<number>(
    sliderConfig["interest_rate"].defaultValue
  );
  const [duration, setDuration] = useState<number>(
    sliderConfig["duration"].defaultValue
  );

  const calculateMonthlyPayment = (): number => {
    const loanAmount = downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = duration * 12;

    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return Math.round(monthlyPayment);
  };

  return (
    <Card className="border-2 rounded-xl  mb-20">
      <CardHeader>
        <CardTitle className="font-medium">Mortage Calculator</CardTitle>
        <CardDescription className="text-muted-foreground font-medium">
          Lorem ipsum dolor sit amet consectetur. Gravida augue aliquam
          interdum.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="flex justify-start gap-8 items-center w-full">
            <DownPaymentIcon />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h3 className="text-muted-foreground ">Down Payment</h3>
              <p className="text-lg text-secondary bg-white w-full font-bold p-2">
                {downPayment}
              </p>
              <Slider
                max={sliderConfig["down_payment"].max}
                min={sliderConfig["down_payment"].min}
                step={sliderConfig["down_payment"].step}
                defaultValue={[sliderConfig["down_payment"].defaultValue]}
                onValueChange={(value) => setDownPayment(value[0])}
                className=""
              />
            </div>
          </div>
          {/* <div className="flex justify-start gap-8 items-center w-full">
            <MonthlyPaymentIcon />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h3 className="text-muted-foreground">Monthly Payment</h3>
              <p className="text-lg text-secondary bg-white w-full font-bold p-2">
                250000
              </p>
              {isCalculatorOpen && <Slider className="" />}
            </div>
          </div> */}
          <div className="flex justify-start gap-8 items-center w-full">
            <InterstRateIcon />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h3 className="text-muted-foreground">Interest Rate</h3>
              <p className="text-lg text-secondary bg-white w-full font-bold p-2">
                {interestRate}%
              </p>
              <Slider
                max={sliderConfig["interest_rate"].max}
                min={sliderConfig["interest_rate"].min}
                step={sliderConfig["interest_rate"].step}
                defaultValue={[sliderConfig["interest_rate"].defaultValue]}
                onValueChange={(value) => setInterestRate(value[0])}
                className=""
              />
            </div>
          </div>
          <div className="flex justify-start gap-8 items-center w-full">
            <DurationIcon />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h3 className="text-muted-foreground">Duration (Years)</h3>
              <p className="text-lg text-secondary bg-white w-full font-bold p-2">
                {duration} Years
              </p>
              <Slider
                max={sliderConfig["duration"].max}
                min={sliderConfig["duration"].min}
                step={sliderConfig["duration"].step}
                defaultValue={[sliderConfig["duration"].defaultValue]}
                onValueChange={(value) => setDuration(value[0])}
                className=""
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-col gap-1 justify-center items-start">
        <h3 className="text-secondary text-3xl font-bold">
          {calculateMonthlyPayment()}{" "}
          <span className="text-muted-foreground text-base font-medium">
            / Month
          </span>
        </h3>
        <p className="text-muted-foreground text-base font-medium">
          is the monthly payment as per the given input
          <span className="text-primary font-semibold">
            {" "}
            View detailed illustration
          </span>
        </p>

        {/* {isCalculatorOpen ? (
          <Button
            variant={"secondary"}
            className="text-primary-foreground hover:bg-secondary py-8 font-bold rounded-lg border-2 w-full"
            onClick={() => setIsCalculatorOpen(false)}
          >
            Calculate
          </Button>
        ) : (
          <Button
            variant={"ghost"}
            className=" text-secondary font-bold py-8 rounded-lg border-2 w-full"
            onClick={() => setIsCalculatorOpen(true)}
          >
            Change Parameter
          </Button>
        )} */}
      </CardFooter>
    </Card>
  );
}

export default MortageCalculator;
