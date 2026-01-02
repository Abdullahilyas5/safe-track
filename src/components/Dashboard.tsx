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
      <div className="max-w-full mx-auto h-max flex flex-col gap-2">

        <div className="w-full flex justify-around gap-4 items-center p-3 h-max ">
         
          <div className=" flex justify-between items-center  flex-col border-2 gap-2 h-full p-3 rounded-lg bg-white  w-full shadow-md cursor-pointer">
            <p className="font-semibold text-xl text-gray-600">Total children Added</p>
            <span className="font-medium text-xl">{DashboardData.children || 3}</span>
          </div>

          <div className=" flex justify-between items-center  flex-col border-2 gap-2 h-full p-3 rounded-lg bg-white  w-full shadow-md cursor-pointer">
            <p className="font-semibold text-xl text-gray-600">Active Tracking</p>
            <span className="font-medium text-xl">{DashboardData.activeTracking || "No"}</span>

          </div>

          <div className=" flex justify-between items-center  flex-col border-2 gap-2 h-full p-3 rounded-lg bg-white  w-full shadow-md cursor-pointer">
            <p className="font-semibold text-xl text-gray-600">Last Known location</p>
            <span className="font-medium text-xl">{DashboardData.lastKnownLocation || "Islamabad"}</span>
          </div>

          <div className=" flex justify-between items-center  flex-col border-2 gap-2 h-full p-3 rounded-lg bg-white  w-full shadow-md cursor-pointer">
            <p className="font-semibold text-xl text-gray-600 ">Todays alert count</p>
            <span className="font-medium text-xl ">{DashboardData.alterCount || 5}</span>
          </div>

        </div>

          <div>
            hello world
          </div>

{/* 

        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div>
        <div className="w-full py-2 px-1 h-max bg-red-500 mx-4 my-2 "></div> */}
      </div>
    </div>
  )
};

export default Dashboard;