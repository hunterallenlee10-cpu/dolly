import type { MetadataRoute } from "next";

// Spec preview: blocked from search until Dolly approves the site.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
