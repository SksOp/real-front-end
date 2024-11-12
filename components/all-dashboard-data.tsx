import { Dashboard } from "@/config/types";
import Link from "next/link";
import React from "react";
import DataCards from "./data-cards";
import { useParams } from "next/navigation";
import { dashboards } from "@/config/dashboards";
import { TabsContent } from "./ui/tabs";

function DashboardData() {
  const { type } = useParams<{ type: string }>();
  const [selectedDashboard, setSelectedDashboard] = React.useState<
    string | null
  >(dashboards.find((dashboard) => dashboard.key === type)?.key || null);

  const createLink = (dashboard: Dashboard) =>
    dashboard.tag === "upcoming" ? (
      <DataCards tag={dashboard.tag} bgColor="bg-[#FFF0B296]">
        <h3 className="text-secondary font-semibold text-sm">
          {dashboard.name}
        </h3>
        <p className="text-base text-muted-foreground font-normal leading-6">
          {dashboard.description}
        </p>
      </DataCards>
    ) : (
      <Link
        key={dashboard.key}
        href={`/app/dashboard/${dashboard.key}`}
        onClick={() => setSelectedDashboard(dashboard.key)}
        className={
          selectedDashboard === dashboard.key
            ? "border-2 border-secondary rounded-lg bg-[#FEF8F5]"
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
        className="md:flex md:flex-col grid grid-cols-2 gap-3   mt-0"
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
