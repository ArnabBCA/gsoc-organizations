import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";

// Filters for organization names
const organizationNameFilters: Record<string, string> = {
  "The Apertium Project": "Apertium",
  "AOSSIE - Australian Open Source Software Innovation and Education": "AOSSIE",
  "Berkman Center for Internet and Society":
    "Berkman Klein Center for Internet and Society",
  "Berkman Klein Center for Internet & Society at Harvard University":
    "Berkman Klein Center for Internet and Society",
  "CiviCRM LLC": "CiviCRM",
  "Ceph Foundation": "Ceph",
  "Debian Project": "Debian",
  "Digital Impact Alliance": "Digital Impact Alliance (DIAL) at UN Foundation",
  "FOSSology Project": "FOSSology",
  "GENIVI Development Platform": "GENIVI Alliance",
  KDE: "KDE Community",
  "Liquid Galaxy Project": "Liquid Galaxy project",
  "OSGeo - The Open Source Geospatial Foundation": "OSGeo",
  "GFOSS - Open Technologies Alliance": "Open Technologies Alliance - GFOSS",
  "Open Technologies Aliance - GFOSS": "Open Technologies Alliance - GFOSS",
  "Open Roberta Lab": "Open Roberta",
  "Zulip Open Source Project": "Zulip",
  "Xi Editor Project": "Xi Editor",
  "VideoLAN / VLMC Project": "VideoLAN",
  "The syslog-ng project.": "syslog-ng",
  "The syslog-ng project": "syslog-ng",
  "The Eclipse Foundation": "Eclipse Foundation",
  "shogun.ml": "Shogun",
  "Shogun Machine Learning Toolbox": "Shogun",
  Robocomp: "RoboComp",
  "Apache Software Foundation": "The Apache Software Foundation",
  "Cloud Native Computing Foundation (CNCF)": "CNCF",
  GNOME: "GNOME Foundation",
  "GNU Mailman": "GNU Mailman Project",
  "Kodi Foundation": "Kodi",
};

// Filters for organization categories
const organizationCategoryFilters: Record<string, string> = {
  "": "Other",
};

// Filters for technologies
const technologyFilters: Record<string, string[]> = {
  "app engine": ["google app engine"],
  appengine: ["google app engine"],
  "html/css": ["html", "css"],
  "html/css/js": ["html", "css", "javascript"],
  js: ["javascript"],
  javajava: ["java"],
  "javascript/html/css": ["html", "css", "javascript"],
  javascipt: ["javascript"],
  "javascript/html5/css3": ["html", "css", "javascript"],
  "java script": ["javascript"],
  "php/javascript/html": ["php", "javascript", "html"],
  "php/javascript/ajax": ["php", "javascript", "ajax"],
  "html/javascript": ["html", "javascript"],
  "c/c++": ["c", "c++"],
  "css/html": ["css", "html"],
  "web/html/css": ["web", "html", "css"],
  node: ["node.js"],
  nodejs: ["node.js"],
};

// Utility function to sanitize organization names
function sanitizeOrgName(orgName: string): string {
  return orgName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\s+/g, "-") // Replace spaces with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

// Function to filter organization names
const filterOrganizationName = (name: string): string => {
  return organizationNameFilters[name] ?? name.trim();
};

// Function to filter organization categories
const filterOrganizationCategory = (category: string): string => {
  return organizationCategoryFilters[category] ?? category.trim();
};

// Function to filter organization topics
const filterOrganizationTopics = (topic: string): string[] => {
  return [topic.trim()];
};

// Function to filter organization technologies
const filterOrganizationTechnologies = (tech: string): string[] => {
  return technologyFilters[tech] ?? [tech.trim()];
};

// Function to check if two organizations can be merged (based on name or URL)
const isMergePossible = (
  org1: { name: string; url: string },
  org2: { name: string; url: string }
): boolean => {
  const normalizeUrlHost = (host: string): string =>
    host.startsWith("www.") ? host.slice(4) : host;

  if (org1.name.toUpperCase() === org2.name.toUpperCase()) return true;

  const url1 = new URL(org1.url);
  const url2 = new URL(org2.url);

  return (
    normalizeUrlHost(url1.host) === normalizeUrlHost(url2.host) &&
    url1.pathname === url2.pathname
  );
};

// Function to load and filter organizations from JSON files
export const loadFilteredOrganizations = (
  years: number[] = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
): Organization[] => {
  const organizations: Organization[] = [];

  years.forEach((year) => {
    const filePath = path.join(process.cwd(), "data", `${year}.json`);
    if (!fs.existsSync(filePath)) return;

    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    if (data?.organizations) {
      data.organizations.forEach((element: Organization) => {
        const filteredName = filterOrganizationName(element.name);
        const filteredCategory = filterOrganizationCategory(element.category);
        const filteredTopics = Array.from(
          new Set(element.topics.flatMap(filterOrganizationTopics))
        );
        const filteredTechnologies = Array.from(
          new Set(element.technologies.flatMap(filterOrganizationTechnologies))
        );

        const existingOrganization = organizations.find((org) =>
          isMergePossible(org, { name: filteredName, url: element.url })
        );

        if (!existingOrganization) {
          organizations.push({
            name: filteredName,
            nav_url: sanitizeOrgName(filteredName),
            description: element.description,
            url: element.url,
            image_url: element.image_url,
            category: filteredCategory,
            topics: filteredTopics,
            technologies: filteredTechnologies,
            years_appeared: [year],
            image_background_color: element.image_background_color,
            num_projects: element.num_projects,
            projects_by_year: { [year]: element.num_projects },
          });
        } else {
          existingOrganization.years_appeared.push(year);
          existingOrganization.topics = Array.from(
            new Set(existingOrganization.topics.concat(filteredTopics))
          );
          existingOrganization.technologies = Array.from(
            new Set(
              existingOrganization.technologies.concat(filteredTechnologies)
            )
          );
          existingOrganization.category = filteredCategory;
          existingOrganization.description = element.description;
          existingOrganization.image_url = element.image_url;
          existingOrganization.image_background_color =
            element.image_background_color;

          // Update num_projects with the new year and project count
          if (!existingOrganization.projects_by_year[year.toString()]) {
            existingOrganization.projects_by_year[year.toString()] =
              element.num_projects;
          } else {
            existingOrganization.projects_by_year[year.toString()] +=
              element.num_projects;
          }
        }
      });
    }
  });

  return organizations;
};
