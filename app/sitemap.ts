import { PUBLIC_DOMAIN_URL } from "@/constants";
import { computeOrgs } from "@/lib/getAllOrganizations";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const organizations = computeOrgs();
  const orgUrl: MetadataRoute.Sitemap = organizations.map((org) => {
    return {
      url: `${PUBLIC_DOMAIN_URL}/organization/${org.nav_url}`,
    };
  });

  return [
    {
      url: `${PUBLIC_DOMAIN_URL}/timeline`,
    },
    ...orgUrl,
  ];
}
