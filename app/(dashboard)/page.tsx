import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import OrganizationCard from "@/components/OrgnizationCard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { loadFilteredOrganizations } from "@/lib/filterOrganizations";
import { Organization } from "@/types/types";

// This function will be run during the build to statically generate the component
const Home = async () => {
  // Load filtered organizations during the build process
  const { organizations } = loadFilteredOrganizations();

  /*let map = new Map();

  organizations.forEach((org) => {
    org.topic_tags.forEach((tag) => {
      if (map.has(tag)) {
        map.set(tag, map.get(tag) + 1);
      } else {
        map.set(tag, 1);
      }
    });
  });

  // Convert the map to an array and log the result
  console.log(Array.from(map.entries()));*/

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
