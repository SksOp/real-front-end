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
}

// PriceTableRow Component to represent a single row in the table
const PriceTableRow: React.FC<PriceTableRowProps> = ({
  name,
  avgPrice,
  pricePerSqFt,
  transactions,
  isMuted,
  isSelected,
}) => {
  return (
    <TableRow
      className={cn(
        "rounded-tl-xl cursor-pointer w-full",
        isMuted ? "bg-card" : "bg-background"
      )}
    >
      <TableCell
        className={cn(
          "flex flex-col justify-center items-start gap-2 w-full px-3",
          isSelected && "rounded-xl border border-primary"
        )}
      >
        <Badge
          variant="outline"
          className="bg-[#CBE5FB] text-[#353535] font-normal text-[0.813rem] py-1"
        >
          {name}
        </Badge>
        <div className="flex items-center justify-between w-full">
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-[0.688rem] text-muted-foreground font-medium max-w-14 md:max-w-full break-words">
              {"Average price"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-[0.813rem] text-secondary/90 font-semibold">
                {FormatValue(avgPrice)}
              </h2>
              <span className="text-red-600 text-[0.813rem] font-medium">
                21%
              </span>
              <CircularDownIcon />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 ml-4 justify-center">
            <h3 className="text-[0.688rem] text-muted-foreground font-medium max-w-20 md:max-w-full break-words">
              {"Price Per sq. ft"}
            </h3>
            <h2 className="text-[0.813rem] text-secondary/90 font-semibold">
              {FormatValue(pricePerSqFt)}
            </h2>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-[0.688rem] text-muted-foreground font-medium max-w-24 md:max-w-full break-words">
              {"No. of transactions"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-[0.813rem] text-secondary/90 font-semibold">
                {FormatValue(transactions)}
              </h2>
              <span className="text-green-600 text-[0.813rem] font-medium">
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
}

const PriceChangesTable: React.FC<PriceChangesTableProps> = ({
  data,
  selectedRow,
}) => {
  return (
    <div className="border rounded-xl w-full overflow-hidden">
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <PriceTableRow
              key={index}
              name={row.name}
              avgPrice={row.avgPrice}
              pricePerSqFt={row.pricePerSqFt}
              transactions={row.transactions}
              isMuted={index % 2 === 0}
              isSelected={selectedRow === index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceChangesTable;
