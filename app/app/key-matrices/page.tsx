"use client";
import ChartWrapper from "@/components/chart/chartWrapper";
import ChartException from "@/components/chartException";
import DashboardCharts from "@/components/dashboard-charts";
import KeyMatricesCard from "@/components/keyMatricesCard";
import MatricesData from "@/components/matrices-data";
import MatricesSelector from "@/components/matrices-selector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { KeyMatrices, Matrix } from "@/config/matrices";
import { ChartDescription, MatrixData } from "@/config/types";
import Layout from "@/layout/secondary";
import Link from "next/link";
import React, { useState } from "react";

function KeyMatricesPage() {
  const [selectedChart, setSelectedChart] = useState<
    ChartDescription | MatrixData | null
  >(null);

  return (
    <Layout page="key-matrices" title="Key Matrices">
      <div className="flex w-full justify-center ">
        <Tabs defaultValue={"all"} className="flex flex-col w-full px-2">
          <div className="flex w-full items-center justify-center gap-5 mt-14 md:mt-20">
            <MatricesSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-10rem)] md:overflow-y-auto ">
              <MatricesData />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-center gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <ChartException />
            </div>
            <div className="lg:flex hidden  max-w-md justify-center "></div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default KeyMatricesPage;
