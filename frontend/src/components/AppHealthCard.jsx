// src/components/AppHealthCard.jsx
import { CheckCircle, AlertTriangle, AlertCircle, Server, Activity, Calendar, Users } from "lucide-react";

const AppHealthCard = ({ app }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-[360px] border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{app.name}</h2>
        {app.status === "healthy" ? (
          <CheckCircle className="text-green-500" size={22} />
        ) : app.status === "warning" ? (
          <AlertTriangle className="text-yellow-500" size={22} />
        ) : (
          <AlertCircle className="text-red-500" size={22} />
        )}
      </div>

      {/* URL */}
      <p className="text-sm text-gray-500">{app.url}</p>

      {/* Status */}
      <div className="mt-2 flex items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            app.status === "healthy"
              ? "bg-green-100 text-green-700"
              : app.status === "warning"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {app.status}
        </span>
      </div>

      {/* Response Time */}
      <p className="mt-2 text-sm text-gray-700">
        Response Time:{" "}
        <span className="font-semibold">{app.responseTime}</span>
      </p>

      {/* Upcoming Changes */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Calendar size={16} /> Upcoming Changes (ServiceNow)
        </h3>
        <div className="space-y-2 mt-2">
          {app.changes.map((chg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-sm ${
                chg.severity === "Low"
                  ? "bg-green-50 border-green-200"
                  : chg.severity === "High"
                  ? "bg-yellow-50 border-yellow-200"
                  : chg.severity === "Critical"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-mono font-medium">{chg.id}</span>
                <span
                  className={`text-xs font-medium ${
                    chg.severity === "Low"
                      ? "text-green-700"
                      : chg.severity === "High"
                      ? "text-yellow-700"
                      : chg.severity === "Critical"
                      ? "text-red-700"
                      : "text-blue-700"
                  }`}
                >
                  {chg.severity}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{chg.title}</p>
              <p className="text-xs text-gray-500">{chg.date}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Users size={12} /> {chg.assigned}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Setup */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Server size={16} /> Current Monitoring Setup
        </h3>
        <div className="space-y-3 mt-2">
          {app.environments.map((env, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border bg-gray-50"
            >
              <h4 className="text-xs font-semibold mb-2">{env.name}</h4>
              <div className="flex flex-wrap gap-2">
                {env.tools.map((tool, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                      tool.status === "ok"
                        ? "bg-green-100 text-green-700"
                        : tool.status === "fail"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <Activity size={12} />
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Checked */}
      <p className="mt-3 text-xs text-gray-500">
        Last Checked: {app.lastChecked}
      </p>
    </div>
  );
};

// Example Dummy Data
const dummyApp = {
  name: "E-commerce Frontend",
  url: "https://shop.example.com",
  status: "healthy",
  responseTime: "245ms",
  lastChecked: "Dec 15, 2024 2:34 PM",
  changes: [
    {
      id: "CHG0012345",
      title: "Frontend UI Enhancement - React 18 Upgrade",
      date: "Dec 18, 2024 2:00 AM - 4:00 AM EST",
      assigned: "Frontend Team",
      severity: "Standard",
    },
    {
      id: "CHG0012389",
      title: "Security Patch - CVE-2024-1234 Fix",
      date: "Dec 20, 2024 1:00 AM - 1:30 AM EST",
      assigned: "Security Team",
      severity: "Low",
    },
    {
      id: "CHG0012401",
      title: "Performance Optimization - CDN Configuration",
      date: "Dec 22, 2024 3:00 AM - 5:00 AM EST",
      assigned: "DevOps Team",
      severity: "High",
    },
  ],
  environments: [
    {
      name: "Production Environment",
      tools: [
        { name: "Prometheus", status: "ok" },
        { name: "ThousandEyes", status: "ok" },
        { name: "Splunk SIEM", status: "ok" },
        { name: "App Logging", status: "ok" },
        { name: "PagerDuty", status: "fail" },
        { name: "Grafana", status: "ok" },
      ],
    },
    {
      name: "Staging Environment",
      tools: [
        { name: "Prometheus", status: "ok" },
        { name: "ThousandEyes", status: "fail" },
        { name: "Basic Logging", status: "ok" },
        { name: "Grafana", status: "ok" },
      ],
    },
    {
      name: "Development Environment",
      tools: [
        { name: "Prometheus", status: "warn" },
        { name: "Local Logs", status: "ok" },
      ],
    },
  ],
};

export default function HealthStatusPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <AppHealthCard app={dummyApp} />
    </div>
  );
}
