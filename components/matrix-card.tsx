import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";

interface MatrixCardProp {
  title: string;
  value: number;
  growth: number;
}

function MatrixCard({ title, value, growth }: MatrixCardProp) {
  return (
    <Card className=" rounded-3xl flex w-full flex-col ">
      <CardHeader className="px-4 py-4 w-full">
        <CardTitle className="text-sm font-semibold text-muted-foreground truncate">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-full justify-start gap-4 px-4 py-4 pt-0  truncate">
        <h3 className="text-xl font-bold text-secondary">{value}</h3>
        {growth > 0 ? (
          <div className="flex items-center justify-start gap-1">
            <CircularUpIcon />
            <p className="text-green-600 text-secondary text-base">
              {growth} %
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-start gap-1">
            <CircularDownIcon />
            <p className="text-red-600 text-secondary text-base">{-growth} %</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MatrixCard;
