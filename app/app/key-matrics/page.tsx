"use client";
import ChartException from "@/components/chartException";
import MatricesData from "@/components/matrices-data";
import MatricesSelector from "@/components/matrices-selector";
import { Tabs } from "@/components/ui/tabs";
import Layout from "@/layout/secondary";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function KeyMatricesPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";

  return (
    <Layout page="key-matrices" title="Key Matrices">
      <div className="flex w-full justify-center ">
        <Tabs defaultValue={tab} className="flex flex-col w-full px-2">
          <div className="flex w-full items-center justify-center gap-5 mt-14 md:mt-20 md:mb-2">
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
