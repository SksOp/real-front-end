import PropertiesCard from "@/components/propertiesCard";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { properties1 } from "@/constants/properties";
import Link from "next/link";
import React from "react";

function ListingPage() {
  return (
    <SecondaryNavbar title="listings">
      <div className="flex flex-col gap-3 px-3 py-14">
        <h3 className="text-secondary font-semibold text-base pl-2">
          My listings ({properties1.length})
        </h3>
        {properties1.map((property, index) => (
          <Link href={`listings/${index + 1}`} key={index}>
            <PropertiesCard
              name={property.title}
              key={index}
              imageUrl={property?.imageURLs ? property?.imageURLs[0]! : ""}
              price={Number(property.price.replace(/[^0-9.]/g, ""))}
              location={property.location}
              area={Number(property.area.replace(/[^0-9.]/g, ""))}
              bedrooms={Number(property.bedrooms)}
              bathrooms={Number(property.bathrooms)}
            />
          </Link>
        ))}
      </div>
    </SecondaryNavbar>
  );
}

export default ListingPage;
