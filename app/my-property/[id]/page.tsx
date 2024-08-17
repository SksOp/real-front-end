"use client";
import MortageCalculator from "@/components/mortage-calculator";
import PropertyAminities from "@/components/property-aminities";
import PropertyDescription from "@/components/property-description";
import PropertyHeader from "@/components/property-header";
import PropertyImageGallary from "@/components/property-image-gallary";
import PropertyKeyInformation from "@/components/property-keyInformation";
import { Button } from "@/components/ui/button";
import Navbar from "@/layout/nav/navBar";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <PropertyHeader />
      <PropertyImageGallary />
      <PropertyDescription />
      <PropertyAminities />
      <PropertyKeyInformation />
      <MortageCalculator />
      <div className="fixed bottom-0 bg-background flex items-center justify-center gap-4 px-4 py-6 w-full">
        <Button
          variant={"ghost"}
          className="w-1/2 text-secondary font-bold rounded-full border-2"
        >
          Magic Link
        </Button>
        <Button
          variant={"secondary"}
          className="text-background font-bold w-1/2 rounded-full border-2"
        >
          PDF Brochure
        </Button>
      </div>
    </div>
  );
}

export default page;
