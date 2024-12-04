import { OrganizationChart } from "@/components/OrganizationChart";
import OrganizationCard from "@/components/OrgnizationCard";
import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";
import fs from "fs";
import path from "path";
import PastProjects from "./_components/PastProjects";
import ConatctLinks from "./_components/ConatctLinks";
import { getAllOrganizations } from "@/actions/actions";
import OrgInsights from "./_components/OrgInsights";

type Params = Promise<{ orgname: string }>;

const organizations: Organization[] = loadFilteredOrganizations();
const dbAllOrgs = await getAllOrganizations();

export async function generateStaticParams() {
  return organizations.map((org) => {
    return {
      orgname: org.nav_url,
    };
  });
}
export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const org = organizations.find((o) => o.nav_url === params.orgname);
  if (!org) {
    return {
      title: "Organization not found",
      description: "Organization not found",
      image: "",
    };
  }
  return {
    title: org.name,
    description: org.tagline,
    image: org.logo_url,
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const org = organizations.find((o) => o.nav_url === params.orgname);
  let orgData: any = {};
  if (!org) {
    return <div>Organization not found</div>;
  } else {
    const dbFilePath = path.join(process.cwd(), `github_org.json`);
    if (fs.existsSync(dbFilePath) && dbAllOrgs) {
      const data = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
      data.forEach((element: any) => {
        if (
          element &&
          element.github_name &&
          element.nav_url === params.orgname
        ) {
          dbAllOrgs.forEach((dbOrg) => {
            if (dbOrg.name == element.github_name) {
              console.log("Organization found", dbOrg);
              orgData = dbOrg;
            }
          });
        }
      });
    }
    const yearsAppearedData = { projects_by_year: org.projects_by_year };
    const analyticsFolder = path.join(process.cwd(), "public", "analytics");
    if (!fs.existsSync(analyticsFolder)) {
      fs.mkdirSync(analyticsFolder, { recursive: true });
    }
    const filePath = path.join(analyticsFolder, `${org.nav_url}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify(yearsAppearedData, null, 2),
      "utf8"
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center py-4">
      <div className="w-full flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4 justify-center items-center">
        <div className="flex flex-col gap-4 w-full sm:flex-row justify-center items-center h-full">
          <div className="max-w-96 w-full h-full">
            <OrganizationCard
              key={org.name}
              organization={org}
              isLandingPage={false}
            />
          </div>
          <ConatctLinks contactLinks={org.contact_links} />
        </div>
        <OrganizationChart />
      </div>
      {Object.keys(orgData).length !== 0 && <OrgInsights {...orgData} />}
      <PastProjects projects={org.projects} />
    </div>
  );
}
