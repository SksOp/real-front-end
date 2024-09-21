"use client";
import MortageCalculator from "@/components/mortage-calculator";
import PDFViewer from "@/components/pdfViewer";
import PropertyAminities from "@/components/property-aminities";
import PropertyDescription from "@/components/property-description";
import PropertyHeader from "@/components/property-header";
import PropertyImageGallary from "@/components/property-image-gallary";
import PropertyKeyInformation from "@/components/property-keyInformation";
import ShareComponent from "@/components/shareComponent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navbar from "@/layout/nav/navBar";
import {
  CopyIcon,
  LinkIcon,
  MagicLinkIcon,
  PDFDownloadingIcon,
  PDFIcon,
} from "@/public/svg/icons";
import React from "react";

function page() {
  const pdfUrl = "/test.pdf";
  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-4 gap-4 mt-12 mb-32">
        <PropertyHeader />
        <PropertyImageGallary />
        <PropertyDescription />
        <PropertyAminities />
        <PropertyKeyInformation />

        <MortageCalculator />
      </div>
      <div className="fixed bottom-0 bg-background flex items-center justify-center gap-4 px-4 py-3 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant={"ghost"}
              className="w-1/2 flex justify-center items-center gap-4 text-secondary font-semibold h-14 rounded-lg border"
            >
              <MagicLinkIcon />
              Magic Link
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle className="text-center text-xl p-4">
              Magic link
            </DrawerTitle>
            <div className="p-4 flex justify-center items-center gap-2">
              <LinkIcon className="w-8 h-8" />
              <h3 className="truncate text-lg">
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
              className="text-background flex justify-center items-center gap-4 focus:bg-none font-semibold w-1/2 h-14 rounded-lg border"
            >
              <PDFIcon />
              PDF Brochure
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-xl p-4">
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
    </>
  );
}

export default page;
