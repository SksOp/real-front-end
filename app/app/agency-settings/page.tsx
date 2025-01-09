import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import { PremiumException } from "@/public/svg/exceptions";

import React from "react";

function AgencySettingPage() {
  return (
    <Layout page={"agency-setting"} title="Agency Setting">
      <div className="flex w-full justify-center  items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<PremiumException />}
          title="This feature isn’t yet enabled for your agency."
          description="Don't worry, it's free! You or your agency admin can contact us to enable this feature. Branding, custom dashboards, tons of other features tailored for agency;"
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default AgencySettingPage;
