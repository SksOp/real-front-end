"use client";
import CalculatorSelector from "@/components/calculator-selector";
import ChartException from "@/components/chartException";
import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { SelectDataException } from "@/public/svg/exceptions";
import React from "react";

function CalculatorPage() {
  return (
    <Layout page="calculators" title="Calculators">
      <div className="flex w-full justify-center  ">
        <div className="flex flex-col w-full ">
          <div className="flex gap-5 w-full pt-12 md:pt-20 px-2">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
              <CalculatorSelector />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-center gap-3 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
              <Exceptions
                svg={<SelectDataException />}
                title="Selected details will showup here."
                description="any drill down insights / selection will be shown here."
              />
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-1 md:w-[30%] gap-3 px-3 pt-16 mb-4">
          {dashboards.map((card) => (
            <DataCards
              key={card.key}
              bgColor="bg-[#FFFEFA]"
              onClick={() => router.push(`/app/dashboard/${card.key}`)}
            >
              <h3 className="text-secondary font-semibold text-sm">
                {card.name}
              </h3>
              <p className="text-base text-muted-foreground font-normal leading-6">
                {card.description}
              </p>
            </DataCards>
          ))}
        </div> */}
      </div>
      {/* <div className="grid grid-cols-2 gap-3 px-3 pt-16 mb-4">
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
      </div> */}
    </Layout>
  );
}

export default CalculatorPage;
