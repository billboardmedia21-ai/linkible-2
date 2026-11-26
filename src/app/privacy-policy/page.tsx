import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import LegalBody, { type LegalSection } from "@/components/sections/LegalBody";
import CTA from "@/components/sections/CTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Linkible collects, uses, stores and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    paragraphs: [
      `This policy explains what personal information Linkible collects, why we collect it, how we use it and the choices you have. It applies to this website and to our services.`,
      `We are based in Australia and comply with the Australian Privacy Principles. Where we handle data of individuals in the European Economic Area or the United Kingdom, we also comply with the GDPR and UK GDPR.`,
    ],
  },
  {
    id: "collect",
    heading: "2. Information we collect",
    paragraphs: [`We collect only what we need to respond to you and deliver our services:`],
    list: [
      "Contact details you submit — name, email address, phone number, company and website",
      "Campaign information you share with us, including analytics and search console access you grant",
      "Correspondence between you and our team",
      "Website usage data such as pages visited, referring source and approximate location derived from IP address",
      "Billing information, processed by our payment provider and never stored on our systems",
    ],
  },
  {
    id: "use",
    heading: "3. How we use your information",
    paragraphs: [`We use personal information to:`],
    list: [
      "Respond to enquiries and provide quotes or proposals",
      "Deliver, manage and report on the services you have purchased",
      "Process payments and maintain accounting records",
      "Send service updates and, where you have opted in, occasional marketing",
      "Improve our website and understand which content is useful",
    ],
  },
  {
    id: "legal-basis",
    heading: "4. Legal basis for processing",
    paragraphs: [
      `Where the GDPR applies, we rely on performance of a contract for service delivery, legitimate interests for responding to business enquiries and improving our services, consent for marketing communications, and legal obligation for tax and accounting records.`,
    ],
  },
  {
    id: "sharing",
    heading: "5. Sharing your information",
    paragraphs: [
      `We do not sell personal information. We share it only with service providers who help us operate — hosting, analytics, email, CRM and payment processing — each bound by contractual confidentiality obligations.`,
      `We may disclose information where required by law or to protect our legal rights.`,
    ],
  },
  {
    id: "cookies",
    heading: "6. Cookies and analytics",
    paragraphs: [
      `We use essential cookies to make the site function and analytics cookies to understand how it is used. Analytics cookies are only set where you consent.`,
      `You can control cookies through your browser settings. Blocking essential cookies may affect site functionality.`,
    ],
  },
  {
    id: "retention",
    heading: "7. Data retention",
    paragraphs: [
      `We retain enquiry data for twenty-four months from last contact, client campaign data for the duration of the engagement plus twenty-four months, and financial records for seven years as required by Australian tax law.`,
    ],
  },
  {
    id: "rights",
    heading: "8. Your rights",
    paragraphs: [`Depending on where you are located, you may have the right to:`],
    list: [
      "Access the personal information we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of your information, subject to our legal retention obligations",
      "Object to or restrict certain processing",
      "Request a portable copy of information you provided to us",
      "Withdraw consent to marketing at any time",
    ],
  },
  {
    id: "security",
    heading: "9. Security",
    paragraphs: [
      `We use encryption in transit, access controls, multi-factor authentication and least-privilege permissions across our systems. No method of transmission is completely secure, but we take reasonable steps to protect information from misuse, loss and unauthorised access.`,
    ],
  },
  {
    id: "contact-privacy",
    heading: "10. Contact and complaints",
    paragraphs: [
      `To exercise any right, or to raise a privacy concern, email ${site.email} or write to ${site.address}. We respond to privacy requests within thirty days.`,
      `If you are not satisfied with our response, you may complain to the Office of the Australian Information Commissioner, or to your local supervisory authority in the EEA or UK.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body="Last updated 1 September 2026. What we collect, why we collect it, and what you can ask us to do with it."
        crumbs={[{ label: "Privacy Policy" }]}
        compact
      />
      <LegalBody sections={sections} />
      <CTA
        title="Want your data removed?"
        body="Email us and we will action it within thirty days, and confirm in writing when it is done."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read Terms", href: "/terms" }}
      />
    </>
  );
}
