import React, { useState, ChangeEvent } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import DatePicker from "./date-picker";
import { Button } from "./ui/button";

function TransactionFilter({
  setFilters,
}: {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number;
    }>
  >;
}) {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const filterOptions = [];

  const handleFilterChange = (name: string, value: string) => {};

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFromDate(date);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-center text-secondary text-base font-bold">Filter</h3>
      <div className="flex flex-col gap-5">
        {/* {filterOptions.map((filter) => (
          <div key={filter.name} className="flex flex-col gap-2">
            <Label className="text-secondary font-semibold text-sm">
              {filter.label}
            </Label>
            <RadioGroup
              className="flex justify-start items-center gap-5 py-2"
              onValueChange={(value) => handleFilterChange(filter.name, value)}
            >
              {filter.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-start gap-1"
                >
                  <RadioGroupItem
                    value={option.value}
                    className="text-secondary border-accent"
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-muted-foreground font-normal text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))} */}
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
                date={fromDate}
                setDate={(date: Date | undefined) => handleDateChange(date)}
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
                date={toDate}
                setDate={(date: Date | undefined) => handleDateChange(date)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-4 pt-4">
        <Button
          variant={"outline"}
          className="text-secondary flex text-sm justify-center items-center gap-4 focus:bg-none font-normal w-1/2 h-14 rounded-xl border"
          // onClick={}
        >
          Clear All
        </Button>
        <Button
          variant={"secondary"}
          className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-1/2 h-14 rounded-xl border"
          // onClick={() => handleCalculate(filters)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

export default TransactionFilter;
