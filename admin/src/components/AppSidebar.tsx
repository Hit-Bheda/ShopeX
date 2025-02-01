import * as React from "react"
import {
  Box,
  GalleryVerticalEnd,
  PieChart,
  Shirt,
  TvMinimal,
} from "lucide-react"

import { NavActions } from "@/components/NavActions"
import { NavUser } from "@/components/NavUsers"
import { ProjectSwitcher } from "@/components/ProjectSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/AuthStore"

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
      name: "Categories",
      url: "/categories",
      icon: PieChart,
    },
    {
      name: "Products",
      url: "/products",
      icon: Shirt,
    },{
      name: "Orders",
      url: "/orders",
      icon: Box 
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAuthStore((state) => state.user)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavActions actions={data.actions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ? {name:user.name,email:user.email} : {name: "",email:""}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
