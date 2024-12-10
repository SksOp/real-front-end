import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import DatePicker from "./date-picker";
import CalculatorInputs from "./calculator-inputs";
import { TransactionFilterOptions } from "@/config/filters";
import { set } from "date-fns";

function TransactionFilter({
  filters,
  setIsOpen,
  setFilters,
}: {
  filters: { [key: string]: string | number };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number;
    }>
  >;
}) {
  const [localFilters, setLocalFilters] = useState<{
    [key: string]: string | number;
  }>(filters);

  const handleFilterChange = (name: string, value: string | number) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      // Format date in local timezone
      const formattedDate = date.toISOString().split("T")[0]; // If you need UTC format
      const localDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        [name]: localDate, // Use localDate to avoid UTC shift
      }));
    } else {
      setLocalFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[name];
        return updatedFilters;
      });
    }
  };

  const applyFilters = () => {
    console.log(localFilters);
    setIsOpen(false);
    setFilters(localFilters);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <h3 className="text-center text-secondary text-base font-bold">Filter</h3>
      <div className="flex flex-col gap-5">
        {TransactionFilterOptions.map((option) => (
          <CalculatorInputs
            key={option.key}
            uniqueKey={option.key}
            title={option.label}
            type={option.type}
            options={option.options}
            is_mandatory={option.is_mandatory}
            source={option.source}
            searchable={option.searchable}
            value={localFilters[option.key]}
            onChange={(value) => handleFilterChange(option.key, value)}
          />
        ))}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="date-range"
            className="text-secondary font-semibold text-sm"
          >
            Date range
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="date-from"
                className="text-muted-foreground font-normal text-sm"
              >
                From
              </Label>
              <DatePicker
                date={
                  localFilters.start_date
                    ? new Date(localFilters.start_date)
                    : undefined
                }
                setDate={(date) => handleDateChange("start_date", date)}
              />
            </div>
            <div>
              <Label
                htmlFor="date-to"
                className="text-muted-foreground font-normal text-sm"
              >
                To
              </Label>
              <DatePicker
                date={
                  localFilters.end_date
                    ? new Date(localFilters.end_date)
                    : undefined
                }
                setDate={(date) => handleDateChange("end_date", date)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-4 pt-4">
        <Button
          variant={"outline"}
          className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-1/2 h-14 rounded-xl border"
          onClick={() => {
            setLocalFilters({});
            setFilters({});
            setIsOpen(false);
          }}
        >
          Clear All
        </Button>
        <Button
          variant={"secondary"}
          className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-1/2 h-14 rounded-xl border"
          onClick={applyFilters}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

export default TransactionFilter;
