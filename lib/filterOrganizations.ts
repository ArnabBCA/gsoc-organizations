import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";

// Filters for organization names
const organizationNameFilters: Record<string, string> = {
  "52°North Initiative for Geospatial Open Source Software GmbH":
    "52°North Spatial Information Research GmbH",
  "afl++": "AFLplusplus",
  "The Apertium Project": "Apertium",
  "AOSSIE - Australian Open Source Software Innovation and Education": "AOSSIE",
  "Berkman Center for Internet and Society":
    "Berkman Klein Center for Internet and Society",
  "Berkman Klein Center for Internet & Society at Harvard University":
    "Berkman Klein Center for Internet and Society",
  Catrobat: "International Catrobat Association",
  "CiviCRM LLC": "CiviCRM",
  "Ceph Foundation": "Ceph",
  dbpediaspotlight: "dbpedia",
  "Debian Project": "Debian",
  "Digital Impact Alliance": "Digital Impact Alliance (DIAL) at UN Foundation",
  "FOSSology Project": "FOSSology",
  "GENIVI Development Platform": "GENIVI Alliance",
  KDE: "KDE Community",
  "Liquid Galaxy Project": "Liquid Galaxy project",
  "omegaUp.com": "OmegaUp",
  "OSGeo - The Open Source Geospatial Foundation": "OSGeo",
  "GFOSS - Open Technologies Alliance": "Open Technologies Alliance - GFOSS",
  openSUSE: "openSUSE Project",
  "Open Technologies Aliance - GFOSS": "Open Technologies Alliance - GFOSS",
  "Open Roberta Lab": "Open Roberta",
  "mlpack: a scalable C++ machine learning library": "mlpack",
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
const organizationCategoriesFilters: Record<string, string[]> = {
  "": ["Other"],
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
  "c programming": ["c"],
  "css/html": ["css", "html"],
  "web/html/css": ["web", "html", "css"],
  node: ["node.js"],
  nodejs: ["node.js"],
};

// Utility function to sanitize strings
const sanitize = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

// Utility function to filter items with fallback
const filterItem = <T>(
  filters: Record<string, T>,
  item: string,
  fallback: T
): T => filters[item] ?? fallback;

// Function to normalize URLs for comparison
const normalizeUrl = (url: string): { host: string; path: string } => {
  const { host, pathname } = new URL(url);
  return { host: host.replace(/^www\./, ""), path: pathname };
};

// Checks if two organizations can be merged
const isMergePossible = (
  org1: { name: string; website_url: string },
  org2: { name: string; website_url: string }
): boolean => {
  if (org1.name.toUpperCase() === org2.name.toUpperCase()) return true;
  const url1 = normalizeUrl(org1.website_url);
  const url2 = normalizeUrl(org2.website_url);
  return url1.host === url2.host && url1.path === url2.path;
};

// Merges organization data
const mergeOrganizations = (
  existingOrg: Organization,
  newOrg: Organization,
  year: number,
  numProjects: number
) => {
  existingOrg.years_appeared.push(year);
  existingOrg.projects = existingOrg.projects.concat(newOrg.projects);
  existingOrg.projects_by_year[year] =
    (existingOrg.projects_by_year[year] || 0) + numProjects;

  Object.assign(existingOrg, {
    categories: newOrg.categories,
    topic_tags: Array.from(
      new Set((newOrg.topic_tags || []).map((topic) => topic.trim()))
    ).sort((a, b) => a.length - b.length),
    tech_tags: Array.from(
      new Set(
        (newOrg.tech_tags || []).flatMap((tech) =>
          filterItem(technologyFilters, tech, [tech.trim()])
        )
      )
    ).sort((a, b) => a.length - b.length),
    tagline: newOrg.tagline,
    logo_url: newOrg.logo_url,
    logo_bg_color: newOrg.logo_bg_color,
    contact_links:
      newOrg.contact_links.map((link) => ({
        name: link.name.replace(/\s+/g, "").toLowerCase(),
        value: link.value || link.url || "",
      })) || [],
  });
};

// Loads and filters organizations from JSON files
export const loadFilteredOrganizations = (): Organization[] => {
  const years: number[] = [
    2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];
  const organizations: Organization[] = [];
  years.forEach((year) => {
    const filePath = path.join(process.cwd(), "orgs", `${year}.json`);
    if (!fs.existsSync(filePath)) return;

    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      (data.organizations || []).forEach((org: Organization) => {
        const filteredName = filterItem(
          organizationNameFilters,
          org.name,
          org.name.trim()
        );
        const sanitizedOrg: Organization = {
          name: filteredName,
          nav_url: sanitize(filteredName),
          tagline: org.tagline || "",
          website_url: org.website_url || "",
          logo_url: org.logo_url || "",
          categories: Array.from(
            new Set(
              (org.categories || []).flatMap((cat) =>
                filterItem(organizationCategoriesFilters, cat, [cat.trim()])
              )
            )
          ),
          topic_tags: Array.from(
            new Set((org.topic_tags || []).map((topic) => topic.trim()))
          ).sort((a, b) => a.length - b.length),
          tech_tags: Array.from(
            new Set(
              (org.tech_tags || []).flatMap((tech) =>
                filterItem(technologyFilters, tech, [tech.trim()])
              )
            )
          ).sort((a, b) => a.length - b.length),
          years_appeared: [year],
          logo_bg_color: org.logo_bg_color || "",
          num_projects: org.projects?.length || 0,
          projects_by_year: { [year]: org.projects?.length || 0 },
          projects: org.projects || [],
          contact_links:
            org.contact_links.map((link) => ({
              name: link.name.replace(/\s+/g, "").toLowerCase() as
                | "email"
                | "mailinglist"
                | "chat"
                | "twitter"
                | "blog"
                | "facebook"
                | "irc",
              value: link.value || link.url || "",
            })) || [],
        };

        const existingOrg = organizations.find((o) =>
          isMergePossible(o, {
            name: filteredName,
            website_url: org.website_url,
          })
        );

        if (existingOrg) {
          mergeOrganizations(
            existingOrg,
            sanitizedOrg,
            year,
            org.projects?.length || 0
          );
        } else {
          organizations.push(sanitizedOrg);
        }
      });
    } catch (error) {
      console.error(`Failed to process ${filePath}:`, error);
    }
  });

  return organizations;
};
