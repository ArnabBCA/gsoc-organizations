import OrganizationCard from "@/components/OrgnizationCard";
import { Card } from "@/components/ui/card";
import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";

// This function will be run during the build to statically generate the component
const Home = async () => {
  // Load filtered organizations during the build process
  const organizations: Organization[] = loadFilteredOrganizations([2024]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {organizations.map((org, index) => (
        <OrganizationCard key={org.name} index={index} organization={org} />
      ))}
    </div>
  );
};

// By exporting the component directly, Next.js will statically render it at build time
export default Home;
