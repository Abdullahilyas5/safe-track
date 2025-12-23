// import { Sidebar } from "lucide-react";
import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/components/Dashboard";

type Props = {}

const page = (props: Props) => {
  return (

    <div className="w-full h-screen flex flex-1 basis-1/2">
        <SideBar forUser="parent"/>
        <div className="flex flex-col w-full">
            <Topbar currentPage="dashboard" pageKey="parent"/>
            <Dashboard forUser="parent"/>
        </div>
    </div>
    
  )
};

export default page;