import Exceptions from "@/components/exceptions";
import Layout from "@/layout/home";
import { NotFoundException, Reports } from "@/public/svg/exceptions";
import React from "react";

function NotFoundPage() {
  return (
    <Layout page={"404-page"}>
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={<NotFoundException />}
          title="Something Went Wrong!"
          description="This doesn’t happen often, you can let our support know."
          buttonText="Whatsapp Support"
        />
      </div>
    </Layout>
  );
}

export default NotFoundPage;
