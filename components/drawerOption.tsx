import React from "react";
import AreaDrawerView from "./area-drawer-view";
import DashboardDrawerView from "./dashboard-drawer-view";
import { Area } from "@/constants/area";

interface DrawerOptionProps {
  option: string;
}

function DrawerOption({ option }: DrawerOptionProps) {
  switch (option) {
    case "Area":
      return (
        <AreaDrawerView
          mostPopular={Area.MostPopularAreas}
          otherAreas={Area.OtherAreas}
        />
      );
    case "Dashboard":
      return <DashboardDrawerView />;
    default:
      return <div>DrawerOption</div>;
  }
}

export default DrawerOption;
