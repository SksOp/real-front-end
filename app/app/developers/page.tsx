import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { PremiumException, Projects } from "@/public/svg/exceptions";
import React from "react";

function DevelopersPage() {
  return (
    <Layout page={"developers"} title="Developers">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<Projects />}
          title="Projects & Developers"
          description="Full list of all the projects and developers along with insights will be released soon!"
          buttonText="Whatsapp Support"
        />
      </div>
    </Layout>
  );
}

export default DevelopersPage;
