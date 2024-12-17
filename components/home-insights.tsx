import React from "react";
import DataCards from "./data-cards";
import { CalculatorIcon, DashboardIcon } from "@/public/svg/drawerIcons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";

function HomeInsights() {
  const router = useRouter();
  const auth = useAuth();
  return (
    <div className="w-full flex justify-center items-stretch h-full gap-3 ">
      {auth.user ? (
        <>
          <DataCards
            className="bg-[#EEFBFC]"
            onClick={() => router.push("/app/dashboard")}
          >
            <div className="flex flex-col gap-3">
              <DashboardIcon className="w-6 h-6" />
              <h3 className="text-secondary font-semibold text-sm ">
                Dashboards
              </h3>
              <p className="text-base text-muted-foreground font-normal">
                <span className="font-semibold">15+</span> dashboards for sales,
                rentals, commercial etc.
              </p>
            </div>
          </DataCards>
          <DataCards
            className="bg-[#EEFCEF]"
            onClick={() => router.push("/app/calculator")}
          >
            <div className="flex flex-col gap-3">
              <CalculatorIcon className="w-6 h-6" />
              <h3 className="text-secondary font-semibold text-sm ">
                Calculators
              </h3>
              <p className="text-base font-normal text-muted-foreground">
                <span className="font-semibold">10+</span> calculators to
                Estimate sales, rentals, ROI etc.
              </p>
            </div>
          </DataCards>
        </>
      ) : (
        <>
          <LoginTrigger className="">
            <DataCards className="bg-[#EEFBFC]">
              <div className="flex flex-col gap-3 text-left items-start">
                <DashboardIcon className="w-6 h-6" />
                <h3 className="text-secondary font-semibold text-sm ">
                  Dashboards
                </h3>
                <p className="text-base text-muted-foreground font-normal">
                  <span className="font-semibold">15+</span> dashboards for
                  sales, rentals, commercial etc.
                </p>
              </div>
            </DataCards>
          </LoginTrigger>
          <LoginTrigger>
            <DataCards className="bg-[#EEFCEF]">
              <div className="flex flex-col gap-3 text-left items-start">
                <CalculatorIcon className="w-6 h-6" />
                <h3 className="text-secondary font-semibold text-sm ">
                  Calculators
                </h3>
                <p className="text-base font-normal text-muted-foreground">
                  <span className="font-semibold">10+</span> calculators to
                  Estimate sales, rentals, ROI etc.
                </p>
              </div>
            </DataCards>
          </LoginTrigger>
        </>
      )}
    </div>
  );
}

export default HomeInsights;
