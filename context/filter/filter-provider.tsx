"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Area } from "@/constants/area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AreaDrawerView from "@/components/area-drawer-view";
import DashboardDrawerView from "@/components/dashboard-drawer-view";
import FilterIcons from "@/components/filter-icons";
import { schema } from "@/public/schema/schema";

export const FilterContext = createContext({} as FilterContextProps);

interface FilterContextProps {
  filterString: string;
}

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedUsage, setSelectedUsage] = useState<string | null>(null); // Updated line
  const [isFreehold, setIsFreehold] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filterString, setFilterString] = useState<string>("");

  // useEffect(() => {
  //   const filter = "";
  //   for(let [index, value] of selectOptions.entries()) {
  //     if(value.value) {
  //       if(index === 0) {
  //         filter += `WHERE ${value.label} = '${value.value}'`;
  //       }
  //     }
  //   })
  //   });
  // }, []);

  const selectOptions = [
    {
      value: { roomsEn: selectedRoom },
      onChange: (val: any) => handleChange(setSelectedRoom, val),
      placeholder: "Bed Rooms",
      label: "Bedrooms",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      value: selectedDeveloper,
      onChange: (val: any) => handleChange(setSelectedDeveloper, val),
      placeholder: "Developer",
      label: "Developer",
      options: ["A", "B", "C"],
    },
    {
      value: selectedArea,
      onChange: (val: any) => handleChange(setSelectedArea, val),
      placeholder: "Area",
      label: "Area",
      options: Area,
    },
    {
      value: isFreehold,
      onChange: (val: any) => handleChange(setIsFreehold, val),
      placeholder: "Freehold",
      label: "Freehold",
      options: [
        "Yes",
        "No",
        // { value: "Yes", label: "Yes" },
        // { value: "No", label: "No" },
      ],
    },
  ];

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter((prev: any) => (prev === value ? null : value));
  };

  return (
    <FilterContext.Provider
      value={{
        filterString,
      }}
    >
      <div className="relative ">
        <ScrollArea className="w-full rounded-md overflow-auto">
          <div className="flex space-x-2 p-2">
            {selectOptions.map((select, index) => (
              <Drawer key={index}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "min-w-[120px] rounded-full",
                      select.value ? "bg-primary " : "bg-background"
                    )}
                  >
                    {select.label}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[60%] ">
                  <DrawerHeader className="flex justify-start items-center gap-2">
                    <FilterIcons option={select.label} />
                    <DrawerTitle className="font-light text-lg text-secondary">
                      {select.label}
                    </DrawerTitle>
                  </DrawerHeader>
                  {select.label === "Area" ? (
                    <AreaDrawerView
                      mostPopular={Area.MostPopularAreas}
                      otherAreas={Area.OtherAreas}
                    />
                  ) : select.label === "Dashboard" ? (
                    <DashboardDrawerView />
                  ) : (
                    <>
                      <DrawerDescription className="space-y-4">
                        {Array.isArray(select.options) &&
                          select.options.map((option, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 p-2"
                            >
                              <input
                                type="radio"
                                name={select.label}
                                checked={select.value === option}
                                onChange={() => select.onChange(option)}
                                className="form-radio h-4 w-4 text-muted transition duration-150 ease-in-out"
                              />
                              <label
                                htmlFor={option || ""}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                      </DrawerDescription>
                    </>
                  )}

                  {/* <DrawerFooter className="flex justify-end">
                  <DrawerClose asChild>
                    <Button variant="outline" onClick={handleClick}>
                      Submit
                    </Button>
                  </DrawerClose>
                </DrawerFooter> */}
                </DrawerContent>
              </Drawer>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {children}
    </FilterContext.Provider>
  );
};
