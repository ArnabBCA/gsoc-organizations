import { OrganizationChart } from "@/components/OrganizationChart";
import OrganizationCard from "@/components/OrgnizationCard";
import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";
import PastProjects from "./_components/PastProjects";
import ConatctLinks from "./_components/ConatctLinks";

export const runtime = "edge";
type Params = Promise<{ orgname: string }>;

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
    //const yearsAppearedData = { projects_by_year: org.projects_by_year };

    /*// Path to the analytics folder
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
    );*/
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center py-4">
      <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 justify-center">
        <div className="max-w-96">
          <OrganizationCard
            key={org.name}
            organization={org}
            isLandingPage={false}
          />
        </div>
        <OrganizationChart />
        <ConatctLinks contactLinks={org.contact_links} />
      </div>
      <PastProjects projects={org.projects} />
    </div>
  );
}
