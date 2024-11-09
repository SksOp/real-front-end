"use client";
import React, { useRef, useState } from "react";
import Progressbar from "@/components/progressbar";
import SecondaryNavbar from "./nav/navbar";
import Navbar from "../home/nav/navBar";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

function Layout({
  children,
  title,
  page,
  className,
}: {
  children: React.ReactNode;
  page: string;
  title: string;
  className?: ClassValue;
}) {
  const mainRef = useRef<HTMLElement | null>(null);
  return (
    <main
      className="min-h-screen relative bg-gradient-to-b from-backgrounds to-[#FAFAFA] w-full max-w-screen"
      ref={mainRef}
    >
      <Navbar page={page} className="hidden md:block" />

      <SecondaryNavbar title={title} className={cn("md:hidden", className)} />
      <Progressbar target={mainRef} className="top-11 md:top-16" />
      <div className=" ">{children}</div>
      {/* <NavBottom selected={page} /> */}
    </main>
  );
}

export default Layout;
