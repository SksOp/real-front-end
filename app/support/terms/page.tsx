"use client";
import Layout from "@/layout/secondary";
import { useRouter } from "next/navigation";
import React from "react";

function TermsPage() {
  const router = useRouter();
  return (
    <Layout page="terms" title="Terms and Conditions">
      <div className="flex flex-col gap-4 w-full pt-12 md:pt-20 px-2 pb-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            1. Acceptance of Terms
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            By accessing or using KeyPilot LLC’s services, including our
            website, app, and related tools, you agree to comply with these
            Terms and Conditions ("Terms"). Please read them carefully. If you
            do not agree to these Terms, please do not use our services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            2. Description of Services
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            KeyPilot LLC provides data analytics, property insights, and other
            digital services for real estate professionals. Our data and
            analytics are sourced and regulated in alignment with Dubai Land
            Department and other UAE government standards.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            3. Privacy
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            Our commitment to privacy and data protection is detailed in our
            Privacy Policy and complies with UAE regulations and global GDPR
            standards. By using our services, you also agree to our{" "}
            <span
              className="text-primary font-bold underline"
              onClick={() => router.push("/support/privacy")}
            >
              Privacy Policy.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            4. User Responsibilities
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            You agree to:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-base font-normal">
            <li>
              Provide accurate, up-to-date information during registration and
              while using our services.
            </li>
            <li>
              Use the services only for lawful purposes and as permitted by
              these Terms.
            </li>
            <li>Maintain the confidentiality of your account information.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            5. Intellectual Property
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            All content, design, software, and trademarks on KeyPilot LLC’s
            platform are owned or licensed by KeyPilot LLC. Users are prohibited
            from copying, distributing, or modifying any proprietary content
            without written permission.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            6. Limitations and Restrictions
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            No Unauthorized Access: Users may not attempt to gain unauthorized
            access to our systems or data.
          </p>
          <p className="text-muted-foreground text-base font-normal">
            No Misuse of Information: You may not use our platform or data for
            purposes that infringe on the rights of others, violate any law, or
            engage in fraudulent activities.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            7. Data and Analytics Disclaimer
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            KeyPilot LLC provides data and analytics intended to assist real
            estate professionals. While we strive to maintain accurate and
            current data, we cannot guarantee complete accuracy or
            applicability. Users acknowledge that KeyPilot LLC is not liable for
            decisions made based on our data.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            8. Limitation of Liability
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            To the fullest extent permitted by law, KeyPilot LLC shall not be
            liable for any damages, including direct, indirect, or consequential
            damages, arising from or related to the use of our services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            9. Indemnification
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            Users agree to indemnify and hold harmless KeyPilot LLC, its
            affiliates, employees, and partners from any claims or demands
            arising out of their use of our services or violation of these
            Terms.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-base font-bold">
            10. Modification of Terms
          </h3>
          <p className="text-muted-foreground text-base font-normal">
            KeyPilot LLC reserves the right to update these Terms at any time.
            We will notify users of significant changes. Your continued use of
            the services after modifications constitutes acceptance of the new
            Terms.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default TermsPage;
