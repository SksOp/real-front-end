import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";

interface MatrixCardProp {
  title: string;
  value: string;
  growth: number;
}

function MatrixCard({ title, value, growth }: MatrixCardProp) {
  return (
    <Card className=" rounded-xl flex w-full flex-col ">
      <CardHeader className="px-3 pt-4 pb-2 w-full">
        <CardTitle className="text-xs w-full font-semibold text-muted-foreground truncate">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-full justify-start gap-1  px-3 pt-2 pb-4  truncate">
        <h3 className="text-xl font-semibold text-secondary">{value}</h3>
        {growth > 0 ? (
          <div className="flex items-center justify-start gap-1">
            <CircularUpIcon className="h-4 w-4" />
            <p className="text-green-600 font-medium text-xs">{growth}%</p>
          </div>
        ) : (
          <div className="flex items-center justify-start gap-1">
            <CircularDownIcon className="h-4 w-4" />
            <p className="text-red-600 font-medium text-xs">{-growth}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MatrixCard;
