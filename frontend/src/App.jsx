import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/dashboard";            // keep your existing dashboard
import HealthStatus from "./pages/HealthStatus";      // keep (grid of app cards)
import AppDetail from "./pages/AppDetail";            // new per-app drilldown
import MonitoringSetup from "./pages/MonitoringSetup";
import Onboarding from "./pages/Onboarding";
import AutomationScripts from "./pages/AutomationScripts";
import Reports from "./pages/Reports";
import ScriptRunner from "./pages/ScriptRunner";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header currentDate={new Date().toLocaleDateString()} />
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/health" element={<HealthStatus />} />
            <Route path="/app/:slug" element={<AppDetail />} />
            <Route path="/monitoring" element={<MonitoringSetup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/automation" element={<AutomationScripts />} />
            <Route path="/automation/run/:scriptName" element={<ScriptRunner />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
