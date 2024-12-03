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
import { NoDataException } from "@/public/svg/exceptions";

function DashboardData() {
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
    dashboard.tag === "upcoming" ? (
      <DataCards tag={dashboard.tag} className="bg-[#FFFEFA] h-full">
        <h3 className="text-secondary font-semibold text-sm">
          {dashboard.name}
        </h3>
        <p className="text-base text-muted-foreground font-normal leading-6">
          {dashboard.description}
        </p>
      </DataCards>
    ) : dashboard.key === "explore" ? (
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
        </DataCards>
      </Link>
    ) : (
      <Link
        key={dashboard.key}
        href={`/app/dashboard/${dashboard.key}`}
        onClick={() => setSelectedDashboard(dashboard.key)}
        shallow={true}
      >
        <DataCards
          className={
            selectedDashboard === dashboard.key
              ? "border border-secondary rounded-lg bg-[#FEF8F5] h-full"
              : "bg-[#FFFEFA] h-full"
          }
        >
          <h3 className="text-secondary font-semibold text-sm">
            {dashboard.name}
          </h3>
          <p className="text-base text-muted-foreground font-normal leading-6">
            {dashboard.description}
          </p>
        </DataCards>
      </Link>
    );

  const allDashboards = dashboards.map((dashboard) => createLink(dashboard));
  const yourDashboards = dashboards
    .filter((dashboard) => dashboard.type === "custom")
    .map((dashboard) => createLink(dashboard));
  console.log(yourDashboards.length);

  return (
    <div className="w-full md:border rounded-xl p-2">
      <TabsContent
        value="all-dashboards"
        className="md:flex md:flex-col grid grid-cols-2 justify-items-stretch gap-3 mt-0 items-stretch"
      >
        {allDashboards}
      </TabsContent>
      <TabsContent
        value="your-dashboards"
        className="md:flex md:flex-col grid grid-cols-2 gap-3  mt-0"
      >
        {yourDashboards.length > 0 ? (
          yourDashboards
        ) : (
          <Exceptions
            svg={<NoDataException />}
            title="No data available for the selected filter"
            description="No data for the selected criteria. try changing the filters."
            className="col-span-2"
          />
        )}
      </TabsContent>
    </div>
  );
}

export default DashboardData;
