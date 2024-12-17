import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import TermsContent from "./termsContent";

function TermsTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="overflow-y-scroll pt-4 min-w-[45%]">
        <SheetTitle className="text-base text-secondary ">
          Terms and Condition
        </SheetTitle>
        <TermsContent />
      </SheetContent>
    </Sheet>
  );
}

export default TermsTrigger;
