"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import FilterIcons from "./filter-icons";
import { PageFilter } from "@/config/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FetchAndStoreOptions } from "@/utils/fetchOptions";
import { useAuth } from "@/lib/auth";

function Filters({
  selectOptions,
  selectedFilters,
  onChange,
}: {
  selectOptions: PageFilter[];
  selectedFilters: { [key: string]: string | number };
  onChange: (key: string, value: string | null) => void;
}) {
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>(
    {}
  );
  const auth = useAuth();

  useEffect(() => {
    const fetchOptions = async (filter: PageFilter) => {
      if (filter.source) {
        try {
          const token = await auth.user?.getIdToken(true);
          const response = await FetchAndStoreOptions(
            filter.key,
            filter.source,
            token
          );
          setFilterOptions((prev) => ({
            ...prev,
            [filter.key]: ["All", ...response],
          }));
        } catch (error) {
          console.error(`Failed to fetch options for ${filter.key}`, error);
        }
      }
    };

    selectOptions.forEach((filter) => {
      if (!filterOptions[filter.key] && filter.source) {
        fetchOptions(filter);
      } else if (filter.options && !filterOptions[filter.key]) {
        setFilterOptions((prev) => ({
          ...prev,
          [filter.key]: [
            ...(filter.key !== "end_year" ? ["All"] : []),
            ...(filter.options || []),
          ],
        }));
      }
    });
  }, [selectOptions, filterOptions]);

  const handleSearchChange = (key: string, value: string) => {
    setSearchQueries((prev) => ({ ...prev, [key]: value }));
  };

  const handleOptionChange = (key: string, value: string) => {
    if (value === "All") {
      onChange(key, null); // Remove key-value pair
    } else {
      onChange(key, value);
    }
  };

  return (
    <nav className="w-full bg-background sticky z-20 top-0">
      <div className="w-full rounded-md overflow-scroll">
        {/* Mobile Drawer */}
        <div className="flex items-center justify-start space-x-2 py-2 px-2 md:hidden">
          {selectOptions.map((select, index) => (
            <Drawer key={index}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full text-sm text-muted-foreground p-2 h-8",
                    selectedFilters[select.key]
                      ? "bg-primary/10 hover:bg-primary/20"
                      : "bg-white hover:bg-primary/10"
                  )}
                >
                  {select.label}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[60%] p-2">
                <DrawerHeader className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FilterIcons option={select.label} />
                    <DrawerTitle className="font-light text-lg text-secondary">
                      {select.label}
                    </DrawerTitle>
                  </div>
                </DrawerHeader>
                {select.searchable && (
                  <Input
                    placeholder="Search"
                    value={searchQueries[select.key] || ""}
                    onChange={(e) =>
                      handleSearchChange(select.key, e.target.value)
                    }
                    className="bg-secondary-foreground border-2 font-bold text-secondary"
                  />
                )}
                <div className="space-y-4 overflow-y-scroll mt-2">
                  <RadioGroup
                    value={selectedFilters[select.key]?.toString() || "All"}
                    onValueChange={(value) =>
                      handleOptionChange(select.key, value)
                    }
                  >
                    {filterOptions[select.key] ? (
                      filterOptions[select.key]
                        .filter((option) =>
                          option
                            ?.toLowerCase()
                            .includes(
                              (searchQueries[select.key] || "").toLowerCase()
                            )
                        )
                        .map((option, idx) => (
                          <DrawerClose key={idx}>
                            <div
                              key={idx}
                              className="flex items-center space-x-2 p-2"
                            >
                              <RadioGroupItem
                                value={option}
                                id={`${select.key}-${option}`}
                              />
                              <Label
                                htmlFor={`${select.key}-${option}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {option}
                              </Label>
                            </div>
                          </DrawerClose>
                        ))
                    ) : (
                      <div>Loading options...</div>
                    )}
                  </RadioGroup>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
        {/* Desktop Dropdown */}
        <div className="hidden items-center justify-start space-x-2 py-2 px-2 md:flex">
          {selectOptions.map((select, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full text-sm text-muted-foreground p-2 h-8",
                    selectedFilters[select.key]
                      ? "bg-primary/10 hover:bg-primary/20"
                      : "bg-white hover:bg-primary/10"
                  )}
                >
                  {select.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[600px] p-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FilterIcons option={select.label} />
                    <h3 className="font-semibold text-base text-secondary">
                      {select.label}
                    </h3>
                  </div>
                </div>
                {select.searchable && (
                  <Input
                    placeholder="Search"
                    value={searchQueries[select.key] || ""}
                    onChange={(e) =>
                      handleSearchChange(select.key, e.target.value)
                    }
                    className="bg-secondary-foreground border-2 font-bold text-secondary mt-2"
                  />
                )}
                <div className="space-y-4 overflow-y-scroll mt-2 max-h-[600px]">
                  <RadioGroup
                    value={selectedFilters[select.key]?.toString() || "All"}
                    onValueChange={(value) =>
                      handleOptionChange(select.key, value)
                    }
                  >
                    {filterOptions[select.key] ? (
                      filterOptions[select.key]
                        .filter((option) =>
                          option
                            ?.toLowerCase()
                            .includes(
                              (searchQueries[select.key] || "").toLowerCase()
                            )
                        )
                        .map((option, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 p-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${select.key}-${option}`}
                            />
                            <Label
                              htmlFor={`${select.key}-${option}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </Label>
                          </div>
                        ))
                    ) : (
                      <div>Loading options...</div>
                    )}
                  </RadioGroup>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Filters;
