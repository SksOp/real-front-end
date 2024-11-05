"use client";
import DataCards from "@/components/data-cards";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { dashboards } from "@/config/dashboards";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardDetailPage from "./[type]/page";
import { Tabs } from "@/components/ui/tabs";
import DashboardSelector from "@/components/dashboard-selector";
import DashboardData from "@/components/all-dashboard-data";

function DashboardPage() {
  const router = useRouter();
  return (
    <SecondaryNavbar page="dashboards" title="Dashboards">
      <div className="flex w-full justify-center ">
        <Tabs defaultValue={"all-dashboards"} className="flex flex-col w-full ">
          <div className="flex w-full items-center justify-center gap-5 mt-16 md:mt-20">
            <DashboardSelector />
          </div>
          <div className="flex gap-5 w-full">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-[calc(100vh-10rem)] md:overflow-y-auto ">
              <DashboardData />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-start gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              No Dashboard Selected
            </div>
            <div className="lg:flex hidden  max-w-md justify-center "></div>
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
    </SecondaryNavbar>
  );
}

export default DashboardPage;
