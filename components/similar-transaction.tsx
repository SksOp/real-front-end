import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DisableBulbIcon, LightBulbIcon } from "@/public/svg/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";

interface SimilarTransactionProps {
  columns: string[];
  data: Array<Record<string, string | number>>;
  headerText?: string;
  headerValue?: string;
}

function SimilarTransaction({
  columns,
  data,
  headerText,
  headerValue,
}: SimilarTransactionProps) {
  const transactions = [
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
    { date: "17/Jun/24", sellPrice: "750,000", area: "494" },
  ];
  return (
    <div className="flex flex-col gap-4">
      {headerText && (
        <div className="bg-card py-3 px-2 flex items-center justify-around rounded-xl">
          <h3 className="text-muted-foreground text-sm font-light">
            {headerText}:
          </h3>
          <div className="flex justify-end flex-row items-center gap-4">
            <p className="text-secondary text-sm font-light">
              {headerValue} AED
            </p>
            <DisableBulbIcon />
          </div>
        </div>
      )}
      <div className="border rounded-xl w-full overflow-hidden">
        <Table className="">
          <TableHeader className="">
            <TableRow className="bg-card rounded-t-xl">
              {columns.map((column, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    idx === 0 && "rounded-tl-xl",
                    idx === columns.length - 1 && "rounded-tr-xl",
                    "text-secondary"
                  )}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  rowIndex === data.length - 1 && "rounded-b-xl",
                  rowIndex % 2 === 1 ? "bg-card" : "bg-background"
                )}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SimilarTransaction;
