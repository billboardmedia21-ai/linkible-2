import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import LegalBody, { type LegalSection } from "@/components/sections/LegalBody";
import CTA from "@/components/sections/CTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing use of Linkible services and this website.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "1. Agreement to terms",
    paragraphs: [
      `These terms govern your use of the Linkible website and any services you purchase from us. By engaging Linkible or using this site, you agree to be bound by them.`,
      `If you are agreeing on behalf of a company, you confirm you have authority to bind that company to these terms.`,
    ],
  },
  {
    id: "services",
    heading: "2. Services provided",
    paragraphs: [
      `Linkible provides link building, digital PR, outreach and related search marketing services. The specific deliverables, volumes and timelines for your engagement are defined in your selected plan or written scope of work.`,
      `Where a plan specifies a range (for example, six to eight placements), delivery anywhere within that range constitutes full performance for that period.`,
    ],
  },
  {
    id: "client-obligations",
    heading: "3. Your responsibilities",
    paragraphs: [`To deliver effectively, we require the following from you:`],
    list: [
      "Timely approval of prospect lists and content drafts, generally within five business days",
      "Read access to analytics and search console properties for the target domain",
      "Accurate information about your business, claims and any regulatory constraints",
      "Confirmation that you own or are authorised to promote the target website",
    ],
  },
  {
    id: "deliverables",
    heading: "4. Deliverables and performance",
    paragraphs: [
      `We guarantee our process, our quality standards and full transparency on every placement. We do not guarantee specific search rankings, traffic volumes or revenue outcomes, as these depend on factors outside our control including search engine algorithms and competitor activity.`,
      `Where we fail to deliver the agreed placement volume in a billing period, the shortfall is carried into the following period at no additional cost, or credited to you, at your election.`,
      `Placements are secured on a permanent basis. Where a link is removed by the publisher within six months of going live, we will secure an equivalent or better replacement at no cost.`,
    ],
  },
  {
    id: "payment",
    heading: "5. Fees and payment",
    paragraphs: [
      `Fees are payable monthly in advance unless otherwise agreed in writing. All prices are quoted in United States dollars and exclude any applicable taxes.`,
      `Plans operate on a month-to-month basis with no minimum term. Either party may terminate with thirty days' written notice. Work already commissioned and in the outreach pipeline at the point of notice will be completed and delivered.`,
    ],
  },
  {
    id: "ip",
    heading: "6. Intellectual property",
    paragraphs: [
      `Content we create and place on third-party publications is licensed to that publisher under their terms. Research, strategy documents and reporting produced for your engagement belong to you on payment of the relevant invoice.`,
      `Our methodologies, internal tooling, publisher relationships and prospect databases remain our property.`,
    ],
  },
  {
    id: "liability",
    heading: "7. Limitation of liability",
    paragraphs: [
      `To the maximum extent permitted by law, our total aggregate liability arising out of or relating to these terms is limited to the fees paid by you in the three months preceding the event giving rise to the claim.`,
      `Neither party is liable for indirect, incidental, special or consequential damages, including loss of profits, revenue or data.`,
      `Nothing in these terms excludes liability that cannot lawfully be excluded, including under the Australian Consumer Law where it applies.`,
    ],
  },
  {
    id: "confidentiality",
    heading: "8. Confidentiality",
    paragraphs: [
      `Each party will keep confidential any non-public information disclosed by the other in connection with the engagement, and will use it only for the purposes of delivering or receiving the services.`,
      `We will not name you as a client publicly without your prior written consent.`,
    ],
  },
  {
    id: "changes",
    heading: "9. Changes to these terms",
    paragraphs: [
      `We may update these terms from time to time. Where changes are material, we will notify active clients by email at least thirty days before they take effect.`,
    ],
  },
  {
    id: "contact-terms",
    heading: "10. Contact",
    paragraphs: [
      `Questions about these terms can be sent to ${site.email}, or by post to ${site.address}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        body="Last updated 1 September 2026. These terms govern your use of this website and any services you purchase from Linkible."
        crumbs={[{ label: "Terms & Conditions" }]}
        compact
      />
      <LegalBody sections={sections} />
      <CTA
        title="Questions about the fine print?"
        body="We would rather answer a contract question before you sign than after. Send it over and a person will reply."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read Privacy Policy", href: "/privacy-policy" }}
      />
    </>
  );
}
