import React from "react";
import { Separator } from "./ui/separator";

function MatrixRow() {
  return (
    <div className="flex items-center justify-between  gap-2 w-full mt-4 overflow-x-hidden">
      <div className="flex flex-col items-center justify-between">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Total Sales
        </p>
        <h3 className="text-xl text-secondary font-semibold">2650</h3>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center justify-between">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Market value
        </p>
        <h3 className="text-xl text-secondary font-semibold">2650</h3>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center justify-between">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Offplan vs Ready
        </p>
        <h3 className="text-xl text-secondary font-semibold">10:2</h3>
      </div>
    </div>
  );
}

export default MatrixRow;
