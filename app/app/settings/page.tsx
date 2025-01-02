"use client";
import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { PremiumException } from "@/public/svg/exceptions";
import React from "react";

function SettingsPage() {
  return (
    <Layout title="Settings" page="settings">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<PremiumException />}
          title="This Is for Premium Users"
          description="This feature is only available for registered brokers."
          buttonText="Whatsapp Support"
          className="col-span-2"
        />
      </div>
    </Layout>
  );
}

export default SettingsPage;
