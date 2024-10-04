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
import CalculatorSwitchCard from "@/components/calculator-switch-card";
import { CircularUpIcon } from "@/public/svg/Indicator";

interface CalculatorDataItem {
  id: number;
  title: string;
  description: string;
}

const calculatorData: CalculatorDataItem[] = [
  {
    id: 1,
    title: "Sales Value Estimator",
    description:
      "Estimate current property sales value based on market trends and attributes.",
  },
  {
    id: 2,
    title: "Rental Value Estimator",
    description:
      "Calculate the optimal rental price using property features and market benchmarks.",
  },
  {
    id: 3,
    title: "Mortgage Payment Calculator",
    description:
      "Calculate mortgage payments, rates, and affordability for property financing.",
  },
  {
    id: 4,
    title: "Investment ROI Estimator",
    description:
      "Estimate property investment returns and future profitability for better decision-making.",
  },
  {
    id: 5,
    title: "Rent vs Buy Comparison Tool",
    description:
      "Compare financial benefits of renting versus buying a property over time.",
  },
  {
    id: 6,
    title: "Home Affordability Calculator",
    description:
      "Assess the budget and affordability of purchasing a property based on finances.",
  },
];

function CalculatorPage() {
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("input");
  const pathname = usePathname();
  const [dashboardId, setDashboardId] = useState<number | null>(null);

  // Initialize input values state
  const [inputValues, setInputValues] = useState<{
    [key: string]: any;
  }>({
    "Transaction Type": "",
    "Select Area": "",
    "Purchase Price": "",
    "Annual Rental Income": "",
    "Annual Appreciation Rate": 34000,
    "Holding Period": "",
    "Property Area": "",
    "Service Charges/Sqft": "",
    "Total Service Charge": "",
    "Maintenance Costs": 84000,
    "Property Management Fees": 40000,
    "Insurance Costs": 64000,
    "DLD Fee": "",
    "Dubai Land Department fees": "",
    "Other Fee": 34000,
  });

  // Initialize output state
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);

    if (!isNaN(id)) {
      setDashboardId(id);
    }
  }, [pathname]);

  const calculator = calculatorData.find((item) => item.id === dashboardId);

  const handleInputChange = (key: string, value: any) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
    <SecondaryNavbar title={calculator?.title ?? ""}>
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
              <CalculatorInputs
                title="Transaction Type"
                options={["Full Cash", "Mortgage"]}
                type="radio"
                value={inputValues["Transaction Type"]}
                onChange={(value) =>
                  handleInputChange("Transaction Type", value)
                }
              />

              <CalculatorInputs
                title="Select Area"
                type="select"
                placeholder="Select area"
                options={Area.MostPopularAreas}
                value={inputValues["Select Area"]}
                onChange={(value) => handleInputChange("Select Area", value)}
              />
              <CalculatorInputs
                title="Purchase Price"
                type="text"
                placeholder="Enter price"
                value={inputValues["Purchase Price"]}
                onChange={(value) => handleInputChange("Purchase Price", value)}
              />
              <CalculatorInputs
                title="Annual Rental Income"
                type="text"
                placeholder="Enter annual rental income"
                value={inputValues["Annual Rental Income"]}
                onChange={(value) =>
                  handleInputChange("Annual Rental Income", value)
                }
              />

              <CalculatorInputs
                title="Annual Appreciation Rate"
                isOptional
                type="slider"
                defaultValue="34000"
                value={inputValues["Annual Appreciation Rate"]}
                onChange={(value) =>
                  handleInputChange("Annual Appreciation Rate", value)
                }
              />
              <CalculatorInputs
                title="Holding Period"
                type="text"
                placeholder="Enter holding period"
                isOptional
                value={inputValues["Holding Period"]}
                onChange={(value) => handleInputChange("Holding Period", value)}
              />

              <Separator />

              <CalculatorSwitchCard title="Purchase Costs">
                <CalculatorInputs
                  title="Property Area"
                  type="text"
                  placeholder="Enter property area"
                  value={inputValues["Property Area"]}
                  onChange={(value) =>
                    handleInputChange("Property Area", value)
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <CalculatorInputs
                    title="Service Charges/Sqft"
                    type="text"
                    placeholder="Enter service charges/sqft"
                    value={inputValues["Service Charges/Sqft"]}
                    onChange={(value) =>
                      handleInputChange("Service Charges/Sqft", value)
                    }
                  />
                  <CalculatorInputs
                    title="Total Service Charge"
                    type="text"
                    placeholder="Enter total service charge"
                    value={inputValues["Total Service Charge"]}
                    onChange={(value) =>
                      handleInputChange("Total Service Charge", value)
                    }
                  />
                </div>
                <CalculatorInputs
                  type="slider"
                  title="Maintenance Costs"
                  defaultValue="84000"
                  value={inputValues["Maintenance Costs"]}
                  onChange={(value) =>
                    handleInputChange("Maintenance Costs", value)
                  }
                />
                <CalculatorInputs
                  type="slider"
                  title="Property Management Fees"
                  defaultValue="40000"
                  value={inputValues["Property Management Fees"]}
                  onChange={(value) =>
                    handleInputChange("Property Management Fees", value)
                  }
                />
                <CalculatorInputs
                  type="slider"
                  title="Insurance Costs"
                  defaultValue="64000"
                  value={inputValues["Insurance Costs"]}
                  onChange={(value) =>
                    handleInputChange("Insurance Costs", value)
                  }
                />
              </CalculatorSwitchCard>

              <CalculatorSwitchCard title="Annual Operating Expenses (AED)">
                <CalculatorInputs
                  title="DLD Fee"
                  type="text"
                  placeholder="Enter DLD fee"
                  value={inputValues["DLD Fee"]}
                  onChange={(value) => handleInputChange("DLD Fee", value)}
                />
                <CalculatorInputs
                  title="Dubai Land Department fees"
                  type="text"
                  placeholder="Enter Dubai land department fees"
                  value={inputValues["Dubai Land Department fees"]}
                  onChange={(value) =>
                    handleInputChange("Dubai Land Department fees", value)
                  }
                />
                <CalculatorInputs
                  title="Other Fee"
                  type="slider"
                  defaultValue="34000"
                  additionalTexts="Including Broker fee, Legal fee, Extro fee etc."
                  value={inputValues["Other Fee"]}
                  onChange={(value) => handleInputChange("Other Fee", value)}
                />
              </CalculatorSwitchCard>

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

                <Card className="border rounded-lg p-4 flex flex-col gap-3 w-full">
                  <h3 className="text-muted-foreground text-sm font-normal">
                    Total ROI
                  </h3>
                  <div className="flex gap-1">
                    <h3 className="text-secondary font-bold text-[1.6rem]">
                      2650000 AED
                    </h3>
                    <CircularUpIcon />
                    <span className="text-green-600 font-semibold text-sm">
                      200 %
                    </span>
                  </div>
                </Card>

                <Card className="border rounded-lg bg-background p-4 flex items-center justify-center gap-5 w-full">
                  <div className="flex items-start justify-center gap-2">
                    <div className="bg-green-400 flex-shrink-0 w-2 h-2 rounded-full mt-1" />
                    <div className="flex flex-col gap-1 ">
                      <h3 className="text-muted-foreground text-sm font-normal">
                        Annualized Capital Apprecition
                      </h3>
                      <h3 className="text-secondary font-bold text-lg">
                        2650 AED
                      </h3>
                    </div>
                  </div>
                  <div className="h-16 bg-border shrink-0  w-[1px]" />
                  <div className="flex items-start justify-center gap-2">
                    <div className="bg-secondary flex-shrink-0 w-2 h-2 rounded-full mt-1" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-muted-foreground text-sm font-normal">
                        Annual rental income
                      </h3>
                      <h3 className="text-secondary font-bold text-lg">
                        2650 AED
                      </h3>
                    </div>
                  </div>
                </Card>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </SecondaryNavbar>
  );
}

export default CalculatorPage;
