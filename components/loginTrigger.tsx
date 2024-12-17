import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LogInModel from "./logInModel";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

function LoginTrigger({
  children,
  className,
}: {
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
          <DrawerContent className="max-h-[80vh] p-0 ">
            <LogInModel />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="md:block hidden w-full">
        <Dialog>
          <DialogTrigger className={cn("", className)}>
            {children}
          </DialogTrigger>
          <DialogContent className="max-h-[75vh]  overflow-y-scroll">
            <LogInModel />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default LoginTrigger;
