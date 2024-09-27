"use client";
import React, { useState } from "react";
import Navbar from "./nav/navBar";
import NavBottom from "./nav/navBottom";

function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-b from-backgrounds to-[#FAFAFA] max-w-screen overflow-y-auto ">
        {children}
      </div>
      {/* <NavBottom selected={page} /> */}
    </>
  );
}

export default Layout;
