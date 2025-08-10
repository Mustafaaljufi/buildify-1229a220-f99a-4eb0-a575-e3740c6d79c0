
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import WalletConnect from "./WalletConnect";
import { useTheme } from "@/contexts/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6">
          <div className="flex justify-end mb-6">
            <WalletConnect />
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;