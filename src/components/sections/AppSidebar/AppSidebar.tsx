"use client";

import * as React from "react";
import {
  Home,
  GalleryVerticalEnd,
  Library,
  Plus,
  LayoutDashboard,
 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../ui/sidebar";
import { NavUser } from "../NavUser/NavUser";
import { NavMain } from "../NavMain/NavMain";

import { TeamSwitcher } from "../TeamSwitcher/TeamSwitcher";
import { AuthUser } from "@/types/entities";


// This is sample data.
const data = {
  user: {
    name: "Salome",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CREATORS",
      logo: GalleryVerticalEnd,
      plan: "",
      url: "/home"
    },
  ],
  navMain: [
    {
      title: "New Product",
      url: "/creator/product/new",
      icon: Plus,
      isActive: true,
    },
    {
      title: "Home",
      url: "/creator/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Dashboard",
      url: "/creator/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Library",
      url: "/creator/library",
      icon: Library,
       isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = React.useState<AuthUser | null>(null);
  // console.log("user: ", user);

  React.useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);




  return (
    <Sidebar
      collapsible="icon"
      {...props}
    className=""
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
