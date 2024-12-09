"use client";
import DataCards from "@/components/data-cards";
import { dashboards } from "@/config/dashboards";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardDetailPage from "./[type]/page";
import { Tabs } from "@/components/ui/tabs";
import DashboardSelector from "@/components/dashboard-selector";
import DashboardData from "@/components/all-dashboard-data";
import SecondaryNavbar from "@/layout/secondary/nav/navbar";
import Layout from "@/layout/secondary";
import ChartException from "@/components/chartException";
import Exceptions from "@/components/exceptions";
import { SelectDataException } from "@/public/svg/exceptions";

function DashboardPage() {
  const router = useRouter();
  return (
    <Layout page="dashboards" title="Dashboards">
      <div className="flex w-full justify-center ">
        <Tabs defaultValue={"standard"} className="flex flex-col w-full px-2">
          <div className="flex w-full gap-5 pt-12 md:pt-20">
            <DashboardSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-7rem)] md:overflow-y-auto ">
              <DashboardData />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-center gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              <Exceptions
                svg={<SelectDataException />}
                title="No data available for the selected filter"
                description="No data for the selected criteria. try changing the filters."
              />
            </div>
          </div>
        </Tabs>
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
    </Layout>
  );
}

export default DashboardPage;
