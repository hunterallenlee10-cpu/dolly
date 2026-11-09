// Every fact here traces back to the verified brief (Facebook page + local press).
// Anything unconfirmed is shown on the page as a visible [Confirm ...] placeholder.

export const site = {
  name: "Dolly's Tax & Advisory CPA, LLC",
  shortName: "Dolly's Tax & Advisory",
  owner: "Dolly Suarez",
  ownerCredentials: "CPA, CFP®",
  phoneDisplay: "(571) 316-6158",
  phoneHref: "tel:+15713166158",
  email: "info@dollycpa.com",
  emailHref: "mailto:info@dollycpa.com",
  url: "https://dollycpa.com",
  facebook: "https://www.facebook.com/dollytaxcpa/",
  // Town not confirmed yet, so the site only says "Southern Maryland".
  region: "Southern Maryland",
  bio: "CPA helping individuals and small business owners navigate taxes with clarity and confidence.",
} as const;

export const serviceOptions = [
  "Tax preparation",
  "Small business taxes",
  "Tax planning",
  "Financial planning",
  "Not sure yet",
] as const;

export const audienceOptions = [
  "Individual or family",
  "Business owner",
  "Federal employee or military",
  "Other",
] as const;

export const contactMethods = ["Phone", "Email", "Text"] as const;

export type ServiceOption = (typeof serviceOptions)[number];
export type AudienceOption = (typeof audienceOptions)[number];
