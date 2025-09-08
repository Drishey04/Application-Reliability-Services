import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Activity,
  LineChart,
  Sliders,
  PlusSquare,
  Workflow,
  FileChartColumn
} from "lucide-react";

const linkBase =
  "group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition";
const inactive =
  "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
const active =
  "text-white bg-blue-600 hover:bg-blue-700 shadow";

const Item = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${linkBase} ${isActive ? active : inactive}`
    }
  >
    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
    {label}
  </NavLink>
);

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 py-3">
          <Item to="/" icon={Home} label="Home" />
          <Item to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <Item to="/health" icon={Activity} label="Health" />
          <Item to="/monitoring" icon={Sliders} label="Monitoring" />
          <Item to="/automation" icon={Workflow} label="Automation" />
          <Item to="/onboarding" icon={PlusSquare} label="Onboarding" />
          <Item to="/reports" icon={FileChartColumn} label="Reports" />
          <div className="ml-auto">
            <a
              href="https://application-reliability-services.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-black transition"
            >
              <LineChart className="w-4 h-4" />
              Live POC
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
