import React from "react";

function PrivacyContent() {
  return (
    <div className="flex flex-col gap-4 w-full pt-12 md:pt-4 px-2 pb-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          1. Introduction
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          KeyPilot LLC ("we," "us," or "our") respects your privacy and is
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your information in
          compliance with UAE data protection laws and global GDPR practices.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          2. Information We Collect
        </h3>
        <ul className="list-disc pl-5 text-muted-foreground text-base font-normal">
          <li>
            Personal Information: When you register or use our services, we may
            collect information such as your name, email address, phone number,
            and account credentials.
          </li>
          <li>
            Usage Data: We collect data on how you use our platform, including
            interactions with features, preferences, and usage patterns.
          </li>
          <li>
            Cookies and Tracking: We use cookies and similar technologies to
            enhance user experience and improve service functionality. You can
            control cookie preferences in your browser settings.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          3. How We Use Your Information
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          We may use your information to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground text-base font-normal">
          <li>Provide, improve, and personalize our services.</li>
          <li>
            Communicate with you, including sending promotional offers and
            updates.
          </li>
          <li>
            Comply with legal obligations, including data retention and
            regulatory requirements.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          4. Data Sharing and Disclosure
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          We do not sell your data. We may share information with trusted third
          parties for service provision, compliance, and legal requirements.
          These parties are required to maintain the confidentiality of your
          data.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          5. Data Security
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          We implement industry-standard security measures to protect your data.
          While we strive to ensure data security, no system is entirely
          foolproof. Users are responsible for maintaining the confidentiality
          of their account credentials.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          6. Your Rights
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          Under GDPR and UAE data privacy laws, you have the right to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground text-base font-normal">
          <li>Access, correct, or delete your personal data.</li>
          <li>Object to or restrict the processing of your data.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p className="text-muted-foreground text-base font-normal">
          For inquiries or requests, contact us at [Contact Email].
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          7. Data Retention
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          We retain personal data for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy, including regulatory and
          legal obligations.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-muted-foreground text-base font-bold">
          8. Changes to this Privacy Policy
        </h3>
        <p className="text-muted-foreground text-base font-normal">
          We may update this Privacy Policy periodically. We encourage you to
          review it regularly to stay informed of any changes. Your continued
          use of our services constitutes acceptance of any updates.
        </p>
      </div>
    </div>
  );
}

export default PrivacyContent;
