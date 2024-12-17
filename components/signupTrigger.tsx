import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import SignInModel from "./signInModel";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function SignupTrigger({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" md:hidden">
        <Drawer>
          <DrawerTrigger>{children}</DrawerTrigger>
          <DrawerContent className="max-h-[80vh] p-0 ">
            <SignInModel />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="md:block hidden">
        <Dialog>
          <DialogTrigger>{children}</DialogTrigger>
          <DialogContent className="max-h-[75vh]  overflow-y-scroll">
            <SignInModel />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default SignupTrigger;
