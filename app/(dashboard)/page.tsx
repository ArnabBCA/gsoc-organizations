import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import OrganizationCard from "@/components/OrgnizationCard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { computeOrgs } from "@/lib/getAllOrganizations";

const Home = async () => {
  const organizations = computeOrgs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <Navbar isHomePage={true} />
        <main className="max-w-(--breakpoint-desktop) w-full mx-auto grid justify-items-center items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {organizations.map((org, index) => (
            <OrganizationCard
              isLandingPage={true}
              key={org.name}
              index={index}
              organization={org}
            />
          ))}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
