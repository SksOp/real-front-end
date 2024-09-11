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
                12123300
              </p>
              <Slider className="" />
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
                4%
              </p>
              <Slider className="" />
            </div>
          </div>
          <div className="flex justify-start gap-8 items-center w-full">
            <DurationIcon />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h3 className="text-muted-foreground">Duration (Years)</h3>
              <p className="text-lg text-secondary bg-white w-full font-bold p-2">
                25 Years
              </p>
              <Slider className="" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-col gap-1 justify-center items-start">
        <h3 className="text-secondary text-3xl font-bold">
          250000{" "}
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
