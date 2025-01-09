import React from "react";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface MatrixRowProps {
  title1: string;
  title2: string;
  title3: string;
  value1: number;
  value2: number;
  value3: number;
}

function ThreeData({
  title1,
  title2,
  title3,
  value1,
  value2,
  value3,
}: MatrixRowProps) {
  return (
    <Card className="border rounded-lg bg-background p-4 flex items-center justify-between gap-5 w-full">
      <div className="flex items-start justify-start gap-2 w-1/3">
        <div className="flex flex-col gap-1 ">
          <h3 className="text-muted-foreground text-sm font-normal  ">
            {title1}
          </h3>
          <h3 className="text-secondary font-semibold text-lg ">{value1}</h3>
        </div>
      </div>
      <div className="h-16 bg-border shrink-0  w-[1px]" />
      <div className="flex items-start justify-start gap-2 w-1/3">
        <div className="flex flex-col gap-1">
          <h3 className="text-muted-foreground text-sm font-normal  ">
            {title2}
          </h3>
          <h3 className="text-secondary font-semibold text-lg ">{value2}</h3>
        </div>
      </div>
      <div className="h-16 bg-border shrink-0  w-[1px]" />
      <div className="flex items-start justify-start gap-2 w-1/3">
        <div className="flex flex-col gap-1">
          <h3 className="text-muted-foreground text-sm font-normal  ">
            {title3}
          </h3>
          <h3 className="text-secondary font-semibold text-lg ">{value3}</h3>
        </div>
      </div>
    </Card>
  );
}

export default ThreeData;
