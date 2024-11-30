"use client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser } from "@/types/entities";
import { useApi } from "@/utils/fetcher";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  // console.log("user: ", user);
  const [isLoading, setIsLoading] = useState(false);
  const { API } = useApi();
   const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);

 
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth_token");

      if (token) {
        await API.logout(token);
      }

      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");

      navigate("/login", {
      replace: true,
      state: {
        loggedOut: true
      },


    });
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");
      toast.error("Error during logout");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = [
    {
      label: "Profile",
      href: `/profile/user-dashboard`,
      disabled: false,
    },
    { label: "Dashboard", href: "#", disabled: true },
    { label: "Post a Request", href: "#", disabled: false },
    { label: "Refer a Friend", href: "#", disabled: false },
    {
      label: "Settings",
      href: `/profile/settings`,
      disabled: false,
    },
    { label: "Billing and payments", href: "#", disabled: true },
    { label: "Help & support", href: "#", disabled: false },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center rounded-full text-sm font-semibold text-white hover:bg-creator-bg-300 focus:outline-none focus:ring-2 focus:ring-creator-bg-300 focus:ring-offset-2 focus:ring-offset-white transition-all">
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
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-creator-bg-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none"> {user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className="hover:bg-creator-bg-400 hover:text-white focus:bg-creator-bg-400 focus:text-white group"
              disabled={item.disabled}
            >
              <Link
                to={item.href}
                className={`${
                  item.disabled
                    ? "cursor-text opacity-50"
                    : item.label === "Refer a Friend"
                    ? "text-creator-bg-400 cursor-pointer font-medium group-hover:text-white"
                    : "cursor-pointer"
                } w-full`}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  }
                }}
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-creator-bg-400 hover:text-white focus:bg-creator-bg-400 focus:text-white">
          <button
            onClick={handleLogout}
            className="w-full text-left cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
