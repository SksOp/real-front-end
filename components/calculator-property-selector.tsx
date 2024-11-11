"use client";
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Search, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { properties1 } from "@/constants/properties";
import PropertiesCard from "./propertiesCard";
import { ListingDataType } from "@/types/listing";

function CalculatorPropertySelector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedProperty, setSelectedProperty] =
    useState<ListingDataType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePropertySelect = (property: ListingDataType) => {
    setSelectedProperty(property);
    setIsOpen(false);
  };

  // Filter properties based on the search query
  const filteredProperties = properties1.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <h3 className="text-muted-foreground text-sm font-normal">
          Want to calculate the ROI of the property you listed already?{" "}
          <DrawerTrigger>
            <span className="text-primary font-semibold xs ">
              Click to Select
            </span>
          </DrawerTrigger>
        </h3>
        {selectedProperty && (
          <div className="relative w-full px-2">
            <button
              className="absolute -top-4 -right-2 bg-background rounded-full p-1 z-50 text-red-500 border"
              onClick={() => setSelectedProperty(null)}
            >
              <Trash2 size={25} />
            </button>
            <PropertiesCard
              name={selectedProperty.title}
              imageUrl={
                selectedProperty?.imageURLs
                  ? selectedProperty?.imageURLs[0]!
                  : ""
              }
              price={Number(selectedProperty.price.replace(/[^0-9.]/g, ""))}
              location={selectedProperty.location}
              area={Number(selectedProperty.area.replace(/[^0-9.]/g, ""))}
              bedrooms={Number(selectedProperty.bedrooms)}
              bathrooms={Number(selectedProperty.bathrooms)}
            />
          </div>
        )}
      </div>

      <DrawerContent className="px-3">
        <h3 className="text-secondary text-center font-bold text-base py-3">
          My Lists
        </h3>

        <div className="flex flex-col gap-3">
          <div className="relative w-full py-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 bg-card" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 pr-4 bg-card rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-scroll">
            {filteredProperties.map((property, index) => (
              <div key={index} onClick={() => handlePropertySelect(property)}>
                <PropertiesCard
                  name={property.title}
                  imageUrl={property?.imageURLs ? property?.imageURLs[0]! : ""}
                  price={Number(property.price.replace(/[^0-9.]/g, ""))}
                  location={property.location}
                  area={Number(property.area.replace(/[^0-9.]/g, ""))}
                  bedrooms={Number(property.bedrooms)}
                  bathrooms={Number(property.bathrooms)}
                />
              </div>
            ))}
            {filteredProperties?.length === 0 && (
              <p className="text-center text-muted-foreground">
                No properties found
              </p>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CalculatorPropertySelector;
