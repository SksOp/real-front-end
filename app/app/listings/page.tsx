import Exceptions from "@/components/exceptions";
import ListingSelector from "@/components/listing-selector";
import PropertiesCard from "@/components/propertiesCard";
import SecondaryNavbar from "@/components/secondaryNavbar";
import { properties1 } from "@/constants/properties";
import Layout from "@/layout/secondary";
import { PremiumException } from "@/public/svg/exceptions";
import Link from "next/link";
import React from "react";

function ListingPage() {
  return (
    <Layout page={"my-listings"} title="listings">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<PremiumException />}
          title="This Is for Premium Users"
          description="This feature is only available for registered brokers."
          className="col-span-2"
        />
        {/* <div className=" w-full flex flex-col gap-3 mt-16 md:mt-20">
          <h3 className="text-secondary font-semibold text-base pl-2">
            My listings ({properties1.length})
          </h3>
          <div className="flex gap-5 w-full ">
            <div className="md:w-1/3 md:max-w-md w-full md:max-h-screen md:overflow-y-auto ">
              <ListingSelector />
            </div>
            <div className="md:flex md:flex-col hidden flex-grow items-center justify-start gap-3 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
              No Dashboard Selected
            </div>
            <div className="lg:flex hidden  max-w-md justify-center "></div>
          </div>
        </div> */}
      </div>
      {/* <div className="flex flex-col gap-3 px-3 py-14">
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
      </div> */}
    </Layout>
  );
}

export default ListingPage;
