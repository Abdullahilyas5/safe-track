"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import placeholder from "@/../public/images/placeholder.avif";

// Define page keys for child and parent
type ChildPages = "dashboard" | "chat" | "notification" | "settings";
type ParentPages = "dashboard" | "chat" | "notification" | "settings"; // customize if needed

interface IUser {
  name: string;
  email: string;
  role: string;
}

// Props type
type Props = {
  pageKey?: "child" | "parent";
  currentPage?: ChildPages | ParentPages;
};

const Topbar = ({ pageKey = "child", currentPage = "dashboard" }: Props) => {
  const [user, setUser] = React.useState<IUser>({
    name: "Guest",
    email: "",
    role: ""
  });

  // Child pages content
  const childPages: Record<ChildPages, { title: string; description: string }> = {
    dashboard: { title: "Dashboard (Child)", description: "Welcome to your dashboard" },
    chat: { title: "Chat (Child)", description: "Welcome to your Chat" },
    notification: { title: "Notification (Child)", description: "Welcome to your Notification" },
    settings: { title: "Settings (Child)", description: "Welcome to your Settings" }
  };

  // Parent pages content
  const parentPages: Record<ParentPages, { title: string; description: string }> = {
    dashboard: { title: "Dashboard (Parent)", description: "Welcome to your dashboard" },
    chat: { title: "Chat (Parent)", description: "Welcome to your Chat" },
    notification: { title: "Notification (Parent)", description: "Welcome to your Notification" },
    settings: { title: "Settings (Parent)", description: "Welcome to your Settings" }
  };

  // Select content based on pageKey
  const topcontent = pageKey === "child" ? childPages : parentPages;

  return (
    <div className="px-4 py-2 w-full border-b-2 border-gray-400 shadow-lg rounded-b-lg flex justify-between items-center h-max">
      
      {/* Page Title & Description */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[#65A30D] text-xl font-semibold">{topcontent[currentPage].title}</h2>
        <div className="text-sm font-medium text-gray-500">{topcontent[currentPage].description}</div>
      </div>

      {/* Search + User */}
      <div className="flex items-center gap-10">
        <div className="flex justify-between items-center gap-2 relative">
          <SearchIcon className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-black"/>
          <Input placeholder="Search..." className="pl-10" />
          <Button variant="default" className="bg-[#65A30D] hover:bg-green-700" size="lg">Search</Button>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-4 bg-red-400 rounded-full overflow-hidden w-10 h-10">
          <Image
            src={placeholder}
            alt="user_profile"
            className="w-full h-full object-cover"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
