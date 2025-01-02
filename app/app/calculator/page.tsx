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
      <div className="flex w-full justify-center pt-12  md:pt-20 px-4 ">
        <div className="flex flex-col gap-4   w-full md:p-3  border-0 md:border rounded-xl">
          <CalculatorSelector />
        </div>
      </div>
    </Layout>
  );
}

export default CalculatorPage;
