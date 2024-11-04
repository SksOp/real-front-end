"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import CalculatorCompareCard from "./calculator-compareCard";
import CalculatorResultCard from "./calculator-resultCard";
import { Home, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

function HomeAffordibilityCalculator({ inputs }: { inputs: any }) {
  const [scrollValue, setScrollValue] = useState(50);
  const [result, setResult] = useState<any>();

  const calculate = () => {
    const {
      monthly_debts,
      monthly_household_expenses,
      down_payment,
      mortgage_rate,
      mortgage_duration,
      available_monthly_savings,
    } = inputs;
    console.log("inputs", inputs);
    const monthlySavings =
      parseFloat(available_monthly_savings) * (scrollValue / 100);

    // Convert annual mortgage rate to monthly rate
    const monthlyRate = parseFloat(mortgage_rate) / 100 / 12;
    const totalPayments = parseFloat(mortgage_duration) * 12;
    console.log("totalPayments", monthlyRate);
    // Formula for total affordable price
    const affordable_price =
      parseFloat(down_payment) +
      (monthlySavings * (1 - Math.pow(1 + monthlyRate, -totalPayments))) /
        monthlyRate;

    const loanAmount = affordable_price - parseFloat(down_payment);
    const currentExpenses =
      parseFloat(monthly_debts) + parseFloat(monthly_household_expenses);
    // deduct montly emi for mortgage from available monthly savings

    const savingAfterMortgage =
      available_monthly_savings - affordable_price * monthlyRate;

    return {
      affordable_price: affordable_price.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      currentExpenses: currentExpenses.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      down_payment: parseFloat(down_payment).toFixed(2),
      savingAfterMortgage: savingAfterMortgage.toFixed(2),
    };
  };

  useEffect(() => {
    setResult(calculate());
  }, [scrollValue]);

  const walletScale = 1 + ((100 - scrollValue) / 100) * 0.5; // Scale from 1 to 1.5 as scrollValue increases
  const homeScale = 1 + (scrollValue / 100) * 0.5; // Scale from 1 to 1.5 as scrollValue decreases

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-full">
      <div className="w-full flex flex-col gap-0.5 px-1">
        <Label className="text-sm font-semibold text-secondary">
          Monthly Payment
        </Label>
        <Input
          type="text"
          className="border rounded-lg bg-card"
          value={result?.monthlySavings}
          onChange={(e) => setScrollValue(parseInt(e.target.value))}
        />
        {/* <div className="flex justify-between items-center mt-4">
          <Wallet
            className="transition-transform duration-300"
            style={{ transform: `scale(${walletScale})` }}
          />
          <Home
            className="transition-transform duration-300"
            style={{ transform: `scale(${homeScale})` }}
          />
        </div> */}
        <div className="relative mt-8">
          <div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-normal bg-muted-foreground py-1 px-2 rounded-lg text-white"
            style={{
              left: `calc(${Math.min(
                Math.max((scrollValue / 100) * 100, 10),
                90
              )}%)`,
            }}
          >
            {result?.monthlySavings}
          </div>
          <Slider
            value={[scrollValue]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => setScrollValue(val[0])}
            className="mt-4"
          />
        </div>
      </div>
      <CalculatorResultCard
        title={"You can afford a property up to,"}
        value={result?.affordable_price}
      />
      <CalculatorCompareCard
        title1={"Down Payment"}
        title2={"Total Loan Amount"}
        value1={result?.down_payment}
        value2={result?.loanAmount}
      />
      <CalculatorCompareCard
        title1={"Current Savings (Monthly)"}
        title2={"Current Expense (Monthly)"}
        value1={result?.monthlySavings}
        value2={result?.currentExpenses}
      />
      <CalculatorResultCard
        title={"Savings after Mortgage (Monthly)"}
        value={result?.savingAfterMortgage}
      />
    </div>
  );
}

export default HomeAffordibilityCalculator;
