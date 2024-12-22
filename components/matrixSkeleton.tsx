import React from "react";
import { Skeleton } from "./ui/skeleton";

function MatrixSkeleton() {
  return (
    <div className="rounded-lg border shadow-sm flex w-full flex-col py-5 px-3 gap-4">
      <Skeleton className="h-3 w-[80%]" />
      <Skeleton className="h-3 w-[60%]" />
    </div>
  );
}

export default MatrixSkeleton;
