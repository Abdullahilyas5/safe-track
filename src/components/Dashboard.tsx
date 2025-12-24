'use client';
import SideBar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"

import React from "react";

type Props = {
  forUser: "child" | "parent"
}

type IDash = {
  id: number;
  title: string;
  value: string | number;
  children: number;
  activeTracking: string;
  lastKnownLocation: string;
  alterCount: number;
}

const Dashboard = ({ forUser }: Props) => {
  const [DashboardData, setDashboardData] = React.useState<IDash>({} as IDash);
  const options = forUser;

  return (
    <div>
      <div className="min-w-max max-w-fit h-screen flex flex-col  gap-2">

        <div className="w-full py-2 px-1 flex bg-blue-600  justify-between gap-4 items-center h-max mx-4 my-2 ">
          <div className=" flex flex-col border border-black rounded-lg   w-full shadow-sm">
            <p className="font-medium text-xl ">Total children Added</p>
            <span>{DashboardData.children || 3}</span>
          </div>

          <div className=" flex flex-col border border-black rounded-lg   w-full shadow-sm">
            <p className="font-medium text-xl ">Active Tracking</p>
            <span>{DashboardData.activeTracking || "No"}</span>

          </div>

          <div className=" flex flex-col border border-black rounded-lg   w-full shadow-sm">
            <p className="font-medium text-xl ">Last Known location</p>
            <span>{DashboardData.lastKnownLocation || "Islamabad"}</span>
          </div>

          <div className=" flex flex-col border border-black rounded-lg   w-full shadow-sm">
            <p className="font-medium text-xl ">Todays alert count</p>
            <span>{DashboardData.alterCount || 5}</span>
          </div>

        </div>




        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
      </div>
    </div>
  )
};

export default Dashboard;