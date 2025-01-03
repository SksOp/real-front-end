import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { Leaderboard } from "@/public/svg/exceptions";

import React from "react";

function LeaderboardPage() {
  return (
    <Layout page={"leaderboard"} title="Leaderboard">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Leaderboard />}
          title="Leaderboard"
          description="Visibility into how you perform and action plan to be in the top 1%."
          buttonText="Whatsapp Support"
        />
      </div>
    </Layout>
  );
}

export default LeaderboardPage;
