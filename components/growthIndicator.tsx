import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
import React from "react";

function GrowthIndicator({ growth }: { growth: number | string }) {
  return (
    <div>
      {growth && Number(growth) > 0 ? (
        <div className="flex items-center justify-start gap-1">
          <CircularUpIcon className="h-4 w-4" />
          <p className="text-green-600 font-medium text-sm">{growth}%</p>
        </div>
      ) : growth && Number(growth) < 0 ? (
        <div className="flex items-center justify-start gap-1">
          <CircularDownIcon className="h-4 w-4" />
          <p className="text-red-600 font-medium text-sm">{-growth}%</p>
        </div>
      ) : null}
    </div>
  );
}

export default GrowthIndicator;
