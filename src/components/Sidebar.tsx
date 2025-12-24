'use client';
import Link from "next/link";
import { Sidebar } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { MessageCircle} from "lucide-react";
import {Bell} from "lucide-react"
import { Settings } from "lucide-react";
import {User} from "lucide-react";
import Image from "next/image";
import { set } from "mongoose";


type Props = {
    forUser: "child" | "parent",
}
 


const  options = {
    child: {
        dashboard : {name : "Dashboard" , path : "/child"},
        chat : {name : "Chat" , path : "/child/chat"},
        notification : {name : "notification" , path : "/child/notifications"},
        settings : {name : "settings" , path : "/child/settings"},
        guardian : {name : "guardian" , path : "/child/guardians"},
    },
    parent: {
        dashboard : {name : "Dashboard" , path : "/parent"},
        chat : {name : "Chat" , path : "/parent/chat"},
        notification : {name : "notification" , path : "/parent/notifications"},
        settings : {name : "settings" , path : "/parent/settings"},
        children: {name : "children" , path : "/parent/children"},
    }
};

const SideBar = ({forUser}: Props) => {
    return (
        <div className="w-max h-screen sticky top-0 p-6 bg-white  border-r-2 rounded-lg border-black/40 ">
            <div className="flex flex-row-reverse gap-6 justify-center  mb-10 items-center">
                <span className="p-2 group hover:bg-[#65A30D]  rounded-md">
                    <Sidebar className="text-[#65A30D] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                </span>
                <h2 className="text-3xl font-bold text-[#65A30D]">SafeTrack</h2>
            </div>
            <ul className="flex flex-col gap-6 py-4 text-medium font-semibold">
                <li className="flex items-center justify-start gap-4 ">
                    <LayoutDashboard className="text-[#65A30D] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                    <Link href={options[forUser].dashboard.path} className="text-xl text-gray-500">{options[forUser].dashboard.name}</Link>
                </li>

                <li className="flex items-center justify-start gap-4 ">
                    <MessageCircle className="text-[#65A30D] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                    <Link href={options[forUser].chat.path} className="text-xl text-gray-500">Chat</Link>
                </li>

                <li className="flex items-center justify-start gap-4 ">
                    <Bell className="text-[#65A30D] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                    <Link href={options[forUser].notification.path} className="text-xl text-gray-500">notification</Link>
                </li>

                <li className="flex items-center justify-start gap-4 ">
                    <User className="text-[rgb(101,163,13)] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                    <Link href={forUser === "parent" ? options[forUser].children.path : options[forUser].guardian.path} className="text-xl text-gray-500">{forUser === "parent" ? options[forUser].children.name : options[forUser].guardian.name}</Link>
                </li>

                <div className="flex flex-col gap-6">
                    <p className="text-md text-gray-900 font-medium">prefrence</p>
                     <li className="flex items-center justify-start gap-4 ">
                        <Settings className="text-[#65A30D] group-hover:text-white  z-10 group-hover:cursor-pointer"/>
                        <Link href={options[forUser].settings.path} className="text-xl text-gray-500">Setting</Link>
                    </li>
                </div>

               
            </ul>
        </div>
    )
};

export default SideBar;