"use client";
import TermsContent from "@/components/termsContent";
import Layout from "@/layout/secondary";
import React from "react";

function TermsPage() {
  return (
    <Layout page="terms" title="Terms and Conditions">
      <TermsContent />
    </Layout>
  );
}

export default TermsPage;
