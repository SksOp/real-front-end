import React, { use, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  AreaSizeIcon,
  BathIcon,
  BedIcon,
  FilterIcon,
} from "@/public/svg/icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { FormatValue } from "@/utils/formatNumbers";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TransactionFilter from "./transaction-filter";

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
        <div className="flex flex-col justify-start gap-2 w-1/5 items-start">
          <Badge
            variant="outline"
            className="bg-[#CBE5FB] text-muted-foreground font-semibold py-1 truncate max-w-[150px]"
          >
            {areaName}
          </Badge>
          <div className="flex gap-1 ml-2">
            <h3 className="text-secondary text-sm font-semibold">
              {FormatValue(transactionAmount)}
            </h3>
            <span className="text-red-600 font-medium">21%</span>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-1 w-1/8  items-start">
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
        <div className="flex flex-col justify-start gap-1 w-1/8 items-start">
          <h3 className="text-muted-foreground font-medium text-[11px]">
            Price Per sq. ft
          </h3>
          <h3 className="text-secondary text-sm font-semibold">
            {pricePerSqFt}
          </h3>
        </div>
        <div className="flex flex-col justify-start gap-2 w-1/4 items-start">
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
            <div className="flex w-full justify-start items-center gap-6 pl-2">
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
            tag === "First" ? "bg-[#8177E5]" : "bg-[#509BDC]"
          )}
        >
          {tag}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

interface TransactionTableProps {
  data: TransactionTableRowProps[];
  totalPages: number;
  selectedTab: string;
  selectedRow?: number | null;
  onRowSelect?: (index: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  selectedTab,
  selectedRow,
  totalPages,
  onRowSelect,
}) => {
  const [pageIndex, setPageIndex] = React.useState(1);
  const [transactions, setTransactions] =
    React.useState<TransactionTableRowProps[]>(data);

  const fetchTransactions = async (page: number) => {
    if (selectedTab === "sales") {
      const response = await SalesTransactionApi(page);
      console.log(response);
      setTransactions(response.transactions);
    } else {
      const response = await RentalTransactionApi(page);
      console.log(response);
      setTransactions(response.transactions);
    }
  };

  useEffect(() => {
    fetchTransactions(pageIndex);
  }, [pageIndex, selectedTab]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageIndex(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="border rounded-xl w-full overflow-hidden">
        <Table>
          <TableBody>
            {transactions?.map((row, index) => (
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
      <Pagination className="flex items-center justify-end bg-background px-6 py-3.5">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem
            onClick={() => handlePageChange(pageIndex - 1)}
            className="cursor-pointer"
          >
            <ChevronLeft />
          </PaginationItem>

          {/* First Page */}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={pageIndex === 1}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Ellipsis Before Current Page */}
          {pageIndex > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Middle Pages */}
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(
              (page) =>
                page !== 1 && // First Page
                (page === pageIndex ||
                  (page >= pageIndex - 1 && page <= pageIndex + 1)) // Pages around current
            )
            .map((page) => (
              <PaginationItem key={page} className="cursor-pointer">
                <PaginationLink
                  href="#"
                  isActive={pageIndex === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Ellipsis After Current Page */}
          {pageIndex < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                href="#"
                isActive={pageIndex === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem
            onClick={() => handlePageChange(pageIndex + 1)}
            className="cursor-pointer"
          >
            <ChevronRight />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TransactionTable;
