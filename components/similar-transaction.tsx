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
import { FormatValue } from "@/utils/formatNumbers";

interface SimilarTransactionProps {
  columns: string[];
  data: Array<Record<string, string | number>>;
  headerText?: string;
  headerValue?: string;
  headerText2?: string;
  headerValue2?: string;
}

function SimilarTransaction({
  columns,
  data,
  headerText,
  headerValue,
  headerText2,
  headerValue2,
}: SimilarTransactionProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      {headerText && headerText2 ? (
        // If both headers are present, display headers in one row and values in a row below
        <div className="bg-card py-3 px-2 flex flex-col items-center rounded-xl">
          <div className="flex justify-around items-center gap-4 text-center w-full">
            <h3 className="text-muted-foreground text-center text-sm font-light">
              {headerText}
            </h3>
            <h3 className="text-muted-foreground text-center text-sm font-light">
              {headerText2}
            </h3>
          </div>
          <div className="flex justify-around w-full mt-2">
            <p className="text-secondary text-sm font-light">
              {headerValue} AED
            </p>
            <p className="text-secondary text-sm font-light">
              {headerValue2} AED
            </p>
          </div>
        </div>
      ) : headerText ? (
        // If only one header is present, retain the original single-row design
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
      ) : null}

      <div className="border rounded-xl w-full overflow-hidden">
        <Table className="w-full">
          <TableHeader className="">
            <TableRow className="bg-card w-full rounded-t-xl">
              {columns.map((column, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "",
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
                  <TableCell key={colIndex}>
                    {column === "Year" || column === "Date"
                      ? row[column]
                      : FormatValue(row[column])}
                  </TableCell>
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
