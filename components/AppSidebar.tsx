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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>GSoC Organizations</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Years</SidebarGroupLabel>
          <YearCheckbox />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <CategoryCheckbox />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <TopicCheckbox />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
