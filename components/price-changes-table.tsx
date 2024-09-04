import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { CircularDownIcon, CircularUpIcon } from "@/public/svg/Indicator";

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
}

// PropertyInfo Component to display individual property details
const PropertyInfo: React.FC<PropertyInfoProps> = ({ label, value }) => {
  return (
    <div className="w-1/3 flex flex-col items-start justify-center">
      <h3 className="text-sm text-muted-foreground font-semibold w-16 break-words">
        {label}
      </h3>
      <h2 className="text-base text-secondary font-semibold">{value}</h2>
    </div>
  );
};

// PriceTableRow Component to represent a single row in the table
const PriceTableRow: React.FC<PriceTableRowProps> = ({
  name,
  avgPrice,
  pricePerSqFt,
  transactions,
  isMuted,
}) => {
  return (
    <TableRow className={isMuted ? "bg-muted" : "bg-background"}>
      <TableCell className="flex flex-col justify-center items-start gap-2">
        <Badge variant="outline" className="bg-[#CBE5FB] text-muted-foreground">
          {name}
        </Badge>
        <div className="flex items-center justify-between w-full ml-2">
          <div className="w-1/3 flex flex-col items-start justify-center">
            <h3 className="text-sm text-muted-foreground font-semibold w-16 break-words">
              {"Average price"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary font-semibold">
                {avgPrice}
              </h2>
              <span className="text-red-600 font-semibold">21%</span>
              <CircularDownIcon />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start ml-4 justify-center">
            <h3 className="text-sm text-muted-foreground font-se  mibold w-16 break-words">
              {"Price Per sq. ft"}
            </h3>
            <h2 className="text-base text-secondary font-semibold">
              {pricePerSqFt}
            </h2>
          </div>
          <div className="w-1/3 flex flex-col items-start justify-center">
            <h3 className="text-sm text-muted-foreground font-semibold w-20 break-words">
              {"No. of transactions"}
            </h3>
            <div className="flex gap-1 justify-start items-center">
              <h2 className="text-base text-secondary font-semibold">
                {transactions}
              </h2>
              <span className="text-green-600 font-semibold">21%</span>
              <CircularUpIcon />
            </div>
          </div>
          {/* <PropertyInfo label="Average price" value={avgPrice} />
          <PropertyInfo label="Price Per sq. ft" value={pricePerSqFt} />
          <PropertyInfo label="No. of transactions" value={transactions} /> */}
        </div>
      </TableCell>
    </TableRow>
  );
};

// PriceChangesTable Component to render the table with rows
const PriceChangesTable: React.FC = () => {
  const data = [
    {
      name: "Burj Khalifa",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
      isMuted: true,
    },
    {
      name: "Palm Jumeirah",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
      isMuted: false,
    },
    {
      name: "Dubai Mall",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
      isMuted: true,
    },
    {
      name: "Jumeirah Beach",
      avgPrice: "900K",
      pricePerSqFt: "900K",
      transactions: "1546",
      isMuted: false,
    },
  ];

  return (
    <div className="rounded-xl  border-2 w-full">
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <PriceTableRow
              key={index}
              name={row.name}
              avgPrice={row.avgPrice}
              pricePerSqFt={row.pricePerSqFt}
              transactions={row.transactions}
              isMuted={row.isMuted}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceChangesTable;
