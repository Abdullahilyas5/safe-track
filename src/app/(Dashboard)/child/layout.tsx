import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-screen">
      <SideBar forUser="child" />
      <div className="flex flex-col w-full">
        <Topbar currentPage="dashboard" pageKey="child" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
