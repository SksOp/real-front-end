"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Area } from "@/constants/area";
import { Button } from "@/components/ui/button";
import CalculatorPropertySelector from "@/components/calculator-property-selector";
import CalculatorInputs from "@/components/calculator-inputs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import SecondaryNavbar from "@/components/secondaryNavbar";
import Filters from "@/components/filters";
import { usePathname } from "next/navigation";
import CalculatorOutputs from "@/components/calculator-outputs";
import CalculatorCompareCard from "@/components/calculator-compareCard";
import { Calculator } from "@/config/types";
import { Calculators } from "@/config/calculators";

function CalculatorPage() {
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("input");
  const pathname = usePathname();
  const [calculator, setCalculator] = useState<Calculator | undefined>(
    undefined
  );

  // Initialize input values state
  const [inputValues, setInputValues] = useState<{
    [key: string]: any;
  }>({});

  // Initialize output state
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const key = pathSegments[pathSegments.length - 1];

    if (key) {
      const selectedCalculator = Calculators.find((calc) => calc.key === key);

      // Initialize input values based on the selected calculator's configuration
      if (selectedCalculator) {
        const initialInputValues: { [key: string]: any } = {};
        selectedCalculator.inputs.forEach((input) => {
          initialInputValues[input.key] = input.default_value || "";
        });
        setCalculator(selectedCalculator);
        setInputValues(initialInputValues);
      }
    }
  }, [pathname]);

  // const calculator = calculatorData.find((item) => item.id === dashboardId);

  const handleInputChange = (key: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(inputValues);

  const handleCalculate = () => {
    // Implement your calculation logic here using inputValues
    // For demonstration, let's concatenate some values
    const {
      "Transaction Type": transactionType,
      "Select Area": selectArea,
      "Purchase Price": purchasePrice,
      "Annual Rental Income": annualRentalIncome,
      "Annual Appreciation Rate": annualAppreciationRate,
      "Holding Period": holdingPeriod,
      // ... other fields
    } = inputValues;

    // Example calculation (replace with actual logic)
    const estimatedValue =
      parseFloat(purchasePrice) *
      (1 + parseFloat(annualAppreciationRate) / 100);

    setOutput(
      `Estimated Value after holding period: AED ${estimatedValue.toFixed(2)}`
    );
    setShowOutput(true);
    setActiveAccordion("output");
  };

  return (
    <SecondaryNavbar title={calculator?.name ?? ""}>
      <div className="w-full p-4 pt-12">
        <Accordion
          type="single"
          defaultValue="input"
          value={activeAccordion}
          onValueChange={setActiveAccordion}
          collapsible
        >
          <AccordionItem value="input">
            <AccordionTrigger className="text-base text-secondary w-full font-semibold">
              Inputs
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-start justify-center gap-5 w-full">
              <CalculatorPropertySelector />

              {calculator?.inputs.map((input) => (
                <CalculatorInputs
                  key={input.key}
                  type={input.type}
                  title={input.label}
                  value={inputValues[input.key]}
                  onChange={(value) => handleInputChange(input.key, value)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  options={input.options}
                  is_mandatory={input.is_mandatory}
                  placeholder={input.placeholder ?? "Enter value"}
                  default_value={input.default_value}
                />
              ))}

              {/* {Calculators[0].inputs.map((input) => (
                <CalculatorInputs
                  key={input.key}
                  type={input.type}
                  title={input.title}
                  value={inputValues[input.key]}
                  onChange={(value) => handleInputChange(input.key, value)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                />
              ))} */}

              <div className="w-full mt-4">
                <Button
                  variant={"secondary"}
                  className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-xl border"
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          {showOutput && (
            <AccordionItem value="output">
              <AccordionTrigger className="text-base text-secondary w-full font-semibold">
                Output
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start justify-center gap-4 w-full">
                <p>{output}</p>
                <CalculatorOutputs
                  type="resultCard"
                  title="Estimated Value"
                  value={1562654}
                  percentage={10}
                />
                <CalculatorCompareCard
                  title1="Estimated Value"
                  title2="Market Value"
                  value1={15654}
                  value2={15554}
                />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </SecondaryNavbar>
  );
}

export default CalculatorPage;
