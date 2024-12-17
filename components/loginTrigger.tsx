import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LogInModel from "./logInModel";

function LoginTrigger({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:hidden w-full">
        <Drawer>
          <DrawerTrigger className="w-full">{children}</DrawerTrigger>
          <DrawerContent className="max-h-[80vh] p-0 ">
            <LogInModel />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="md:block hidden w-full">
        <Dialog>
          <DialogTrigger>{children}</DialogTrigger>
          <DialogContent className="max-h-[75vh]  overflow-y-scroll">
            <LogInModel />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default LoginTrigger;
