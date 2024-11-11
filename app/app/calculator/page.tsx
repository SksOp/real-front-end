"use client";
import CalculatorSelector from "@/components/calculator-selector";
import ChartException from "@/components/chartException";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { Tabs } from "@/components/ui/tabs";
import { Calculators } from "@/config/calculators";
import { Calculator } from "@/config/types";
import Layout from "@/layout/secondary";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

function CalculatorPage() {
  return (
    <Layout page="calculators" title="calculators">
      <div className="flex w-full justify-center  ">
        <div defaultValue={"all-dashboards"} className="flex flex-col w-full ">
          <div className="flex gap-5 w-full mt-16 md:mt-20">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-screen md:overflow-y-auto ">
              <CalculatorSelector />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-center gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <ChartException />
            </div>
            <div className="lg:flex hidden  max-w-md justify-center "></div>
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
