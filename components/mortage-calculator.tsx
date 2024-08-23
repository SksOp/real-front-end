import React from "react";
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

function MortageCalculator() {
  const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false);
  return (
    <Card className="border-0 mb-20">
      <CardHeader>
        <CardTitle>Mortage Calculator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Gravida augue aliquam
          interdum.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="flex justify-start gap-8 items-center w-full">
            <DownPaymentIcon />
            <div className="flex flex-col gap-2 items-start justify-center">
              <h3 className="text-muted-foreground">Down Payment</h3>
              <p className="text-lg text-secondary font-bold">12123300</p>
              {isCalculatorOpen && <Slider className="" />}
            </div>
          </div>
          <div className="flex justify-start gap-8 items-center w-full">
            <MonthlyPaymentIcon />
            <div className="flex flex-col gap-2 items-start justify-center">
              <h3 className="text-muted-foreground">Monthly Payment</h3>
              <p className="text-lg text-secondary font-bold">250000</p>
              {isCalculatorOpen && <Slider className="" />}
            </div>
          </div>
          <div className="flex justify-start gap-8 items-center w-full">
            <InterstRateIcon />
            <div className="flex flex-col gap-2 items-start justify-center">
              <h3 className="text-muted-foreground">Interest Rate</h3>
              <p className="text-lg text-secondary font-bold">4%</p>
              {isCalculatorOpen && <Slider className="" />}
            </div>
          </div>
          <div className="flex justify-start gap-8 items-center w-full">
            <DurationIcon />
            <div className="flex flex-col gap-2 items-start justify-center">
              <h3 className="text-muted-foreground">Duration (Years)</h3>
              <p className="text-lg text-secondary font-bold">25</p>
              {isCalculatorOpen && <Slider className="" />}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        {isCalculatorOpen ? (
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
        )}
      </CardFooter>
    </Card>
  );
}

export default MortageCalculator;
