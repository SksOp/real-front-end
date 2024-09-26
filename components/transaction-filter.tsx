import React, { useState, ChangeEvent } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import DatePicker from "./date-picker";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  label: string;
  name: keyof Filters;
  options: FilterOption[];
}

interface Filters {
  type: string;
  transactionType: string;
  usage: string;
  holdType: string;
  parking: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
}

function TransactionFilter() {
  const [filters, setFilters] = useState<Filters>({
    type: "",
    transactionType: "",
    usage: "",
    holdType: "",
    parking: "",
    fromDate: undefined,
    toDate: undefined,
  });

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (name: keyof Filters, date: Date | undefined) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: date,
    }));
  };

  const filterOptions: FilterConfig[] = [
    {
      label: "Type",
      name: "type",
      options: [
        { label: "OffPlan", value: "offplan" },
        { label: "Ready", value: "ready" },
      ],
    },
    {
      label: "Transaction type",
      name: "transactionType",
      options: [
        { label: "Mortgage", value: "mortgage" },
        { label: "Sales", value: "sales" },
        { label: "Gift", value: "gift" },
      ],
    },
    {
      label: "Usage",
      name: "usage",
      options: [
        { label: "Residential", value: "residential" },
        { label: "Commercial", value: "commercial" },
      ],
    },
    {
      label: "Hold type",
      name: "holdType",
      options: [
        { label: "Freehold", value: "freehold" },
        { label: "Leasehold", value: "leasehold" },
      ],
    },
    {
      label: "Parking",
      name: "parking",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ];
  console.log(filters);
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-center text-secondary text-base font-bold">Filter</h3>
      <div className="flex flex-col gap-7">
        {filterOptions.map((filter) => (
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
                date={filters.fromDate}
                setDate={(date) => handleDateChange("fromDate", date)}
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
                date={filters.toDate}
                setDate={(date) => handleDateChange("toDate", date)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionFilter;
