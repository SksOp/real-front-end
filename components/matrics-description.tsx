import React from "react";
import { Card, CardDescription } from "./ui/card";
import { CompassLogo } from "@/public/svg/logo";

function MatricsDescription({ description }: { description: string }) {
  return (
    <Card className="border border-dashed border-primary-800 rounded-xl px-4 py-3">
      <div className=" flex gap-3 items-center w-full">
        {/* Icon Container */}
        <div className="flex items-center justify-center flex-shrink-0 h-10 w-10">
          <CompassLogo />
        </div>
        {/* Text Content */}
        <div className="flex">
          <CardDescription className="text-secondary-500 font-normal text-sm">
            {description}
          </CardDescription>
        </div>{" "}
      </div>
    </Card>
  );
}

export default MatricsDescription;
