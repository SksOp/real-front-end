import { Dashboard } from "@/config/types";
import Link from "next/link";
import React, { use, useEffect } from "react";
import DataCards from "./data-cards";
import { useParams, usePathname } from "next/navigation";
import { dashboards } from "@/config/dashboards";
import { TabsContent } from "./ui/tabs";
import { CompassIcon } from "@/public/svg/navIcons";
import { cn } from "@/lib/utils";

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
      <DataCards tag={dashboard.tag} className="bg-[#FFF0B296]">
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
        className={cn(
          "col-span-2 bg-background",
          selectedDashboard === dashboard.key &&
            "border-2 border-primary rounded-lg  "
        )}
      >
        <DataCards className="bg-background">
          <div className="flex justify-between items-center">
            <h3 className="text-secondary font-semibold text-base">
              {"Explore dubai from your own perspective"}
            </h3>
          </div>
          <p className="text-base text-muted-foreground font-normal leading-6">
            {"Sales? rental? we have it all covered."}
          </p>
          <span className="text-[#8177E5] text-base font-semibold">
            Explore now
          </span>
        </DataCards>
      </Link>
    ) : (
      <Link
        key={dashboard.key}
        href={`/app/dashboard/${dashboard.key}`}
        onClick={() => setSelectedDashboard(dashboard.key)}
        className={
          selectedDashboard === dashboard.key
            ? "border-2 border-secondary rounded-lg bg-background"
            : "md:bg-background"
        }
      >
        <DataCards>
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
  const yourDashboards = dashboards.map((dashboard) => createLink(dashboard));

  return (
    <div className="w-full md:border rounded-xl p-2">
      <TabsContent
        value="all-dashboards"
        className="md:flex md:flex-col grid grid-cols-2 gap-3 mt-0"
      >
        {allDashboards}
      </TabsContent>
      <TabsContent
        value="your-dashboards"
        className="md:flex md:flex-col grid grid-cols-2 gap-3  mt-0"
      >
        {yourDashboards}
      </TabsContent>
    </div>
  );
}

export default DashboardData;
