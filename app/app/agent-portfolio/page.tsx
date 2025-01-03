import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { Portfolio } from "@/public/svg/exceptions";
import { AgentPortfolioLogo } from "@/public/svg/toolbox";
import React from "react";

function AgentPortfolioPage() {
  return (
    <Layout page={"map-view"} title="Map View">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Portfolio />}
          title="AI for all your needs"
          description="You’ll be able to create your professional real estate website which includes listing, insights, calculators, AI and more."
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default AgentPortfolioPage;
