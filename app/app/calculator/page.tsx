"use client";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { Calculators } from "@/config/calculators";
import { useRouter } from "next/navigation";
import React from "react";

function CalculatorPage() {
  const router = useRouter();
  return (
    <SecondaryNavbar page="calculators" title="calculators">
      <div className="grid grid-cols-2 gap-3 px-3 pt-16 mb-4">
        {Calculators.map((card) => (
          <DataCards
            key={card.key}
            bgColor="bg-[#FFFEFA]"
            onClick={() => router.push(`/app/calculator/${card.key}`)}
          >
            <h3 className="text-secondary font-semibold text-sm">
              {card.name}
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
