import {
  AreaIcon,
  CalculatorIcon,
  DashboardIcon,
  DeveloperIcon,
} from "@/public/svg/drawerIcons";
import { BedIcon } from "@/public/svg/icons";
import React from "react";

interface IconOptionProps {
  option: string;
}

function FilterIcons({ option }: IconOptionProps) {
  switch (option) {
    case "Area":
      return <AreaIcon className="w-6 h-6" />;
    case "Dashboard":
      return <DashboardIcon className="w-6 h-6" />;
    case "Calculator":
      return <CalculatorIcon className="w-6 h-6" />;
    case "Bedrooms":
      return <BedIcon className="w-6 h-6" />;
    case "Developer":
      return <DeveloperIcon className="w-6 h-6" />;

    default:
      return <div></div>;
  }
}

export default FilterIcons;
