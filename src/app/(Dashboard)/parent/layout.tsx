'use client';
import Dashboard from '@/components/Dashboard';
import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Props = {
    children: React.ReactNode;
}

const layout = ({children}: Props) => {
  return (
     <div className="w-full h-screen  flex flex-1 basis-1/2">
        <SideBar forUser="parent"/>
        <div className="flex flex-col w-full">
            <Topbar currentPage="dashboard" pageKey="parent"/>
            <main>
                {children}
            </main>
        </div>
    </div>
  )
}

export default layout;