import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";

type Params = Promise<{ orgname: string }>;

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
  }

  return (
    <div>
      <h1>{org.name}</h1>
      <p>{org.description}</p>
    </div>
  );
}
