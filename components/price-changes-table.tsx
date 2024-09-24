import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";
import { cn } from "@/lib/utils";

// Define types for the props used in the components
interface PropertyInfoProps {
  label: string;
  value: string;
}

interface PriceTableRowProps {
  name: string;
  avgPrice: string;
  pricePerSqFt: string;
  transactions: string;
  isMuted: boolean;
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
          className="bg-[#CBE5FB] text-muted-foreground font-semibold py-1"
        >
          {name}
        </Badge>
        <div className="flex items-center justify-between w-full">
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-sm text-muted-foreground font-semibold max-w-14 break-words">
              {"Average price"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary font-medium">
                {avgPrice}
              </h2>
              <span className="text-red-600 font-medium">21%</span>
              <CircularDownIcon />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 ml-4 justify-center">
            <h3 className="text-sm text-muted-foreground font-semibold max-w-20  break-words">
              {"Price Per sq. ft"}
            </h3>
            <h2 className="text-base text-secondary font-medium">
              {pricePerSqFt}
            </h2>
          </div>
          <div className="w-1/3 flex flex-col items-start gap-2 justify-center">
            <h3 className="text-sm text-muted-foreground font-semibold max-w-24  break-words">
              {"No. of transactions"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary font-medium">
                {transactions}
              </h2>
              <span className="text-green-600 font-medium">21%</span>
              <CircularUpIcon />
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

// PriceChangesTable Component to render the table with rows
interface PriceChangesTableProps {
  selectedRow?: number; // Index of the selected row
}

const PriceChangesTable: React.FC<PriceChangesTableProps> = ({
  selectedRow,
}) => {
  const data = [
    {
      name: "Burj Khalifa",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
    },
    {
      name: "Palm Jumeirah",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
    },
    {
      name: "Dubai Mall",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
    },
    {
      name: "Jumeirah Beach",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
    },
  ];

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
