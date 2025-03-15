import { PUBLIC_DOMAIN_URL } from "@/constants";
import { computeOrgs } from "@/lib/getAllOrganizations";
import { MetadataRoute } from "next";

export const dynamic = "force-static"; // Ensure static export compatibility

export default function sitemap(): MetadataRoute.Sitemap {
  const organizations = computeOrgs();
  const orgUrl: MetadataRoute.Sitemap = organizations.map((org) => ({
    url: `${PUBLIC_DOMAIN_URL}/organization/${org.nav_url}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: `${PUBLIC_DOMAIN_URL}`,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...orgUrl,
    {
      url: `${PUBLIC_DOMAIN_URL}/timeline`,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
