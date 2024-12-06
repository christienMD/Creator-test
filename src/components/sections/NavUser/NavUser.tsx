import { ChevronsUpDown, Loader, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar";
import { AuthUser } from "@/types/entities";
import { toast } from "react-toastify";
import { useApi } from "@/utils/fetcher";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function NavUser({ user }: { user: AuthUser | null }) {
  const { isMobile } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { API } = useApi();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async (e: React.MouseEvent) => {
    // Prevent the dropdown from closing
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth_token");

      if (token) {
        await API.logout(token);
      }

      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");

      setIsOpen(false);
      navigate("/login", {
        replace: true,
        state: {
          loggedOut: true,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");
      toast.error("Error during logout");
      setIsOpen(false);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-sidebar-accent ${
                user?.name === "Salome"
                  ? "hover:bg-transparent "
                  : "data-[state=open]:text-sidebar-accent-foreground"
              }`}
            >
              <Avatar className="w-[38px] h-[38px]">
                {user?.profile_pic && (
                  <AvatarImage
                    src={user.profile_pic}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-creator-bg-400">
                  {user?.name ? getInitials(user.name) : ""}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profile_pic ?? ""}
                    alt={user?.name ?? ""}
                  />
                  <AvatarFallback className="rounded-lg ">
                    {user?.name ? getInitials(user.name) : ""}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={handleLogout}
              className="hover:cursor-pointer"
            >
              {isLoading && (
                <div className="flex gap-2">
                  <span>Logging out...</span>
                  <Loader className="animate-spin h-7 w-7" />
                </div>
              )}
              {!isLoading && (
                <div className="flex gap-3">
                  <LogOut />
                  Log out
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
