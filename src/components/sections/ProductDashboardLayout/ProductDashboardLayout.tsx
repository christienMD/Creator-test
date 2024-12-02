import { AppSidebar } from "../AppSidebar/AppSidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../../ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import React from "react";
// import SearchBar from "../SearchBar/SearchBar";

interface Props {
  children: React.ReactNode;
}

function ProductDashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <SidebarTrigger className="-ml-1" />

        {/* <header className="flex h-16 shrink-0 items-center justify-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"> */}
        <div className="flex items-center gap-2 px-4 justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" className=" ">
                  {" "}
                  {/* <SearchBar /> */}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* </header> */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 lg:mt-8  ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProductDashboardLayout ;
