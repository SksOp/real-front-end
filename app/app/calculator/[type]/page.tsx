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
import { usePathname } from "next/navigation";
import CalculatorOutputs from "@/components/calculator-outputs";
import CalculatorCompareCard from "@/components/calculator-compareCard";
import { Calculator, InputField } from "@/config/types";
import { Calculators } from "@/config/calculators";

function CalculatorPage() {
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("input");
  const pathname = usePathname();
  const [calculator, setCalculator] = useState<Calculator | undefined>(
    undefined
  );
  const [results, setResults] = useState<{ [key: string]: any }>({});
  const [inputValues, setInputValues] = useState<{
    [key: string]: any;
  }>({});
  const [output, setOutput] = useState<string>("");
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
    const pathSegments = pathname.split("/");
    const key = pathSegments[pathSegments.length - 1];

    if (key) {
      const selectedCalculator = Calculators.find((calc) => calc.key === key);
      console.log(selectedCalculator);
      // Initialize input values based on the selected calculator's configuration
      if (selectedCalculator) {
        const initialInputValues: { [key: string]: any } = {};

        selectedCalculator.inputs.forEach((input) => {
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
                  switchValues[nestedInput.key] =
                    nestedInput.default_value || "";
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

  const handleCalculate = async () => {
    if (!calculator) return; // Ensure calculator is selected
    console.log("inputttt", inputValues);
    // Use the calculator's calculate function to get output
    const result = await calculator.calculate(inputValues);
    setResults(result);
    console.log("resultsss", results);

    setOutput(
      `Monthly EMI: AED ${result.emi}, Total Interest: AED ${result.total_interest}`
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
    </SecondaryNavbar>
  );
}

export default CalculatorPage;
