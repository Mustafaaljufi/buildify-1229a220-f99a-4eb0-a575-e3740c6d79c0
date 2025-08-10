
import { NavLink } from "react-router-dom";
import { Home, BarChart3, History, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  
  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Swap" },
    { to: "/pools", icon: <BarChart3 size={20} />, label: "Pools" },
    { to: "/history", icon: <History size={20} />, label: "History" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" }
  ];

  return (
    <div className={`w-16 md:w-64 h-screen fixed ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="p-4 flex justify-center md:justify-start">
        <h1 className="text-xl font-bold hidden md:block">Layer 1 DEX</h1>
        <h1 className="text-xl font-bold md:hidden">L1</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center p-3 md:px-4 ${
                    isActive 
                      ? `${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} font-medium` 
                      : 'hover:bg-opacity-10 hover:bg-gray-500'
                  } rounded-lg mx-2 transition-colors`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="hidden md:block">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;