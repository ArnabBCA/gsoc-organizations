import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";

// Define the filters for organization names
const OranizationNamefilters: { [key: string]: string } = {
  "The Apertium Project": "Apertium",
  "AOSSIE - Australian Open Source Software Innovation and Education": "AOSSIE",
  "Berkman Center for Internet and Society":
    "Berkman Klein Center for Internet and Society",
  "Berkman Klein Center for Internet & Society at Harvard University":
    "Berkman Klein Center for Internet and Society",
  "CiviCRM LLC": "CiviCRM",
  Ceph: "Ceph Foundation",
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

const OranizationCatagoryfilters: { [key: string]: string } = {
  "": "Other",
};

// Function to filter organization names based on the defined filter
export const filterOrganizationName = (name: string) => {
  if (name in OranizationNamefilters) {
    return OranizationNamefilters[name] as string;
  }
  return name.trim();
};

// Define the filters for organization categories
export const filterOrganizationCatagory = (category: string) => {
  if (category in OranizationCatagoryfilters) {
    return OranizationCatagoryfilters[category];
  }
  return category.trim();
};

// Define the filters for organization topics
const topics: { [key: string]: string } = {};
export const filterOrganizationTopics = (topic: string) => {
  if (topic in topics) {
    return topics[topic];
  }
  return [topic.trim()];
};

// Function to check if two organizations can be merged (based on name or URL)
export const isMergePossible = (
  org1: { name: string; url: string },
  org2: { name: string; url: string }
) => {
  const normalizeUrlHost = (host: string) => {
    return host.startsWith("www.") ? host.slice(4) : host;
  };

  // Case insensitive comparison of organization names
  if (org1.name.toUpperCase() === org2.name.toUpperCase()) {
    return true;
  }

  const url1 = new URL(org1.url);
  const url2 = new URL(org2.url);

  // Compare URLs
  if (
    normalizeUrlHost(url1.host) === normalizeUrlHost(url2.host) &&
    url1.pathname === url2.pathname
  ) {
    return true;
  }

  return false;
};

// Function to load and filter organizations from JSON files
export const loadFilteredOrganizations = (years: number[]): Organization[] => {
  const organizations: Organization[] = [];
  const seenNames = new Set<string>(); // Track organization names

  if (years.length === 0) {
    years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  }

  // Loop through each year and filter organizations
  years.forEach((year) => {
    const filePath = path.join(process.cwd(), "data", `${year}.json`);
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    if (data && data.organizations) {
      data.organizations.forEach((element: Organization) => {
        const filteredName = filterOrganizationName(element.name);
        const filteredCategory = filterOrganizationCatagory(element.category);
        // Check if the topic has already been added
        const topics: string[] = [];
        for (const topic of element.topics) {
          const filteredTopics = filterOrganizationTopics(topic);
          for (const filteredTopic of filteredTopics) {
            if (!topics.includes(filteredTopic)) {
              topics.push(filteredTopic);
            }
          }
        }
        element.topics = topics;

        // Check if an organization with the same name or URL exists
        const existingOrganization = organizations.find((org) =>
          isMergePossible(org, { name: filteredName, url: element.url })
        );

        // If no existing organization found (i.e., no merge possible), add the new one
        if (!existingOrganization) {
          organizations.push({
            name: filteredName,
            description: element.description,
            url: element.url,
            image_url: element.image_url,
            category: filteredCategory,
            topics: element.topics,
          });
          seenNames.add(filteredName.toUpperCase());
        }
      });
    }
  });

  return organizations;
};
