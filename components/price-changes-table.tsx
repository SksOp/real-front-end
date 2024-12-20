import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
import { cn } from "@/lib/utils";
import { FormatValue } from "@/utils/formatNumbers";

interface PriceTableRowProps {
  name: string;
  avgPrice: string;
  pricePerSqFt: string;
  transactions: string;
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
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary/90 font-medium">
                {FormatValue(avgPrice)}
              </h2>
              <span className="text-red-600 text-[0.813rem] font-semibold">
                21%
              </span>
              <CircularDownIcon />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 ml-4 justify-center">
            <h3 className="text-[0.813rem] text-muted-foreground font-semibold max-w-16  break-words">
              {type === "sales" ? "Price Per sq. ft" : "Renewal rate"}
            </h3>
            <h2 className="text-base text-secondary/90 font-medium">
              {FormatValue(pricePerSqFt)}
            </h2>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-[0.813rem] text-muted-foreground font-semibold max-w-24  break-words">
              {"No. of transactions"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary/90 font-medium">
                {FormatValue(transactions)}
              </h2>
              <span className="text-green-600 text-[0.813rem] font-semibold">
                21%
              </span>
              <CircularUpIcon className="w-4 h-4" />
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
