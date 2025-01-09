import { Dashboard } from "@/config/types";
import Link from "next/link";
import React, { use, useEffect } from "react";
import DataCards from "./data-cards";
import { useParams, usePathname } from "next/navigation";
import { dashboards } from "@/config/dashboards";
import { TabsContent } from "./ui/tabs";
import { CompassIcon } from "@/public/svg/navIcons";
import { cn } from "@/lib/utils";
import Exceptions from "./exceptions";
import { NoDataException, PremiumException } from "@/public/svg/exceptions";
import { ExploreIcon } from "@/public/svg/mortageCalculatorIcon";
import IntoCard from "./intoCard";
import { TransactionInsightLogo } from "@/public/svg/insights";
import HomeMatrics from "./home-matrics";
import { HomeMatricsItems } from "@/constants/homeItems";
import {
  GenericGrowthDashboards,
  PeriodicDashboards,
  RentalDashboards,
  SalesDashboards,
  SupplyAndOffPlanDashboards,
} from "@/constants/dashboards";
import { ClassValue } from "clsx";

function DashboardData({ className }: { className?: ClassValue }) {
  const { type } = useParams<{ type: string }>();
  const pathname = usePathname();
  const [selectedDashboard, setSelectedDashboard] = React.useState<
    string | null
  >(dashboards.find((dashboard) => dashboard.key === type)?.key || null);

  useEffect(() => {
    const url = pathname.split("/").findLast((url) => url !== "");
    console.log(url);
    if (url === "explore") {
      setSelectedDashboard("explore");
    }
  }, [pathname]);

  const createLink = (dashboard: Dashboard) =>
    dashboard.key === "explore" ? (
      <Link
        key={dashboard.key}
        href={`/app/dashboard/explore`}
        onClick={() => setSelectedDashboard(dashboard.key)}
        className={cn("col-span-2 bg-background")}
        shallow={true}
      >
        <DataCards
          className={
            selectedDashboard === dashboard.key
              ? "border border-secondary rounded-lg bg-[#FEF8F5] h-full"
              : "bg-[#FFFEFA] h-full"
          }
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-secondary font-semibold text-base">
                  {"Explore dubai from your own perspective"}
                </h3>
              </div>
              <p className="text-base text-muted-foreground font-normal leading-6">
                {"Sales? rental? we have it all covered."}
              </p>
              <span className="text-sm font-semibold text-primary cursor-pointer">
                Explore now
              </span>
            </div>
            <ExploreIcon />
          </div>
        </DataCards>
      </Link>
    ) : (
      <Link
        key={dashboard.key}
        href={`/app/dashboard/${dashboard.key}`}
        onClick={() => setSelectedDashboard(dashboard.key)}
        shallow={true}
      >
        <IntoCard
          title={dashboard.name}
          description={dashboard.description}
          avatar={<TransactionInsightLogo />}
          linkto={`/app/dashboard/${dashboard.key}`}
        />
      </Link>
    );

  const allDashboards = dashboards.map((dashboard) => createLink(dashboard));
  const yourDashboards = dashboards
    .filter((dashboard) => dashboard.type === "custom")
    .map((dashboard) => createLink(dashboard));
  console.log(yourDashboards.length);

  return (
    <div className="w-full">
      <TabsContent value="standard" className={"flex flex-col gap-3 mt-0 "}>
        <HomeMatrics
          title="Sales Insights"
          items={SalesDashboards}
          className={className}
          selectedCard={selectedDashboard}
        />
        <HomeMatrics
          title="Rental Insights"
          items={RentalDashboards}
          className={className}
          selectedCard={selectedDashboard}
        />
        <HomeMatrics
          title="Current/Planned Supply(Ready & Offplan)"
          items={SupplyAndOffPlanDashboards}
          className={className}
          selectedCard={selectedDashboard}
        />
        <HomeMatrics
          title="Periodic Dashboards"
          items={PeriodicDashboards}
          className={className}
          selectedCard={selectedDashboard}
        />
        <HomeMatrics
          title="Generic Growth Dashboards"
          items={GenericGrowthDashboards}
          className={className}
          selectedCard={selectedDashboard}
        />
      </TabsContent>
      <TabsContent value="custom" className={"flex flex-col gap-3 mt-0 "}>
        {yourDashboards.length > 0 ? (
          yourDashboards
        ) : (
          <Exceptions
            svg={<PremiumException />}
            title="This feature isn’t yet enabled for your agency."
            description="Don't worry, it's free! You or your agency admin can contact us to enable this feature. Branding, custom dashboards, tons of other features tailored for agency;"
            className="col-span-2"
            buttonText="Whatsapp Support"
          />
        )}
      </TabsContent>
    </div>
  );
}

export default DashboardData;
