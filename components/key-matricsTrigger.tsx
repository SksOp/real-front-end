import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import KeyMatricsContent from "./keyMatricsContent";

function KeyMatricsTrigger({
  matrix,
  children,
  className,
}: {
  matrix: string | number;
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <>
      <div className="md:hidden w-full">
        <Drawer>
          <DrawerTrigger className={cn("", className)}>
            {children}
          </DrawerTrigger>
          <DrawerContent className="min-h-[80vh] p-0 px-2">
            <KeyMatricsContent matrix={matrix} />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="md:block hidden w-full">
        <Sheet>
          <SheetTrigger className={cn("", className)}>{children}</SheetTrigger>
          <SheetContent className="  overflow-y-scroll">
            <KeyMatricsContent matrix={matrix} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default KeyMatricsTrigger;
