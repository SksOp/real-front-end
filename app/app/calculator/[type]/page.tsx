"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CalculatorPropertySelector from "@/components/calculator-property-selector";
import CalculatorInputs from "@/components/calculator-inputs";
import SecondaryNavbar from "@/components/secondaryNavbar";
import Filters from "@/components/filters";
import { useParams, usePathname } from "next/navigation";
import CalculatorOutputs from "@/components/calculator-outputs";
import CalculatorCompareCard from "@/components/calculator-compareCard";
import { Calculator, InputField } from "@/config/types";
import { Calculators } from "@/config/calculators";
import Layout from "@/layout/secondary";
import CalculatorSelector from "@/components/calculator-selector";
import { XIcon } from "lucide-react";

function CalculatorPage() {
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("input");
  const { type } = useParams();
  const [calculator, setCalculator] = useState<Calculator | undefined>(
    Calculators.find((item) => item.key === type)
  );
  const [results, setResults] = useState<{ [key: string]: any }>({});
  const [inputValues, setInputValues] = useState<{
    [key: string]: any;
  }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (!calculator) return;

    const newInputValues = { ...inputValues };
    let hasComputedChange = false; // Flag to track if any auto-computed value changes

    calculator.inputs.forEach((input) => {
      if (input.type === "read_only_auto_compute" && input.calculateFrom) {
        const calculateFromValues = input.calculateFrom.map(
          (key) => inputValues[key]
        );

        // Check if all dependencies (calculateFrom) are defined
        if (calculateFromValues.every((value) => value !== undefined)) {
          if (input.calculateValue) {
            // Perform the computation using the provided calculateValue function
            const computedValue = input.calculateValue(calculateFromValues);

            const roundedValue = parseFloat(computedValue).toFixed(2);

            // Only update if the computed value is different from the current value
            if (newInputValues[input.key] !== roundedValue) {
              newInputValues[input.key] = roundedValue;
              hasComputedChange = true; // Flag that there's a change
            }
          }
        }
      }
    });

    // Only update the input values if any auto-computed value changed
    if (hasComputedChange) {
      setInputValues(newInputValues);
    }

    if (calculator) {
      const allMandatoryFilled = calculator.inputs.every(
        (input) =>
          !input.is_mandatory || (input.is_mandatory && inputValues[input.key])
      );
      setIsButtonDisabled(!allMandatoryFilled);
    }
  }, [inputValues, calculator]);

  useEffect(() => {
    // Initialize input values based on the selected calculator's configuration
    if (calculator) {
      const initialInputValues: { [key: string]: any } = {};

      calculator.inputs.forEach((input) => {
        if (input.type === "switch") {
          // Initialize an object for the switch type inputs
          const switchValues: { [key: string]: any } = {};

          // Ensure options exist and are of type InputField[]
          if (
            Array.isArray(input.options) &&
            typeof input.options[0] === "object"
          ) {
            (input.options as InputField[]).forEach(
              (nestedInput: InputField) => {
                switchValues[nestedInput.key] = nestedInput.default_value || "";
              }
            );
          }

          // Store the nested switch values
          initialInputValues[input.key] = switchValues;
        } else {
          // For other types, store the default value directly
          initialInputValues[input.key] = input.default_value || "";
        }
      });
      setInputValues(initialInputValues);
    }
  }, [calculator]);

  // const calculator = calculatorData.find((item) => item.id === dashboardId);

  const handleInputChange = (key: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(inputValues);

  const handleCalculate = async () => {
    if (!calculator) return; // Ensure calculator is selected
    console.log("inputttt", inputValues);
    // Use the calculator's calculate function to get output
    const result = await calculator.calculate(inputValues);
    if (result && Object.keys(result).length > 0) {
      setResults(result);
      console.log("Results:", result);

      // Now set showOutput to true and open the output accordion
      setShowOutput(true);
      setActiveAccordion("output");
    }
  };

  return (
    <Layout page="calculators" title={calculator?.name ?? ""}>
      <div className="w-full p-4 pt-12 md:hidden">
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
                <>
                  {input.type === "read_only_auto_compute" ? (
                    <CalculatorInputs
                      key={input.key}
                      uniqueKey={input.key}
                      type={input.type}
                      title={input.label}
                      value={inputValues[input.key]}
                      searchable={input.searchable}
                      onChange={(value) => handleInputChange(input.key, value)}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      options={input.options}
                      source={input.source}
                      is_mandatory={input.is_mandatory}
                      placeholder={input.placeholder ?? "Enter value"}
                      default_value={input.default_value}
                      additionalTexts={input.helper_text}
                    />
                  ) : (
                    <CalculatorInputs
                      key={input.key}
                      uniqueKey={input.key}
                      type={input.type}
                      title={input.label}
                      value={inputValues[input.key]}
                      searchable={input.searchable}
                      onChange={(value) => handleInputChange(input.key, value)}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      options={input.options}
                      source={input.source}
                      is_mandatory={input.is_mandatory}
                      placeholder={input.placeholder ?? "Enter value"}
                      default_value={input.default_value}
                      additionalTexts={input.helper_text}
                    />
                  )}
                </>
              ))}

              <div className="w-full mt-4">
                <Button
                  variant={"secondary"}
                  className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-full h-14 rounded-xl border"
                  onClick={handleCalculate}
                  disabled={isButtonDisabled}
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
                {calculator?.outputs.map((output) => (
                  <CalculatorOutputs
                    key={output.key}
                    type={output.type}
                    title={output.label}
                    value={results[output.key]}
                    secondary_output={output.secondary_output}
                    chartConfig={output?.chartConfig}
                    output={results}
                    secondaryValue={
                      results[output?.secondary_output?.key ?? ""] ?? 0
                    }
                    subChart={output?.subChart}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>

      <div className="md:flex w-full justify-between hidden ">
        <div className="flex gap-5 w-full pt-12 md:pt-20 px-2">
          {/* Calculator Selector */}
          <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
            <CalculatorSelector />
          </div>

          {/* Inputs Section */}
          <div className="md:flex md:flex-col md:w-1/3 hidden flex-grow items-center justify-start gap-3 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto px-2">
            <Accordion
              type="single"
              defaultValue="input"
              className="w-full"
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
                      uniqueKey={input.key}
                      type={input.type}
                      title={input.label}
                      value={inputValues[input?.key]}
                      searchable={input.searchable}
                      onChange={(value) => handleInputChange(input.key, value)}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      options={input.options}
                      source={input.source}
                      is_mandatory={input.is_mandatory}
                      placeholder={input.placeholder ?? "Enter value"}
                      default_value={input.default_value}
                      additionalTexts={input.helper_text}
                    />
                  ))}

                  {/* Calculate Button */}
                  <div className="w-full flex justify-end items-center gap-4 pt-4">
                    <Button
                      variant={"outline"}
                      className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-1/4 h-14 rounded-xl border"
                      // onClick={}
                    >
                      Clear All
                    </Button>
                    <Button
                      variant={"secondary"}
                      className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-1/4 h-14 rounded-xl border"
                      onClick={handleCalculate}
                      disabled={isButtonDisabled}
                    >
                      Calculate
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Output Section */}
          {showOutput && (
            <div className="lg:flex md:w-1/3 hidden max-w-md justify-center md:max-h-[calc(100vh-7rem)] md:overflow-y-auto  ">
              {/* Close Button */}
              <XIcon
                className="absolute top-2 right-2 border-0 cursor-pointer"
                onClick={() => setShowOutput(false)}
              />

              {/* Output Content */}
              <div className="flex flex-col items-start justify-start gap-4 w-full mt-4">
                <h3 className="text-lg font-semibold text-secondary">
                  Calculation Result
                </h3>
                {calculator?.outputs.map((output) => (
                  <CalculatorOutputs
                    key={output.key}
                    type={output.type}
                    title={output.label}
                    value={results[output?.key] ?? []}
                    secondary_output={output.secondary_output}
                    chartConfig={output?.chartConfig}
                    output={results}
                    secondaryValue={
                      results[output?.secondary_output?.key ?? ""] ?? 0
                    }
                    subChart={output?.subChart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CalculatorPage;
