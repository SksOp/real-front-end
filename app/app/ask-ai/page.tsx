import Exceptions from "@/components/exceptions";
import Layout from "@/layout/secondary";
import React from "react";

function AskAIPage() {
  return (
    <Layout page={"ask-ai"} title="Ask AI">
      <div className="flex w-full justify-center px-2 items-center h-[calc(100vh-1rem)]">
        <Exceptions
          svg={
            <img
              src="/imgs/ai.svg"
              alt="ai"
              className="w-16 h-16 object-cover animate-spin-slow"
            />
          }
          title="AI for all your needs"
          description="Experience the power of AI to find insights easily and to assist in collaboration."
          buttonText="Request Access"
        />
      </div>
    </Layout>
  );
}

export default AskAIPage;
