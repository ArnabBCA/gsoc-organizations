import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import OrganizationCard from "@/components/OrgnizationCard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";

// This function will be run during the build to statically generate the component
const Home = async () => {
  // Load filtered organizations during the build process
  const organizations: Organization[] = loadFilteredOrganizations();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {organizations.map((org, index) => (
            <OrganizationCard
              isLandingPage={true}
              key={org.name}
              index={index}
              organization={org}
            />
          ))}
        </div>
      </div>
    </SidebarProvider>
  );
};

// By exporting the component directly, Next.js will statically render it at build time
export default Home;
