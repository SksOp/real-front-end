import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { Reports } from "@/public/svg/exceptions";
import React from "react";

function DailyReportsPage() {
  return (
    <Layout page={"daily-reports"} title="Daily Reports">
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Reports />}
          title="Daily Reports: Stay ontop of the market progress!"
          description="Customized daily reports sent to you at your preferred time. Watching progress has never been easier!"
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default DailyReportsPage;
