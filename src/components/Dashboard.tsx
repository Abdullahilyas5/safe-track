import SideBar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"


type Props = {
    forUser: "child" | "parent"
}


const Dashboard = ({forUser} : Props) => {

    const options = forUser;

  return (
    <div>
        Dashboard for {forUser}
    </div>
  )
};

export default Dashboard;