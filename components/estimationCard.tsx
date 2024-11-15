import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface CalculatorResultHeaderProps {
  title: string;
  value: number;
  confidenceLevel?: number;
}

function EstimationCard({
  title,
  value,
  confidenceLevel = 0,
}: CalculatorResultHeaderProps) {
  console.log(confidenceLevel);
  return (
    <Card className="border rounded-lg p-4 flex flex-col gap-3 w-full">
      <h3 className="text-muted-foreground text-sm font-normal">{title}</h3>
      <div className="flex gap-1">
        <h3 className="text-secondary font-bold text-[1.6rem]">{value} AED</h3>
      </div>
      <div className="w-full flex justify-center items-center gap-1">
        <div className={cn("h-0.5 w-full bg-[#E0E0E0]", "bg-[#FF7171]")} />
        <div
          className={cn(
            "h-0.5 w-full bg-[#E0E0E0]",
            confidenceLevel >= 500 && "bg-[#FFC267]"
          )}
        />
        <div
          className={cn(
            "h-0.5 w-full bg-[#E0E0E0]",
            confidenceLevel > 1000 && "bg-[#42BE64]"
          )}
        />
      </div>
      <div>
        <h3 className="font-normal text-xs text-muted-foreground">
          Confidence level:{" "}
          <span
            className={cn(
              "",
              confidenceLevel >= 1000
                ? "text-[#42BE64]"
                : confidenceLevel >= 500
                ? "text-[#FFC267]"
                : "text-[#FF7171]"
            )}
          >
            {confidenceLevel > 1000
              ? "High"
              : confidenceLevel >= 500
              ? "Medium"
              : "Low"}
          </span>
        </h3>
      </div>
    </Card>
  );
}

export default EstimationCard;
