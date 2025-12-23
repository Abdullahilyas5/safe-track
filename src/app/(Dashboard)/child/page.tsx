'use client'
import Dashboard from '@/components/Dashboard';
import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";



type Props = {}

const page = (props: Props) => {
  return (
   <div>
    <Dashboard forUser='child'/>
    
   </div>
  )
};

export default page;