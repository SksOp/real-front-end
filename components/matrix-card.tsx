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
    <Card className="px-0 py-4 rounded-3xl flex flex-col gap-2">
      <CardHeader className="px-4 py-0">
        <CardTitle className="text-base font-semibold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-start gap-4 px-4 py-0 whitespace-nowrap">
        <h3 className="text-base text-secondary">{value}</h3>
        {growth > 0 ? (
          <div className="flex items-center justify-start gap-2">
            <CircularUpIcon />
            <p className="text-green-600 text-secondary text-sm">{growth} %</p>
          </div>
        ) : (
          <>
            <CircularDownIcon />
            <p className="text-red-600 text-secondary text-sm">{-growth} %</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default MatrixCard;
