"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import DataCards from "./data-cards";
import { ListingDataType } from "@/types/listing";
import { properties1 } from "@/constants/properties";
import PropertiesCard from "./propertiesCard";

function ListingSelector() {
  const { id } = useParams<{ id: string }>();
  const [selectedListing, setSelectedListing] = React.useState<number | null>(
    id ? Number(id) : null
  );

  const createLink = (property: ListingDataType) => (
    <Link href={`/app/listings/${property.key}`}>
      <PropertiesCard
        key={property.key}
        name={property.title}
        imageUrl={property?.imageURLs ? property?.imageURLs[0]! : ""}
        price={Number(property.price.replace(/[^0-9.]/g, ""))}
        location={property.location}
        area={Number(property.area.replace(/[^0-9.]/g, ""))}
        bedrooms={Number(property.bedrooms)}
        bathrooms={Number(property.bathrooms)}
        className={
          selectedListing === property.key
            ? "border-2 border-secondary rounded-lg bg-[#FEF8F5]"
            : ""
        }
      />
    </Link>
  );

  const allProperties = properties1.map((property) => createLink(property));
  return (
    <div className="md:flex md:flex-col w-full  gap-3 px-2">
      {allProperties}
    </div>
  );
}

export default ListingSelector;
