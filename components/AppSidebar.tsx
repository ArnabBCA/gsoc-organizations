import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import CategoryCheckbox from "./CategoryCheckbox";
import YearCheckbox from "./YearCheckbox";
import TopicCheckbox from "./TopicCheckbox";
import TechCheckbox from "./TechCheckbox";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 text-center">
        <h1>GSoC Organizations</h1>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            Years
          </SidebarGroupLabel>
          <YearCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            Categories
          </SidebarGroupLabel>
          <CategoryCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            Topics
          </SidebarGroupLabel>
          <TopicCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            Techs
          </SidebarGroupLabel>
          <TechCheckbox />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
