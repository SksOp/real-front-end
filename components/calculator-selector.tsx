import { Calculators } from "@/config/calculators";
import { Calculator } from "@/config/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import DataCards from "./data-cards";
import { SalesDashboards } from "@/constants/dashboards";
import HomeMatrics from "./home-matrics";
import { CalculatorsItems } from "@/constants/calculators";
import { ClassValue } from "clsx";

function CalculatorSelector({ className }: { className?: ClassValue }) {
  const { type } = useParams<{ type: string }>();
  const [selectedCalculator, setSelectedCalculator] = React.useState<
    string | null
  >(Calculators.find((calculator) => calculator.key === type)?.key || null);

  const createLink = (calculator: Calculator) => (
    <Link
      key={calculator.key}
      href={`/app/calculator/${calculator.key}`}
      onClick={() => setSelectedCalculator(calculator.key)}
    >
      <DataCards
        tag={calculator.tag}
        className={
          selectedCalculator === calculator.key
            ? "border border-secondary rounded-lg bg-[#FEF8F5] h-full"
            : "bg-[#FFFEFA] h-full"
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
    <div className="flex flex-col gap-3 mt-0 ">
      <HomeMatrics
        title="All Calculators"
        items={CalculatorsItems}
        className={className}
        selectedCard={selectedCalculator}
      />
    </div>
  );
}

export default CalculatorSelector;
