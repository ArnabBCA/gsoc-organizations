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
import Favorites from "./Favorites";
import FirstTimeOrganizationsCheckbox from "./FirstTimeOrganizationsCheckbox";
import { CATEGORIES, TECHS, TOPICS, YEARS } from "@/constants";
import { ListTodoIcon } from "lucide-react";
import ResetFiters from "./ResetFiters";
import Footer from "./Footer";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-2 px-4 text-center flex flex-row justify-between min-h-[56.8px] items-center">
        <div className="flex items-center gap-1">
          <ListTodoIcon size={20} />
          <h1 className="text-lg font-semibold">Filters</h1>
        </div>
        <ResetFiters />
      </SidebarHeader>
      <SidebarContent className="p-4 gap-6">
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            <Favorites />
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            Others
          </SidebarGroupLabel>
          <FirstTimeOrganizationsCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            {`Years (${YEARS.length})`}
          </SidebarGroupLabel>
          <YearCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            {`Categories (${Object.keys(CATEGORIES).length})`}
          </SidebarGroupLabel>
          <CategoryCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            {`Topics (${Object.keys(TOPICS).length})`}
          </SidebarGroupLabel>
          <TopicCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0 gap-2">
          <SidebarGroupLabel className="text-base px-0">
            {`Techs (${Object.keys(TECHS).length})`}
          </SidebarGroupLabel>
          <TechCheckbox />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-0 px-4 py-2">
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
