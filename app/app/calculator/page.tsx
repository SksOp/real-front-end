"use client";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { useRouter } from "next/navigation";
import React from "react";

const data = [
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
  const router = useRouter();
  return (
    <SecondaryNavbar title="calculator">
      <div className="grid grid-cols-2 gap-3 px-3 pt-16 mb-4">
        {data.map((card) => (
          <DataCards
            key={card.id}
            bgColor="bg-[#FFFEFA]"
            onClick={() => router.push(`/app/calculator/${card.id}`)}
          >
            <h3 className="text-secondary font-semibold text-sm">
              {card.title}
            </h3>
            <p className="text-base text-muted-foreground font-normal leading-6">
              {card.description}
            </p>
          </DataCards>
        ))}
      </div>
    </SecondaryNavbar>
  );
}

export default CalculatorPage;
