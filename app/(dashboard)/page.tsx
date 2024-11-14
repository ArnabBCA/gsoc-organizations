// app/page.tsx
import fs from "fs";
import path from "path";

interface Organization {
  name: string;
  description: string;
}

const y = 2018;

const filters: { [key: string]: string } = {
  "The Apertium Project": "Apertium",
  "AOSSIE - Australian Open Source Software Innovation and Education": "AOSSIE",
  "Berkman Center for Internet and Society":
    "Berkman Klein Center for Internet and Society",
  "Berkman Klein Center for Internet & Society at Harvard University":
    "Berkman Klein Center for Internet and Society",
  "Berkman Klein Center for Internet and Society at Harvard University":
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

const filter = (name: string) => {
  if (name in filters) {
    return filters[name] as string;
  }

  return name.trim();
};

const isMergePossible = (org1, org2) => {
  const normalizeUrlHost = (host) => {
    return host.startsWith("www.") ? host.slice(4) : host;
  };

  // Case insensitive comparison
  if (org1.name.toUpperCase() === org2.name.toUpperCase()) {
    return true;
  }

  const url1 = new URL(org1.url);
  const url2 = new URL(org2.url);

  if (
    normalizeUrlHost(url1.host) === normalizeUrlHost(url2.host) &&
    url1.pathname === url2.pathname
  ) {
    return true;
  }

  return false;
};

export default async function Home() {
  const organizations: Organization[] = [];
  const seenNames = new Set<string>(); // Track organization names

  // Loop through each year from 2016 to 2024
  for (let year = 2016; year <= 2024; year++) {
    // Adjusted file path to point to the data folder outside the app directory
    const filePath = path.join(process.cwd(), "data", `${year}.json`);

    // Read and parse each JSON file
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Extract organizations names and descriptions from the year
    // Extract organizations names and descriptions from the year
    if (data && data.organizations) {
      data.organizations.forEach(
        (element: { name: string; description: string; url: string }) => {
          const filteredName = filter(element.name);

          // Check if an organization with the same name or URL exists
          const existingOrganization = organizations.find((org) =>
            isMergePossible(org, { name: filteredName, url: element.url })
          );

          // If no existing organization found (i.e., no merge possible), add the new one
          if (!existingOrganization) {
            organizations.push({
              name: filteredName,
              description: element.description,
              url: element.url, // Make sure to include the URL if needed
            });
            seenNames.add(filteredName.toUpperCase()); // Track the filtered name
          }
        }
      );
    }
  }

  return (
    <div>
      <h1>All Google Summer of Code Organizations</h1>
      <div className="max-w-96 flex flex-col gap-2">
        {/*organizations.map((org, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-2 bg-slate-400 p-2 rounded-md"
          >
            <h2>{index}</h2>
            <h3>{org.name}</h3>
            <p>{org.description}</p>
          </div>
        ))*/}
        <h1>{organizations.length - 1}</h1>
      </div>
    </div>
  );
}
