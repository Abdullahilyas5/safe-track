import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Dashboard from "@/components/Dashboard";
type Props = {}

const layout = (props: Props) => {
  return (
     <div className="w-full h-screen flex flex-1 basis-1/2">
        <SideBar forUser='child'/>
        <div className="flex flex-col w-full">
            <Topbar currentPage="dashboard" pageKey="child"/>

        </div>
    </div>
  )
};

export default layout;