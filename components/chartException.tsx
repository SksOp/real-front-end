import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

function ChartException({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 justify-center items-center",
        className
      )}
    >
      <img
        src="/imgs/exception.png"
        width={120}
        height={120}
        className="object-cover"
        alt={"exception"}
      />
      <span className="text-muted-foreground text-center">
        No data available!
      </span>
    </div>
  );
}

export default ChartException;
