import { LayoutDashboard, HeartPulse, Monitor, Plus, FileCode } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Left Side */}
      {/* <div className="flex items-center space-x-2">
        <span className="text-2xl">🪐</span>
        <h1 className="font-bold text-lg">SRE Platform</h1>
        <span className="text-gray-500 text-sm">
          Site Reliability Engineering Dashboard
        </span>
      </div> */}

      {/* Center Nav */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <LayoutDashboard size={18} /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/health"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <HeartPulse size={18} /> <span>Health Status</span>
        </NavLink>
        <NavLink
          to="/monitoring"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <Monitor size={18} /> <span>Monitoring Setup</span>
        </NavLink>
        <NavLink
          to="/onboarding"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <Plus size={18} /> <span>App Onboarding</span>
        </NavLink>
        <NavLink
          to="/automationscripts"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            }`
          }
        >
          <FileCode size={18} /> <span>Automation Scripts</span>
        </NavLink>
      </div>

      {/* Right Side */}
      {/* <div className="flex items-center space-x-3 text-sm">
        <span className="text-green-600 flex items-center">● System Online</span>
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
      </div> */}
    </nav>
  );
}
