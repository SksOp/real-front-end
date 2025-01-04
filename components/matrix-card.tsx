import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
import { FormatValue } from "@/utils/formatNumbers";

interface MatrixCardProp {
  title: string;
  value: number | string;
  growth?: number | string;
}

function MatrixCard({ title, value, growth }: MatrixCardProp) {
  console.log(value);
  return (
    <Card className=" rounded-xl flex w-full flex-col py-3 px-3 gap-4">
      <CardHeader className="p-0 w-full">
        <CardTitle className="text-xs w-full font-semibold text-muted-foreground truncate">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-full justify-start gap-2  p-0  truncate">
        <h3 className="md:text-xl text-lg font-semibold text-secondary">
          {FormatValue(value)}
        </h3>
        {growth && Number(growth) > 0 ? (
          <div className="flex items-center justify-start gap-1">
            <CircularUpIcon className="h-4 w-4" />
            <p className="text-green-600 font-medium text-sm">
              {parseInt(String(growth))}%
            </p>
          </div>
        ) : growth && Number(growth) < 0 ? (
          <div className="flex items-center justify-start gap-1">
            <CircularDownIcon className="h-4 w-4" />
            <p className="text-red-600 font-medium text-sm">
              {-parseInt(String(growth))}%
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default MatrixCard;
