import { AreaIcon } from "@/public/svg/drawerIcons";
import React from "react";
import { Input } from "./ui/input";

interface AreaDrawerViewProps {
  mostPopular: string[];
  otherAreas: string[];
}

function AreaDrawerView({ mostPopular, otherAreas }: AreaDrawerViewProps) {
  return (
    <div className="flex flex-col justify-start items-start gap-4 w-full p-2">
      <Input
        placeholder="Search area"
        className="bg-secondary-foreground font-boldtext-secondary "
      />
      <div className="px-2 py-1 ">
        <h3 className="text-base font-normal mb-2">Most Popular</h3>
        <ul className="flex flex-col gap-4">
          {mostPopular.map((area, idx) => (
            <li key={idx} className="text-muted">
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-2 py-1">
        <h3 className="text-base font-normal mb-2">Other Areas</h3>
        <ul className="flex flex-col gap-4">
          {otherAreas.map((area, idx) => (
            <li key={idx} className="text-muted">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AreaDrawerView;
