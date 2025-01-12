"use client";

import React, { ReactNode } from "react";
import useNetwork from "@/hooks/useNetwork";
import Layout from "@/layout/home";
import { NoInternetException } from "@/public/svg/exceptions";
import Exceptions from "./exceptions";

interface NetworkGuardProps {
  children: ReactNode;
}

const NetworkGuard: React.FC<NetworkGuardProps> = ({ children }) => {
  const networkStatus = useNetwork();

  if (networkStatus === "offline") {
    return (
      <Layout page="offline">
        <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
          <Exceptions
            svg={<NoInternetException />}
            title="No Internet Connection!"
            description="Please check your network connection."
          />
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default NetworkGuard;
