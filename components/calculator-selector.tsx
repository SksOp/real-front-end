import { Calculators } from "@/config/calculators";
import { Calculator } from "@/config/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import DataCards from "./data-cards";

function CalculatorSelector() {
  const { type } = useParams<{ type: string }>();
  const [selectedCalculator, setSelectedCalculator] = React.useState<
    string | null
  >(Calculators.find((calculator) => calculator.key === type)?.key || null);

  const createLink = (calculator: Calculator) =>
    calculator.tag === "upcoming" ? (
      <DataCards tag={calculator.tag} className="bg-[#FFFEFA]">
        <h3 className="text-secondary font-semibold text-sm">
          {calculator.name}
        </h3>
        <p className="text-base text-muted-foreground font-normal leading-6">
          {calculator.description}
        </p>
      </DataCards>
    ) : (
      <Link
        key={calculator.key}
        href={`/app/calculator/${calculator.key}`}
        onClick={() => setSelectedCalculator(calculator.key)}
      >
        <DataCards
          className={
            selectedCalculator === calculator.key
              ? "border border-secondary rounded-lg bg-[#FEF8F5]"
              : "bg-[#FFFEFA]"
          }
        >
          <h3 className="text-secondary font-semibold text-sm">
            {calculator.name}
          </h3>
          <p className="text-base text-muted-foreground font-normal leading-6">
            {calculator.description}
          </p>
        </DataCards>
      </Link>
    );

  const allCalculators = Calculators.map((calculator) =>
    createLink(calculator)
  );
  return (
    <div className="md:flex md:flex-col grid grid-cols-2 md:border rounded-xl  gap-3 p-2">
      {allCalculators}
    </div>
  );
}

export default CalculatorSelector;
