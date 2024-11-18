import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";

type Params = Promise<{ orgname: string }>;

// Utility to save projects_by_year data to the public folder
/*function saveProjectsByYear(org: Organization) {
  const filePath = path.join(process.cwd(), "public", `${org.nav_url}.json`);
  const dataToSave = {
    projects_by_year: org.projects_by_year,
  };

  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2), "utf8");
}*/
// This function generates the paths for all organizations at build time
export async function generateStaticParams() {
  const organizations: Organization[] = loadFilteredOrganizations();

  return organizations.map((org) => {
    return {
      orgname: org.nav_url,
    };
  });
}
export async function generateMetadata(props: { params: Params }) {
  const organizations: Organization[] = loadFilteredOrganizations();

  const params = await props.params;
  organizations.find((org) => {
    return org.nav_url === params.orgname;
  });
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const organizations: Organization[] = loadFilteredOrganizations();

  const org = organizations.find((org) => {
    return org.nav_url === params.orgname;
  });

  if (!org) {
    return <div>Organization not found</div>;
  } else {
    // Extract the `years_appeared` field
    const yearsAppearedData = { projects_by_year: org.projects_by_year };

    // Path to the analytics folder
    const analyticsFolder = path.join(process.cwd(), "public", "analytics");

    // Ensure the analytics folder exists
    if (!fs.existsSync(analyticsFolder)) {
      fs.mkdirSync(analyticsFolder, { recursive: true });
    }

    // Path to the specific JSON file inside the analytics folder
    const filePath = path.join(analyticsFolder, `${org.nav_url}.json`);

    // Write the `years_appeared` data to the file, overwriting any existing content
    fs.writeFileSync(
      filePath,
      JSON.stringify(yearsAppearedData, null, 2),
      "utf8"
    );
  }

  return (
    <div>
      <h1>{org.name}</h1>
      <p>{org.description}</p>
    </div>
  );
}
