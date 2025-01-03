import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { Drive, Reports } from "@/public/svg/exceptions";
import React from "react";

function RealDrivePage() {
  return (
    <Layout page={"real-drive"} title="Real Drive">
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Drive />}
          title="Agency Drive: This feature is not yet enabled for your agency."
          description="Admins or managers, can store all the important documents and collaterals for team. Easy reference all in one place. "
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default RealDrivePage;
