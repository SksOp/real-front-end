import React from "react";

function ChartException() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
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
