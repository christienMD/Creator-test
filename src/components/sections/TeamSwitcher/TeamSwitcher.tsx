import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { Link } from "react-router-dom";

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
  url: string;
}

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const [activeTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className={`data-[state=open]:bg-sidebar-accent ${
            teams[0].name === "CREATORS"
              ? "hover:bg-transparent"
              : "data-[state=open]:text-sidebar-accent-foreground"
          }`}
          onClick={() => {
            console.log(`Active Team: ${activeTeam.name}`);
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {activeTeam.logo && <activeTeam.logo className="size-4" />}
            </div>
            {/* Name carries the link */}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Link
                to={activeTeam.url}
                className="truncate font-semibold"
                onClick={() => console.log(`Navigating to: ${activeTeam.url}`)}
              >
                {activeTeam.name}
              </Link>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
