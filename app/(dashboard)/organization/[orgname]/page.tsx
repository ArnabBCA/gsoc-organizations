import { OrganizationChart } from "@/components/OrganizationChart";
import OrganizationCard from "@/components/OrgnizationCard";
import PastProjects from "./_components/PastProjects";
import ConatctLinks from "./_components/ConatctLinks";
import { computeOrgs } from "@/lib/getAllOrganizations";
import NotFound from "@/app/not-found";

type Params = Promise<{ orgname: string }>;

const organizations = computeOrgs();

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
    };
  }
  return {
    title: org.name,
    description: org.tagline,
    openGraph: {
      images: [
        {
          url: org.logo_url,
        },
      ],
    },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const org = organizations.find((o) => o.nav_url === params.orgname);
  if (!org) {
    return NotFound();
  }
  return (
    <div className="w-full flex flex-col gap-4 items-center p-4">
      <div className="w-full flex flex-col h-full lg:flex-row gap-4 justify-center items-center">
        <div className="w-full flex gap-4 h-full flex-col sm:flex-row justify-center items-center">
          <OrganizationCard
            key={org.name}
            organization={org}
            isLandingPage={false}
          />
          <ConatctLinks
            contactLinks={org.contact_links}
            direct_comm_methods={org.direct_comm_methods}
            social_comm_methods={org.social_comm_methods}
            org={org}
          />
        </div>
        <OrganizationChart yearsAppearedData={org.projects_by_year} />
      </div>
      <PastProjects projects={org.projects} />
    </div>
  );
}
