import { cn } from "@/lib/utils";
import React from "react";

interface TimelineViewProps {
  date: string;
  price: number;
  sqft: number;
  growth: number;
  lastLine?: boolean;
}

function TimelineView({
  date,
  price,
  sqft,
  growth,
  lastLine = true,
}: TimelineViewProps) {
  return (
    <div className="flex gap-2 justify-start items-center">
      <div className="text-xs text-muted-foreground font-medium min-w-14">
        {date}
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center translate-y-8",
          !lastLine && "translate-y-3"
        )}
      >
        <div className="rounded-full bg-secondary w-2 h-2 " />
        {lastLine && (
          <div className="flex mx-auto  h-full bg-secondary min-h-14 mt-1 w-[2px] " />
        )}
      </div>
      <div className="flex  flex-col ml-1 gap-[0.4rem] ">
        <div className="flex gap-2 items-end justify-center">
          <h3 className="text-secondary text-lg font-bold">{price}</h3>
          <p
            className={cn(
              " text-sm font-bold",
              growth > 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {growth}
          </p>
        </div>
        <p className="text-muted-foreground text-xs">{sqft}</p>
      </div>
    </div>

    // <div className="flex gap-2 ">
    //   <div className="text-xs text-muted-foreground font-medium min-w-14">
    //     {date}
    //   </div>
    //   <div className="flex flex-col ">
    //     <div className="rounded-full bg-secondary w-2 h-2 " />
    //     <div className="flex mx-auto h-full bg-secondary min-h-14 mt-1 w-[2px]" />
    //   </div>
    //   <div className="flex  flex-col ml-1 gap-[0.4rem] items-start ">
    //     <h3 className="text-secondary text-base font-bold">{price}</h3>
    //     <p className="text-muted-foreground text-xs">{sqft}</p>
    //   </div>
    // </div>
  );
}

export default TimelineView;
