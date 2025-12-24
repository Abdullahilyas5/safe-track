// import { Sidebar } from "lucide-react";
import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/components/Dashboard";

type Props = {}

const page = (props: Props) => {
  return (

   <div>
    <Dashboard forUser="parent"/>
   </div>
  )
};

export default page;