import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { Reports, Teams } from "@/public/svg/exceptions";
import React from "react";

function MyTeamsPage() {
  return (
    <Layout page={"my-teams"} title="My Teams">
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Teams />}
          title="Its lonely here! Your agency team is not created yet."
          description="You or your admin can contact us to get the team created; May be your colleagues are already here, its just that team must be created."
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default MyTeamsPage;
