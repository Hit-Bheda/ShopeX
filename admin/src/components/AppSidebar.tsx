import * as React from "react";
import {
  Box,
  GalleryVerticalEnd,
  Home,
  PieChart,
  Shirt,
  TvMinimal,
} from "lucide-react";

import { NavActions } from "@/components/NavActions";
import { NavUser } from "@/components/NavUsers";
import { ProjectSwitcher } from "@/components/ProjectSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  projects: [
    {
      name: "Shopex",
      logo: GalleryVerticalEnd,
      plan: "E-Commerce",
    },
  ],
  actions: [
    {
      name: "Overview",
      url: "",
      icon: TvMinimal,
    },
    {
      name: "Home Page Editor",
      url: "/homepage-editor",
      icon: Home,
    },
    {
      name: "Categories",
      url: "/categories",
      icon: PieChart,
    },
    {
      name: "Products",
      url: "/products",
      icon: Shirt,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: Box,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavActions actions={data.actions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
