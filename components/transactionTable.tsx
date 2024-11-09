import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { AreaSizeIcon, BathIcon, BedIcon } from "@/public/svg/icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";

interface TransactionTableRowProps {
  areaName: string;
  transactionAmount: string;
  date: Date;
  pricePerSqFt: string;
  badges: string[];
  bathrooms: number;
  bedrooms: number;
  area: number;
  tag: string;
  isMuted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const TransactionTableRow: React.FC<TransactionTableRowProps> = ({
  areaName,
  transactionAmount,
  date,
  pricePerSqFt,
  badges,
  bathrooms,
  bedrooms,
  area,
  tag,
  isMuted,
  isSelected,
  onClick,
}) => {
  return (
    <TableRow
      className={cn(
        "rounded-tl-xl border-b-0 cursor-pointer w-full",
        isMuted ? "bg-card" : "bg-background"
      )}
      onClick={onClick}
    >
      <TableCell
        className={cn(
          "flex justify-between items-center gap-2 w-full px-4",
          isSelected && "rounded-xl border border-primary"
        )}
      >
        <div className="flex flex-col justify-start gap-1 items-start">
          <Badge
            variant="outline"
            className="bg-[#CBE5FB] text-muted-foreground font-semibold py-1"
          >
            {areaName}
          </Badge>
          <div className="flex gap-1">
            <h3 className="text-secondary text-sm font-semibold">
              {transactionAmount}
            </h3>
            <span className="text-red-600 font-medium">21%</span>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-1 items-start">
          <h3 className="text-muted-foreground font-medium text-[11px]">
            Date
          </h3>
          <h3 className="text-secondary text-sm font-semibold">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
        </div>
        <div className="flex flex-col justify-start gap-1 items-start">
          <h3 className="text-muted-foreground font-medium text-[11px]">
            Price Per sq. ft
          </h3>
          <h3 className="text-secondary text-sm font-semibold">
            {pricePerSqFt}
          </h3>
        </div>
        <div className="flex flex-col justify-start gap-1 items-start">
          <div className="flex justify-start gap-1 items-center w-full">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                className="bg-card border-0 py-0.5 px-2 text-muted-foreground font-normal text-xs"
                variant="outline"
              >
                {badge}
              </Badge>
            ))}
          </div>
          <div>
            <div className="flex w-full justify-start items-center gap-6 ">
              <div className="flex gap-1 justify-start items-center">
                <BedIcon className="w-4 h-4" />
                <p className="text-muted-foreground font-normal text-xs">
                  {bedrooms}
                </p>
              </div>
              <div className="flex gap-1 justify-start items-center">
                <BathIcon className="w-4 h-4" />
                <p className="text-muted-foreground font-normal text-xs">
                  {bathrooms}
                </p>
              </div>
              <div className="flex gap-1 justify-start items-center">
                <AreaSizeIcon className="w-[0.8rem] h-[0.8rem]" />
                <p className="text-muted-foreground font-normal text-xs">
                  {area} sqft
                </p>
              </div>
            </div>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-white font-medium text-[11px] py-1",
            tag === "Sale" ? "bg-[#8177E5]" : "bg-[#509BDC]"
          )}
        >
          {tag}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

interface PriceChangesTableProps {
  data: TransactionTableRowProps[];
  selectedRow?: number | null;
  onRowSelect?: (index: number) => void;
}

const TransactionTable: React.FC<PriceChangesTableProps> = ({
  data,
  selectedRow,
  onRowSelect,
}) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 10;

  return (
    <>
      <div className="border rounded-xl w-full overflow-hidden">
        <Table>
          <TableBody>
            {data?.map((row, index) => (
              <TransactionTableRow
                key={index}
                {...row}
                isMuted={index % 2 === 0}
                isSelected={selectedRow === index}
                onClick={() => onRowSelect?.(index)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="flex items-center justify-end  bg-background px-6 py-3.5">
        <PaginationContent>
          <PaginationItem>
            <ChevronLeft />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">16</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <ChevronRight />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TransactionTable;
