import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import CategoryCheckbox from "./CategoryCheckbox";
import YearCheckbox from "./YearCheckbox";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>GSoC Organizations</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Years</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
                <YearCheckbox />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
                <CategoryCheckbox />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
