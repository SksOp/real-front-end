import LogInModel from "@/components/logInModel";
import SignInModel from "@/components/signInModel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MainLogo } from "@/public/svg/logo";
import React from "react";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-backgrounds to-[#FAFAFA] max-w-screen overflow-y-auto pt-4 ">
      <nav className="w-full bg-background fixed flex justify-between shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] items-center z-50 px-5 py-4 top-0 ">
        <div className="flex justify-between items-center w-full ">
          <div className="flex items-center justify-start gap-3">
            <MainLogo />
            <h1 className="text-xl text-secondary font-bold">Keypilot.</h1>{" "}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <Button>Join Now </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[75vh]  overflow-y-scroll">
              <SignInModel />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"} className="">
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent>
              <LogInModel />
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default LoginLayout;
