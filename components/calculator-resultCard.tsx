import React from "react";
import { Card } from "./ui/card";
import { CircularUpIcon } from "@/public/svg/Indicator";
import { title } from "process";

interface CalculatorResultHeaderProps {
  title: string;
  value: number;
  percentage?: number;
}

function CalculatorResultCard({
  title,
  value,
  percentage,
}: CalculatorResultHeaderProps) {
  return (
    <Card className="border rounded-lg p-4 flex flex-col gap-3 w-full">
      <h3 className="text-muted-foreground text-sm font-normal">{title}</h3>
      <div className="flex gap-2 items-center">
        <h3 className="text-secondary font-bold text-[1.6rem]">{value} AED</h3>
        {percentage && (
          <>
            <CircularUpIcon />
            <span className="text-green-600 font-semibold text-sm">
              {percentage} %
            </span>
          </>
        )}
      </div>
    </Card>
  );
}

export default CalculatorResultCard;
