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
import HomeMatrics from "@/components/home-matrics";
import {
  HomeAgencyItems,
  HomeMatricsItems,
  HomeToolsItems,
} from "@/constants/homeItems";

function DashboardPage() {
  const router = useRouter();
  return (
    <Layout page="dashboards" title="Dashboards">
      <div className="flex w-full justify-center pt-12  md:pt-20 px-4 ">
        <Tabs
          defaultValue={"standard"}
          className="flex flex-col gap-4   w-full md:p-3 md:pb-0 border-0 md:border rounded-xl"
        >
          <DashboardSelector />
          <DashboardData />
        </Tabs>
      </div>
    </Layout>
  );
}

export default DashboardPage;
