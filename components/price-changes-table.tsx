import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
import { cn } from "@/lib/utils";
import { FormatValue } from "@/utils/formatNumbers";
import GrowthIndicator from "./growthIndicator";

interface PriceTableRowProps {
  name: string;
  avgPrice: string;
  pricePerSqFt: string;
  transactions: string;
  avgPriceGrowth?: string;
  pricePerSqFtGrowth?: string;
  transactionsGrowth?: string;
  isMuted?: boolean;
  isSelected?: boolean;
  type?: "sales" | "rental";
}

// PriceTableRow Component to represent a single row in the table
const PriceTableRow: React.FC<PriceTableRowProps> = ({
  name,
  avgPrice,
  pricePerSqFt,
  transactions,
  avgPriceGrowth,
  pricePerSqFtGrowth,
  transactionsGrowth,
  isMuted,
  isSelected,
  type = "sales",
}) => {
  return (
    <TableRow
      className={cn(
        "rounded-tl-xl cursor-pointer w-full hover:bg-none",
        isMuted ? "bg-card" : "bg-background"
      )}
    >
      <TableCell
        className={cn(
          "flex flex-col justify-center items-start gap-2 w-full px-3 hover:bg-none",
          isSelected && "rounded-xl border border-primary"
        )}
      >
        <Badge
          variant="outline"
          className="bg-[#CBE5FB] max-w-[ truncate text-muted-foreground font-semibold text-[0.813rem] py-1"
        >
          {name}
        </Badge>
        <div className="flex items-center justify-between w-full">
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-[0.813rem] text-muted-foreground font-semibold max-w-14  break-words">
              {type === "sales" ? "Average price" : "Average rent"}
            </h3>
            <div className="flex flex-col gap-1 justify-start items-start">
              <h2 className="text-base text-secondary/90 font-medium">
                {FormatValue(avgPrice)}
              </h2>
              {avgPriceGrowth && <GrowthIndicator growth={avgPriceGrowth} />}
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 ml-4 justify-center">
            <h3 className="text-[0.813rem] text-muted-foreground font-semibold max-w-16  break-words">
              {type === "sales" ? "Price Per sq. ft" : "Renewal rate"}
            </h3>
            <div className="flex flex-col gap-1 justify-start items-start">
              <h2 className="text-base text-secondary/90 font-medium">
                {FormatValue(pricePerSqFt)}
              </h2>
              {pricePerSqFtGrowth && (
                <GrowthIndicator growth={pricePerSqFtGrowth} />
              )}
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-[0.813rem] text-muted-foreground font-semibold max-w-24  break-words">
              {"No. of transactions"}
            </h3>
            <div className="flex flex-col gap-1 justify-start items-start">
              <h2 className="text-base text-secondary/90 font-medium">
                {FormatValue(transactions)}
              </h2>
              {transactionsGrowth && (
                <GrowthIndicator growth={transactionsGrowth} />
              )}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

// PriceChangesTable Component to render the table with rows
interface PriceChangesTableProps {
  data: PriceTableRowProps[]; // Array of objects with label and value
  selectedRow?: number; // Index of the selected row
  type?: "sales" | "rental"; // Type of data to be displayed
}

const PriceChangesTable: React.FC<PriceChangesTableProps> = ({
  data,
  selectedRow,
  type,
}) => {
  return (
    <div className="border rounded-xl w-full overflow-hidden">
      <Table>
        <TableBody className="hover:bg-none">
          {data.map((row, index) => (
            <PriceTableRow
              key={index}
              name={row.name}
              avgPrice={row.avgPrice}
              pricePerSqFt={row.pricePerSqFt}
              transactions={row.transactions}
              avgPriceGrowth={row.avgPriceGrowth}
              pricePerSqFtGrowth={row.pricePerSqFtGrowth}
              transactionsGrowth={row.transactionsGrowth}
              isMuted={index % 2 === 0}
              isSelected={selectedRow === index}
              type={type}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceChangesTable;
