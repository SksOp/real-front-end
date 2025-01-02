import { cn } from "@/lib/utils";
import { ChartExceptionImage } from "@/public/svg/exceptions";
import { ClassValue } from "clsx";
import React from "react";

function ChartException({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 justify-center items-center flex-shrink-0",
        className
      )}
    >
      <ChartExceptionImage className="" />
      <span className="text-muted-foreground text-center">
        No data available!
      </span>
    </div>
  );
}

export default ChartException;
