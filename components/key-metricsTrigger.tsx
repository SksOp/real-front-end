import React from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import KeyMatricsContent from "./keyMetricsContent";
import { IntroCardProps } from "@/types/introcard";

function KeyMatricsTrigger({
  matrix,
  children,
  className,
}: {
  matrix: IntroCardProps;
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
          <DrawerContent className="min-h-[80vh] p-0 px-2 pt-2">
            <DrawerTitle className="text-secondary text-base font-semibold text-center">
              {matrix.title}
            </DrawerTitle>
            <KeyMatricsContent
              matrix={matrix.key ?? ""}
              description={matrix.description}
            />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="md:block hidden w-full">
        <Sheet>
          <SheetTrigger className={cn("", className)}>{children}</SheetTrigger>
          <SheetContent className="  overflow-y-scroll">
            <SheetTitle>{matrix.title}</SheetTitle>
            <KeyMatricsContent
              matrix={matrix.key ?? ""}
              description={matrix.description}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default KeyMatricsTrigger;
