"use client";
import React, { useRef, useState } from "react";
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
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Area } from "@/constants/area";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import AreaDrawerView from "./area-drawer-view";
import DashboardDrawerView from "./dashboard-drawer-view";
import FilterIcons from "./filter-icons";
import { ChevronDown, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Progressbar from "./progressbar";

function Filters() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(
    null
  );
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedUsage, setSelectedUsage] = useState<string | null>();
  const [isFreehold, setIsFreehold] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);

  // const [averageTransactionValue, setAverageTransactionValue] = useState<
  //   TransactionChart[] | null
  // >(null);
  // const [LocationData, setLocationData] = useState<LocationSales[] | null>(
  //   null
  // );

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter((prev: any) => (prev === value ? null : value));
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     fetchLocationSales().then((data) => {
  //       setLocationData(data);
  //     });
  //   };
  //   fetchData();
  // }, []);

  const selectOptions = [
    {
      value: selectedRoom,
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

  let filter = {
    bed_rooms: selectedRoom,
    developer: selectedDeveloper,
    area: selectedArea,
  };

  // const handleClick = () => {
  //   fetchSales(filter).then((data) => {
  //     if (!data) {
  //       console.error("No data found");
  //       return;
  //     }
  //     // console.log("data :",data)
  //     const transactionData = getTransactionChartObject(data);
  //     // console.log("transactionData :",transactionData);
  //     // console.log("chartData :",chartData);
  //     setAverageTransactionValue(transactionData);
  //   });
  // };

  const renderOptions = (select: any) => {
    return select.options.map((option: string, idx: number) => (
      <div key={idx} className="flex items-center space-x-2 p-2">
        <input
          type="radio"
          id={`${select.label}-${option}`}
          name={select.label}
          checked={select.value === option}
          onChange={() => select.onChange(option)}
          className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
        <label
          htmlFor={`${select.label}-${option}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {option}
        </label>
      </div>
    ));
  };

  const clearFilters = () => {
    setSelectedRoom(null);
    setSelectedLocation(null);
    setSelectedDeveloper(null);
    setSelectedArea(null);
    setSelectedUsage(null);
    setIsFreehold(null);
    setPropertyType(null);
  };

  return (
    <nav className="w-full bg-background sticky z-20 top-0">
      <ScrollArea className="w-full rounded-md overflow-scroll">
        <div className="flex items-center justify-start  space-x-2 py-2 px-2">
          {/* <XIcon
            className="border border-accent rounded-full "
            onClick={clearFilters}
          />
          <div className="w-[1px] h-8 bg-muted" /> */}
          {selectOptions.map((select, index) => (
            <Drawer key={index}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    " rounded-full  text-sm text-muted-foreground p-2  h-8 hover:bg-primary/10",
                    select.value ? "bg-primary/10 " : "bg-background"
                  )}
                >
                  {select.label}
                  {/* <ChevronDown /> */}
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
    </nav>
  );
}

export default Filters;
