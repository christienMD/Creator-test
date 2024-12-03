import DashboardChart from "../CreatorsDashboardChart/CreatorsDashboardChart";
import { dashboardData } from "../../../utils/data";
import { ArrowDownLeftFromSquare } from "lucide-react";
import { AuthUser } from "@/types/entities";
import { useEffect, useState } from "react";

type DashboardTitle = "Buyers" | "Revenue" | "Content Bought";

interface DashboardItem {
  title: DashboardTitle;
  data: number[];
  labels: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const buyersData =
    dashboardData.find((data) => data.title === "Buyers")?.data || [];
  const revenueData =
    dashboardData.find((data) => data.title === "Revenue")?.data || [];
  const contentData =
    dashboardData.find((data) => data.title === "Content Bought")?.data || [];

  // Define the function to calculate the highest value for each title
  const getHighestData = (title: DashboardTitle): number => {
    switch (title) {
      case "Buyers":
        return buyersData.length > 0 ? Math.max(...buyersData) : 0;
      case "Revenue":
        return revenueData.length > 0 ? Math.max(...revenueData) : 0;
      case "Content Bought":
        return contentData.length > 0 ? Math.max(...contentData) : 0;
      default:
        return 0;
    }
  };

  // Function to get the date associated with the highest total
  const getHighestDataDate = (title: DashboardTitle): string => {
    const dataItem = dashboardData.find((item) => item.title === title);
    if (!dataItem) return "";

    const maxIndex = dataItem.data.indexOf(Math.max(...dataItem.data));
    return dataItem.labels[maxIndex];
  };

   useEffect(() => {
     const userDataString = localStorage.getItem("userData");
     if (userDataString) {
       setUser(JSON.parse(userDataString));
     }
   }, []);

  return (
    <div className="max-w-7xl  p-4 sm:p-6">
      <h2 className="text-3xl font-semibold mb-1">Dashboard</h2>
      <p>Welcome back , {user?.name}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        {" "}
        {/* Adjusted gap */}
        {dashboardData.map((data: DashboardItem, index) => (
          <div
            key={index}
            className="min-h-[300px] border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-md mb-2 text-creator-text-100 flex items-center">
              <ArrowDownLeftFromSquare className="mr-2 w-4" />
              {data.title}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-4xl font-semibold mb-4">
                {getHighestData(data.title)}
              </span>
              <p className="text-creator-text-100">
                {getHighestDataDate(data.title)}
              </p>
              {/* Display the date */}
            </div>

            <DashboardChart
              data={data.data}
              labels={data.labels}
              title={data.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
