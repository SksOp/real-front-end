"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/layout/nav/navBar";
import PropertyHeader from "@/components/property-header";
import PropertyImageGallary from "@/components/property-image-gallary";
import PropertyDescription from "@/components/property-description";
import PropertyAminities from "@/components/property-aminities";
import PropertyKeyInformation from "@/components/property-keyInformation";
import MortageCalculator from "@/components/mortage-calculator";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ShareComponent from "@/components/shareComponent";
import {
  CopyIcon,
  LinkIcon,
  MagicLinkIcon,
  PDFDownloadingIcon,
  PDFIcon,
} from "@/public/svg/icons";
import { properties1 } from "@/constants/properties";
import Layout from "@/layout/secondary";
import ListingSelector from "@/components/listing-selector";

// Load PDFViewer dynamically, only on client side
const PDFViewer = dynamic(() => import("@/components/pdfViewer"), {
  ssr: false,
});

interface Property {
  price: string;
  title: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  imageURLs: string[];
  amenities: {};
  permitNumber: string;
  articleURL?: string;
  referenceNumber?: string;
}

function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(
    properties1[Number(id) - 1]
  );

  //   if (id && properties1) {
  //     try {
  //       const propertyId = Number(id);
  //       if (!isNaN(propertyId)) {
  //         const propertyData = properties1[propertyId - 1];
  //         if (propertyData) {
  //           setProperty(propertyData);
  //         } else {
  //           console.error(`No property found for id: ${propertyId}`);
  //         }
  //       } else {
  //         console.error("Invalid property id:", id);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load property data:", error);
  //     }
  //   }
  //   // }
  // }, [id]);

  // if (!isClient || !property) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Layout page="property-details" title="Property Details">
      <div className="w-full md:hidden">
        {property && (
          <div className="flex flex-col px-5 gap-4 pt-12 mb-32">
            <PropertyHeader
              imageURL={property.imageURLs[0]}
              title={property.title}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              price={property.price}
            />
            <PropertyImageGallary propertyImages={property.imageURLs} />
            <PropertyDescription />
            <PropertyAminities aminities={property.amenities} />
            <PropertyKeyInformation />

            <MortageCalculator />
          </div>
        )}
        <div className="fixed bottom-0 bg-background flex items-center justify-center gap-4 px-4 py-3 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant={"ghost"}
                className="w-1/2 flex text-sm justify-center items-center gap-4 text-secondary font-semibold h-14 rounded-lg border"
              >
                <MagicLinkIcon />
                Magic Link
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="text-center text-sm p-4">
                Magic link
              </DrawerTitle>
              <div className="p-4 flex justify-center items-center gap-2">
                <LinkIcon className="w-8 h-8" />
                <h3 className="truncate text-sm">
                  https://keypilot/Property_10435903?page=1&position=9&term=copy&origin=search&related_id=10435903
                </h3>
              </div>
              <div className="w-full items-center justify-center flex">
                <Button
                  variant={"ghost"}
                  className="border-secondary border text-secondary w-fit flex justify-center gap-2 items-center rounded-full"
                >
                  <CopyIcon />
                  Copy link
                </Button>
              </div>
              <ShareComponent />
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant={"secondary"}
                className="text-background flex text-sm justify-center items-center gap-4 focus:bg-none font-semibold w-1/2 h-14 rounded-lg border"
              >
                <PDFIcon />
                PDF Brochure
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col gap-2">
              <DrawerTitle className="text-center text-sm p-4">
                Share Brochure
              </DrawerTitle>
              <div className="w-full items-center justify-center flex">
                <Button
                  variant={"ghost"}
                  className="border-secondary border text-secondary w-fit focus:bg-none flex justify-center gap-2 items-center rounded-full"
                >
                  <PDFDownloadingIcon />
                  {/* <PDFViewer fileUrl={pdfUrl} /> */}
                  Download
                </Button>
              </div>
              <ShareComponent />
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="md:flex w-full justify-between hidden ">
        <div className="flex gap-5 w-full ">
          <div className=" w-full flex flex-col gap-3 mt-16 md:mt-20">
            <h3 className="text-secondary font-semibold text-base pl-2">
              My listings ({properties1.length})
            </h3>
            <div className="flex gap-5 w-full ">
              <div className="md:w-1/3 md:max-w-md w-full md:max-h-screen md:overflow-y-auto ">
                <ListingSelector />
              </div>
              <div className="md:flex md:flex-col md:w-2/4 hidden flex-grow items-center justify-start gap-3 md:max-h-screen md:overflow-y-auto">
                {property && (
                  <div className="flex flex-col px-5 gap-4">
                    <PropertyHeader
                      imageURL={property.imageURLs[0]}
                      title={property.title}
                      location={property.location}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      area={property.area}
                      price={property.price}
                    />
                    <PropertyImageGallary propertyImages={property.imageURLs} />
                    <PropertyDescription />
                    <PropertyAminities aminities={property.amenities} />
                    <PropertyKeyInformation />

                    <MortageCalculator />
                  </div>
                )}
              </div>
              <div className="lg:flex hidden  max-w-md justify-center "></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PropertyDetailPage;
