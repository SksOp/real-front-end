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
    <Card className="border-2 rounded-xl w-full bg-background p-0">
      <CardHeader className="flex  flex-row justify-between items-center mx-auto">
        <CardTitle className="text-base font-semibold text-secondary">
          {"Similar Transactions"}
        </CardTitle>
        <h3 className="text-base font-semibold text-primary">View all</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="bg-card py-3 px-2 flex items-center justify-around rounded-xl">
          <h3 className="text-muted-foreground text-sm font-light">
            Average sales price:
          </h3>
          <div className="flex justify-end flex-row items-center gap-4">
            <p className="text-secondary text-sm font-light">2345678 AED</p>
            <DisableBulbIcon />
          </div>
        </div>
        <Table className="rounded-t-3xl">
          <TableHeader className="rounded-t-3xl">
            <TableRow className="bg-card ">
              <TableHead className="text-secondary">Date</TableHead>
              <TableHead className="text-secondary">Sell Price</TableHead>
              <TableHead className="text-secondary">Area (ft)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 1 ? "bg-card" : "bg-background"}
              >
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.sellPrice}</TableCell>
                <TableCell>{transaction.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SimilarTransaction;
