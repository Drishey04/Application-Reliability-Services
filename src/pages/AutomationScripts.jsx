import React, { useState } from "react";

const AutomationScripts = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Dummy data
  const scripts = [
    {
      id: 1,
      name: "Frontend Deployment Pipeline",
      type: "Deployment",
      description: "Automated deployment for React frontend with build optimization",
      lastRun: "2 hours ago",
      status: "Success",
      isRunning: false,
    },
    {
      id: 2,
      name: "Health Check Monitor",
      type: "Monitoring",
      description: "Automated health checks for all registered applications",
      lastRun: "Running every 5 minutes",
      status: "Running",
      isRunning: true,
    },
    {
      id: 3,
      name: "Database Backup",
      type: "Maintenance",
      description: "Daily automated backup of production databases",
      lastRun: "Scheduled Daily at 2:00 AM",
      status: "Success",
      isRunning: false,
    },
    {
      id: 4,
      name: "API Service Deployment",
      type: "Deployment",
      description: "Blue-green deployment for API services with rollback capability",
      lastRun: "1 day ago",
      status: "Failed",
      isRunning: false,
    },
    {
      id: 5,
      name: "Performance Metrics Collector",
      type: "Monitoring",
      description: "Collects and aggregates performance metrics from all services",
      lastRun: "Running every 1 minute",
      status: "Running",
      isRunning: true,
    },
    {
      id: 6,
      name: "Prosuite Application testing",
      type: "Pre-checks",
      description: "Comprehensive functional verification for e-commerce platform",
      lastRun: "Last run 30 minutes ago",
      status: "Success",
      isRunning: false,
    },
    {
      id: 7,
      name: "API Integration Validator",
      type: "Pre-checks",
      description: "Validates API endpoints, authentication, and data integrity",
      lastRun: "Running every 15 minutes",
      status: "Running",
      isRunning: true,
    },
  ];

  const executions = [
    {
      id: 1,
      script: "Frontend Deployment Pipeline",
      status: "Success",
      duration: "2m 34s",
      started: "2 hours ago",
      triggeredBy: "john.doe@example.com",
    },
    {
      id: 2,
      script: "Database Backup",
      status: "Success",
      duration: "15m 12s",
      started: "6 hours ago",
      triggeredBy: "Scheduled",
    },
    {
      id: 3,
      script: "API Service Deployment",
      status: "Failed",
      duration: "1m 45s",
      started: "1 day ago",
      triggeredBy: "jane.smith@example.com",
    },
  ];

  const tabs = ["All", "Deployment", "Monitoring", "Pre-checks", "Maintenance", "Scheduled"];

  const filteredScripts =
    activeTab === "All" ? scripts : scripts.filter((s) => s.type === activeTab);

  const statusColor = {
    Success: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Running: "bg-blue-100 text-blue-700",
  };

  const typeColor = {
    Deployment: "bg-blue-100 text-blue-700",
    Monitoring: "bg-green-100 text-green-700",
    "Pre-checks": "bg-emerald-100 text-emerald-700",
    Maintenance: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="p-6">
      {/* Heading row with button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Automation Scripts</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Add New Script
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-blue-700">Deployment Scripts</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-green-700">Monitoring Scripts</p>
        </div>
        <div className="p-4 bg-emerald-100 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-emerald-700">Pre-checks</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">1</p>
          <p className="text-sm text-purple-700">Maintenance Scripts</p>
        </div>
        <div className="p-4 bg-orange-100 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-orange-700">Running Now</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 cursor-pointer hover:text-blue-500 transition ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Script Cards */}
      <div className="space-y-4 mb-8">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between hover:shadow-lg transition cursor-pointer"
          >
            <div>
              <h3 className="font-medium">{script.name}</h3>
              <p className="text-sm text-gray-500">{script.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 text-xs rounded ${typeColor[script.type]}`}>
                  {script.type}
                </span>
                <span className="text-sm text-gray-400">{script.lastRun}</span>
                <span className={`px-2 py-1 text-xs rounded ${statusColor[script.status]}`}>
                  {script.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {script.isRunning ? (
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">Stop</button>
              ) : (
                <button className="px-3 py-1 text-sm bg-green-500 text-white rounded">
                  Run Now
                </button>
              )}
              <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition">
                Logs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Executions */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-medium mb-4">Recent Executions</h3>
        <table className="w-full text-sm">
          <thead className="text-left bg-gray-100">
            <tr>
              <th className="p-2">Script</th>
              <th className="p-2">Status</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Started</th>
              <th className="p-2">Triggered By</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {executions.map((exe) => (
              <tr key={exe.id} className="border-t hover:bg-gray-50 transition cursor-pointer">
                <td className="p-2">{exe.script}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 text-xs rounded ${statusColor[exe.status]}`}>
                    {exe.status}
                  </span>
                </td>
                <td className="p-2">{exe.duration}</td>
                <td className="p-2">{exe.started}</td>
                <td className="p-2">{exe.triggeredBy}</td>
                <td className="p-2 text-blue-600 cursor-pointer hover:underline">View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomationScripts;
