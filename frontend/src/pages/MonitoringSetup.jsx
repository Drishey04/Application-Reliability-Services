// src/pages/MonitoringSetup.jsx
import React, { useState } from "react";

export default function MonitoringSetup() {
  const apps = [
    { id: "case", name: "Case (https://case.example.com)" },
    { id: "atwork", name: "Atwork (https://atwork.example.com)" },
    { id: "espa", name: "ESPA (https://espa.example.com)" },
    { id: "etask", name: "eTask (https://etask.example.com)" },
    { id: "prosuite", name: "ProSuite (https://prosuite.example.com)" },
    { id: "laas", name: "LaaS (https://laas.example.com)" },
  ];

  const [form, setForm] = useState({
    app: apps[0].id,
    checkInterval: 300,
    timeout: 30,
    retryCount: 3,
    enableAlerts: true,
    alertEmail: "sre-team@example.com",
    webhook: "https://hooks.slack.com/services/XXXX/YYYY/ZZZZ",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Configuration saved for ${form.app}`);
    console.log("Saved config:", form);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-1">Monitoring Setup</h2>
      <p className="text-gray-600 mb-6">
        Configure monitoring parameters and alerting for your applications
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-6"
      >
        {/* Select Application */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Application
          </label>
          <select
            name="app"
            value={form.app}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            {apps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>

        {/* Check Interval and Timeout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Check Interval (seconds)
            </label>
            <input
              type="number"
              name="checkInterval"
              value={form.checkInterval}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              min="60"
              max="3600"
            />
            <p className="text-xs text-gray-500">
              How often to check the application (60–3600 seconds)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Timeout (seconds)
            </label>
            <input
              type="number"
              name="timeout"
              value={form.timeout}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              min="5"
              max="120"
            />
            <p className="text-xs text-gray-500">
              Request timeout (5–120 seconds)
            </p>
          </div>
        </div>

        {/* Retry & Alerts */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Retry Count
            </label>
            <input
              type="number"
              name="retryCount"
              value={form.retryCount}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              min="1"
              max="10"
            />
            <p className="text-xs text-gray-500">
              Number of retries before marking as failed
            </p>
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="enableAlerts"
              checked={form.enableAlerts}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">Enable Alerts</span>
          </div>
        </div>

        {/* Alert Config */}
        <div>
          <h3 className="font-medium text-lg mb-2">Alert Configuration</h3>

          <label className="block text-sm font-medium mb-1">Alert Email</label>
          <input
            type="email"
            name="alertEmail"
            value={form.alertEmail}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mb-4"
          />

          <label className="block text-sm font-medium mb-1">
            Webhook URL (Optional)
          </label>
          <input
            type="text"
            name="webhook"
            value={form.webhook}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Webhook URL for Slack, Discord, or other services
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
