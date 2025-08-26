import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import Onboarding from "./pages/Onboarding";
import MonitoringSetup from "./pages/MonitoringSetup";
import Settings from "./pages/Settings";
import HealthStatus from "./pages/healthStatus";
import AutomationScripts from "./pages/AutomationScripts";
import AppDetails from "./pages/AppDetails";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Top Header */}
          <Header />
          <Navbar />

          {/* Page Content */}
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health" element={<HealthStatus />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/monitoring" element={<MonitoringSetup />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/automationscripts" element={<AutomationScripts />} />
              <Route path="/app/:appId" element={<AppDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
