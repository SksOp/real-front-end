import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import PrivacyContent from "./privacyContent";

function PrivacyTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="overflow-y-scroll pt-4 min-w-[45%]">
        <SheetTitle className="text-base text-secondary ">
          Privacy Policy
        </SheetTitle>
        <PrivacyContent />
      </SheetContent>
    </Sheet>
  );
}

export default PrivacyTrigger;
