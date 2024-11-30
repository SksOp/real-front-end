"use client";
import React, { useRef, useState } from "react";
import Navbar from "./nav/navBar";
import Progressbar from "@/components/progressbar";

function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  const mainRef = useRef<HTMLElement | null>(null);
  return (
    <main ref={mainRef}>
      <Navbar page={page} />
      <Progressbar target={mainRef} className="" />
      <div className="min-h-screen bg-gradient-to-b from-backgrounds to-[#FAFAFA] max-w-screen overflow-y-auto mt-4">
        {children}
      </div>
      {/* <NavBottom selected={page} /> */}
    </main>
  );
}

export default Layout;
