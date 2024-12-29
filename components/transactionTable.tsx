import React, { useEffect, useState } from "react";
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
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { FormatValue } from "@/utils/formatNumbers";
import { RentalTransactionApi, SalesTransactionApi } from "@/config/utility";
import { Spinner } from "./ui/spinner";
import Exceptions from "./exceptions";
import {
  FetchError,
  NoDataException,
  SelectDataException,
} from "@/public/svg/exceptions";

interface TransactionTableRowProps {
  transactionId: string;
  areaName: string;
  transactionAmount: string;
  date: Date;
  pricePerSqFt: string;
  badges: string[];
  bathrooms: number;
  bedrooms: number;
  area: number;
  tag: string;
  selectedTab: string;
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
  selectedTab,
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
        {/* Area Name */}
        <div className="flex flex-col justify-start gap-2 w-1/6 items-start ">
          <Badge
            variant="outline"
            className={
              "bg-[#CBE5FB] text-muted-foreground font-semibold py-1 truncate max-w-[150px]"
            }
          >
            {areaName}
          </Badge>
          <div className="flex gap-1 ml-2">
            <h3 className="text-secondary text-sm font-semibold">
              {FormatValue(transactionAmount)}
            </h3>
            {/* <span className="text-red-600 font-medium">21%</span> */}
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col justify-start gap-1 w-1/6 items-start pl-8">
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

        {/* Price Per Sq. Ft */}
        <div className="flex flex-col justify-start gap-1 w-1/6 items-start pl-8">
          <h3 className="text-muted-foreground font-medium text-[11px]">
            {selectedTab === "sales" ? "Price Per sq. ft" : "Contract Duration"}
          </h3>
          <h3 className="text-secondary text-sm font-semibold">
            {pricePerSqFt}
          </h3>
        </div>

        {/* Badges and Details */}
        <div className="flex flex-col justify-start gap-2 w-1/3 items-start pl-8">
          <div className="flex justify-start gap-1 items-center w-full">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                className={cn(
                  " border-0 py-0.5 px-2 text-muted-foreground font-normal text-xs",
                  isMuted ? "bg-background" : "bg-card"
                )}
                variant="outline"
              >
                {badge}
              </Badge>
            ))}
          </div>
          <div className="flex w-full justify-start items-center gap-6 pl-2">
            <div className="flex gap-1 justify-start items-center">
              <BedIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-xs">
                {bedrooms}
              </p>
            </div>
            {/* <div className="flex gap-1 justify-start items-center">
              <BathIcon className="w-4 h-4" />
              <p className="text-muted-foreground font-normal text-xs">
                {bathrooms}
              </p>
            </div> */}
            <div className="flex gap-1 justify-start items-center">
              <AreaSizeIcon className="w-[0.8rem] h-[0.8rem]" />
              <p className="text-muted-foreground font-normal text-xs">
                {area} sqft
              </p>
            </div>
          </div>
        </div>

        {/* Tag */}
        <div className="flex flex-col justify-center items-end w-1/6 pl-8">
          <Badge
            variant="outline"
            className={cn(
              "text-white font-medium text-[11px] py-1",
              tag === "First" || tag === "New" ? "bg-[#8177E5]" : "bg-[#509BDC]"
            )}
          >
            {tag}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};

interface TransactionTableProps {
  data: TransactionTableRowProps[];
  totalPages: number;
  filters: {
    [key: string]: string | number;
  };
  selectedTab: string;
  selectedRow?: string | null;
  onRowSelect?: (index: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  selectedTab,
  selectedRow,
  totalPages,
  filters,
  onRowSelect,
}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [transactions, setTransactions] =
    useState<TransactionTableRowProps[]>(data);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchTransactions = async (page: number) => {
    setLoading(true); // Start loading
    try {
      if (selectedTab === "sales") {
        const response = await SalesTransactionApi(page, filters);
        setTransactions(response.transactions);
      } else if (selectedTab === "rental") {
        const response = await RentalTransactionApi(page, filters);
        setTransactions(response.transactions);
      } else if (selectedTab === "mortgage") {
        const response = await SalesTransactionApi(page, {
          ...filters,
          group_en: "Mortgage",
        });
        setTransactions(response.transactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchTransactions(pageIndex);
  }, [pageIndex, selectedTab, filters]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageIndex(newPage);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl gap-3 w-full">
      {loading ? (
        <div className="flex  items-center justify-center">
          <Spinner />
          <div className="ml-2">Loading...</div>
        </div>
      ) : (
        <>
          <div className="border rounded-xl w-full">
            {transactions.length > 0 ? (
              <Table>
                <TableBody>
                  {transactions?.map((row, index) => (
                    <TransactionTableRow
                      key={index}
                      {...row}
                      selectedTab={selectedTab}
                      isMuted={index % 2 === 0}
                      isSelected={selectedRow === row.transactionId}
                      onClick={() => onRowSelect?.(row.transactionId)}
                    />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Exceptions
                svg={<FetchError />}
                title="Something Went Wrong!"
                description="This doesn’t happen often, you can let our support know."
                buttonText="Whatsapp Support"
              />
            )}
          </div>
          <Pagination className="flex items-center justify-end bg-background px-6 py-3.5 ">
            <PaginationContent className="flex gap-3">
              <PaginationItem
                onClick={() => handlePageChange(pageIndex - 1)}
                className="cursor-pointer "
              >
                <ChevronLeft />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  isActive={pageIndex === 1}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {pageIndex > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page !== 1 &&
                    page !== totalPages && // Exclude first and last
                    (page === pageIndex ||
                      (page >= pageIndex - 1 && page <= pageIndex + 1)) // Pages around current
                )
                .map((page) => (
                  <PaginationItem key={page} className="cursor-pointer">
                    <PaginationLink
                      isActive={pageIndex === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page.toLocaleString()}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {pageIndex < totalPages - 2 && (
                <PaginationItem>
                  <Ellipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationLink
                    isActive={pageIndex === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages.toLocaleString()}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem
                onClick={() => handlePageChange(pageIndex + 1)}
                className="cursor-pointer"
              >
                <ChevronRight />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default TransactionTable;
