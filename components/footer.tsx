"use client";
import { useRouter } from "next/navigation";
import React from "react";
import TermsTrigger from "./termsTrigger";
import PrivacyTrigger from "./privacyTrigger";
import { MainLogo } from "@/public/svg/logo";

function Footer() {
  const router = useRouter();
  return (
    <>
      <div className="w-full py-2 md:hidden ">
        <div className="flex flex-col gap-4 w-full items-center justify-center border-t">
          <div className="flex gap-1 items-center justify-center pt-2">
            <MainLogo className="w-5 h-5 animate-spin-slow " />
            <h1 className="text-xl font-bold  ">Keypilot.</h1>
          </div>

          <h3
            className="text-secondary font-normal text-xs"
            onClick={() => router.push("/support/terms")}
          >
            Terms of Use
          </h3>
          <h3
            className="text-secondary font-normal text-xs"
            onClick={() => router.push("/support/privacy")}
          >
            Privacy Policy
          </h3>
          <h3 className="text-secondary font-normal text-xs">Feedback</h3>
          <h3 className="text-secondary font-normal text-xs">Contact</h3>
          <p className="text-accent font-normal text-xs">
            &#169; 2024 copy rights reserved.
          </p>
        </div>
      </div>
      <div className="hidden bg-[#F2F2F2] md:flex flex-col gap-2 w-full justify-center items-center pt-6 rounded-t-2xl pb-10">
        <div className="flex gap-1 items-center justify-center pt-2">
          <MainLogo className="w-5 h-5 animate-spin-slow " />
          <h1 className="text-[1.438rem] font-bold text-[#161616] ">
            Keypilot.
          </h1>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-[#161616] font-normal text-xs">
            <TermsTrigger>
              <span>Terms of Use</span>
            </TermsTrigger>{" "}
            |{" "}
            <PrivacyTrigger>
              {" "}
              <span>Privacy Policy</span>
            </PrivacyTrigger>{" "}
            | Feedback | Contact
          </div>
          <p className="text-[#161616] font-normal text-sm">
            &#169; 2024 copy rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
