"use client";
import React, { useState } from "react";
import Navbar from "./nav/navBar";
import NavBottom from "./nav/navBottom";

function Layout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string>("home");

  const handleIconClick = (iconName: string) => {
    setSelected(iconName);
  };
  return (
    <>
      <Navbar />
      {children}
      <NavBottom selected={selected} handleIconClick={handleIconClick} />
    </>
  );
}

export default Layout;
