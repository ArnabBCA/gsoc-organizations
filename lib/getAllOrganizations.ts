import { YEARS } from "@/constants";
import { organizationNameFilters, technologyFilters } from "@/filters";
import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";

// Utility function to sanitize strings
const sanitize = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

export const computeOrgs = () => {
  const organizationsMap = new Map<string, any>();
  const processOrganization = (org: any, year: number) => {
    const orgName = (organizationNameFilters[org.name] || org.name).trim();

    const contactLinks = org.contact_links.map((link: any) => ({
      name: link.name.replace(/\s+/g, "").toLowerCase(),
      value: link.value || link.url,
    }));

    const filterUniqueMethods = (methods: any[]) => {
      const uniqueValues = new Set<string>();

      return methods
        .map((method: any) => ({
          name: method.name.replace(/\s+/g, "").toLowerCase(),
          value: method.value,
        }))
        .filter((method) => {
          if (
            contactLinks.some((link: any) => link.value === method.value) ||
            uniqueValues.has(method.value)
          ) {
            return false; // Skip if it's already in contactLinks or seen before
          }
          uniqueValues.add(method.value);
          return true;
        });
    };

    const orgData: Organization = {
      last_arrived_year: year,
      name: orgName,
      is_first_time_org: year === YEARS[0],
      tagline: org.tagline,
      website_url: org.website_url,
      nav_url: sanitize(orgName),
      contributor_guidance_url:
        year === YEARS[0] ? org.contributor_guidance_url : "",
      ideas_link: year === YEARS[0] ? org.ideas_link : "",
      logo_url: org.logo_url,
      logo_bg_color: org.logo_bg_color,
      years_appeared: [year],
      categories: org.categories,
      topic_tags: org.topic_tags,
      tech_tags: org.tech_tags.map(
        (tech: string) => technologyFilters[tech] || tech
      ),
      projects: org.projects || [],
      projects_by_year:
        year !== YEARS[0] && org.projects.length != 0
          ? { [year]: org.projects?.length || 0 }
          : {},
      contact_links: contactLinks,
      direct_comm_methods:
        year === YEARS[0] ? filterUniqueMethods(org.direct_comm_methods) : [],
      social_comm_methods:
        year === YEARS[0] ? filterUniqueMethods(org.social_comm_methods) : [],
    };

    const key = orgName.toLowerCase();

    if (organizationsMap.has(key)) {
      const existingOrg = organizationsMap.get(orgName.toLowerCase());
      existingOrg.is_first_time_org = false;
      existingOrg.years_appeared.push(year);
      existingOrg.projects = existingOrg.projects.concat(org.projects);
      existingOrg.projects_by_year[year] =
        (existingOrg.projects_by_year[year] || 0) + org.projects.length;
      organizationsMap.set(key, existingOrg);
    } else {
      organizationsMap.set(key, orgData);
    }
  };

  YEARS.forEach((year) => {
    const filePath = path.join(process.cwd(), "orgs", `${year}.json`);
    if (!fs.existsSync(filePath)) return;
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (!data.organizations || !Array.isArray(data.organizations)) {
        console.error(`Invalid structure in ${filePath}`);
        return;
      }
      data.organizations.forEach((org: any) => processOrganization(org, year));
    } catch (error) {
      console.error(`Failed to process ${filePath}:`, error);
    }
  });

  const organizations = Array.from(organizationsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  /*const categoryCounts: Record<string, number> = {};
  const topicCounts: Record<string, number> = {};
  const techCounts: Record<string, number> = {};
  let firstTimeOrgs: number = 0;

  type YearTechCounts = {
    [year: number]: {
      [tech: string]: number;
    };
  };

  const yearTechCounts: YearTechCounts = {};
  organizations.forEach((org) => {
    if (org.is_first_time_org) {
      firstTimeOrgs += 1;
      //console.log(org.name);
    }
    org.categories.forEach((category: string) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    org.topic_tags.forEach((topic: string) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
    org.tech_tags.forEach((tech: string) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;

      if (!yearTechCounts[org.last_arrived_year]) {
        yearTechCounts[org.last_arrived_year] = {}; // Initialize the year if it doesn't exist
      }
      if (!yearTechCounts[org.last_arrived_year][tech]) {
        yearTechCounts[org.last_arrived_year][tech] = 0; // Initialize the tech count
      }
      yearTechCounts[org.last_arrived_year][tech] += 1;
    });
  });*/

  //console.log(`First time organizations: ${firstTimeOrgs}`);
  //console.log(categoryCounts);
  //console.log(topicCounts);
  //console.log(techCounts);
  //console.log(yearTechCounts);
  //console.log(`Total organizations: ${organizations.length}`);

  // Define the file path inside the `public` folder
  //const filePath = path.join(process.cwd(), "public", "yearTechCounts.json");
  //fs.writeFileSync(filePath, JSON.stringify(yearTechCounts, null, 2), "utf-8");
  return organizations;
};
