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
  "AOSSIE - The Australian National University's Open-Source Software Innovation and Education":
    "AOSSIE",
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

const years: number[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

// Utility function to sanitize strings
const sanitize = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeUrl = (url: string): { host: string; path: string } => {
  const { host, pathname } = new URL(url);
  const cleanHost = host.replace(/^(www\.)?/, ""); // Remove 'www.'
  return { host: cleanHost, path: pathname.replace(/\/$/, "") }; // Remove trailing slash
};
export const computeOrgs = () => {
  const organizationsMap = new Map<string, any>();
  const processOrganization = (org: any, year: number) => {
    const orgName = organizationNameFilters[org.name] || org.name;
    const normalizedHost = normalizeUrl(org.website_url);

    // Check if the organization already exists by either name or URL
    let existingKey: string | undefined;
    for (const [key, existingOrg] of organizationsMap.entries()) {
      if (
        existingOrg.name.toLowerCase() === orgName.toLowerCase() ||
        normalizeUrl(existingOrg.website_url) === normalizedHost
      ) {
        existingKey = key;
        break;
      }
    }

    const orgData: Organization = {
      name: orgName,
      tagline: org.tagline,
      website_url: org.website_url,
      nav_url: sanitize(orgName),
      logo_url: org.logo_url,
      logo_bg_color: org.logo_bg_color,
      years_appeared: [year],
      categories: org.categories,
      topic_tags: org.topic_tags,
      tech_tags: org.tech_tags.map(
        (tech: string) => technologyFilters[tech] || tech
      ),
      projects: org.projects,
      projects_by_year: { [year]: org.projects.length },
      contact_links: org.contact_links.map((link: any) => ({
        name: link.name.replace(/\s+/g, "").toLowerCase(),
        value: link.value || link.url,
      })),
    };

    if (existingKey) {
      const existingOrg = organizationsMap.get(existingKey);
      existingOrg.years_appeared.push(year);
      existingOrg.projects = existingOrg.projects.concat(org.projects);
      existingOrg.projects_by_year[year] =
        (existingOrg.projects_by_year[year] || 0) + org.projects.length;
      organizationsMap.set(existingKey, existingOrg);
    } else {
      organizationsMap.set(orgName.toLowerCase(), orgData);
    }
  };

  years.forEach((year) => {
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

  return Array.from(organizationsMap.values());
};
