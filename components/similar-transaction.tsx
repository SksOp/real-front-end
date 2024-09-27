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

function SimilarTransaction() {
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
      <div className="bg-card py-3 px-2 flex items-center justify-around rounded-xl">
        <h3 className="text-muted-foreground text-sm font-light">
          Average sales price:
        </h3>
        <div className="flex justify-end flex-row items-center gap-4">
          <p className="text-secondary text-sm font-light">2345678 AED</p>
          <DisableBulbIcon />
        </div>
      </div>
      <div className="border rounded-xl w-full overflow-hidden">
        <Table className="">
          <TableHeader className="">
            <TableRow className="bg-card rounded-t-xl">
              <TableHead className="text-secondary rounded-tl-xl ">
                Date
              </TableHead>
              <TableHead className="text-secondary">Sell Price</TableHead>
              <TableHead className="text-secondary rounded-tr-xl">
                Area (ft)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, idx) => (
              <TableRow
                key={idx}
                className={cn(
                  idx === transactions.length - 1 && "rounded-b-xl",
                  idx % 2 === 1 ? "bg-card" : "bg-background"
                )}
              >
                <TableCell className={""}>{transaction.date}</TableCell>
                <TableCell>{transaction.sellPrice}</TableCell>
                <TableCell className="">{transaction.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SimilarTransaction;
