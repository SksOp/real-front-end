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
      mortgage_duration,
      available_monthly_savings,
    } = inputs;

    const monthlySavings =
      parseFloat(available_monthly_savings) * (scrollValue / 100);

    const affordable_price = monthlySavings * 5 + down_payment;
    const loanAmount = affordable_price - parseFloat(down_payment);
    const currentExpenses = monthly_debts + monthly_household_expenses;

    return {
      affordable_price: parseFloat(affordable_price).toFixed(2),
      loanAmount,
      currentExpenses: parseFloat(currentExpenses).toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      down_payment: parseFloat(down_payment).toFixed(2),
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
        <div className="flex justify-between items-center mt-4">
          <Wallet
            className="transition-transform duration-300"
            style={{ transform: `scale(${walletScale})` }}
          />
          <Home
            className="transition-transform duration-300"
            style={{ transform: `scale(${homeScale})` }}
          />
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
        value={result?.affordable_price}
      />
    </div>
  );
}

export default HomeAffordibilityCalculator;
