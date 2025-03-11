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
import { CATEGORIES, TECHS, TOPICS, YEARS } from "@/constants";
import { ListTodoIcon } from "lucide-react";
import ResetFiters from "./ResetFiters";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-2.5 px-4 text-center flex flex-row justify-between">
        <div className="flex items-center gap-1">
          <ListTodoIcon size={20} />
          <h1 className="text-lg font-semibold">Filters</h1>
        </div>
        <ResetFiters />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            <Favorites />
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            {`Years (${YEARS.length})`}
          </SidebarGroupLabel>
          <YearCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            {`Categories (${Object.keys(CATEGORIES).length})`}
          </SidebarGroupLabel>
          <CategoryCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            {`Topics (${Object.keys(TOPICS).length})`}
          </SidebarGroupLabel>
          <TopicCheckbox />
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-base pb-4 px-0">
            {`Techs (${Object.keys(TECHS).length})`}
          </SidebarGroupLabel>
          <TechCheckbox />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <div className="hover:bg-neutral-200 p-1 rounded-lg cursor-pointer text-center">
          <div className="flex items-cente justify-center gap-1">
            <p className="text-base flex gap-1">Made with ❤️ by</p>
            <p className="font-semibold">Arnab Ghosh</p>
          </div>
          <p className="text-sm text-muted-foreground">- GSoC'24 mentee</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
