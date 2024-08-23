import React, { useState, ChangeEvent } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
}

function TransactionFilter() {
  const [filters, setFilters] = useState<Filters>({
    type: "",
    transactionType: "",
    usage: "",
    holdType: "",
    parking: "",
  });

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log(filters);
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-center text-secondary text-xl font-bold">Filter</h3>
      {filterOptions.map((filter) => (
        <div key={filter.name} className="flex flex-col gap-2">
          <Label className="text-secondary font-semibold text-lg">
            {filter.label}
          </Label>
          <RadioGroup
            className="flex items-center space-x-2"
            onValueChange={(value) => handleFilterChange(filter.name, value)}
          >
            {filter.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  className="text-muted-foreground border-muted-foreground"
                />

                {/* <input
                  id={option.value}
                  type="radio"
                  name={filter.name}
                  value={option.value}
                  checked={filters[filter.name] === option.value}
                  onChange={handleFilterChange}
                  className="form-radio h-4 w-4 text-muted-foreground transition duration-150 ease-in-out"
                /> */}
                <Label
                  htmlFor={option.value}
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}

export default TransactionFilter;
