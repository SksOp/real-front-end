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
  const [selected, setSelected] = useState<string>(page);

  const handleIconClick = (iconName: string) => {
    setSelected(iconName);
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen overflow-y-auto">
        {children}
      </div>
      <NavBottom selected={selected} handleIconClick={handleIconClick} />
    </>
  );
}

export default Layout;
