// src/pages/AppOnboarding.jsx
import React, { useState } from "react";

export default function AppOnboarding() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    environment: "Production",
    team: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    alert("Application Onboarded Successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Application Onboarding</h2>
      <p className="text-gray-600 mb-6">
        Add a new application to start monitoring its health and performance
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Name */}
          <div>
            <label className="block font-medium mb-2">Application Name *</label>
            <input
              type="text"
              name="name"
              placeholder="My Web App"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Application URL */}
          <div>
            <label className="block font-medium mb-2">Application URL *</label>
            <input
              type="url"
              name="url"
              placeholder="https://myapp.example.com"
              value={formData.url}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Brief description of the application..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Environment */}
          <div>
            <label className="block font-medium mb-2">Environment</label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>

          {/* Team/Owner */}
          <div>
            <label className="block font-medium mb-2">Team/Owner</label>
            <input
              type="text"
              name="team"
              placeholder="Frontend Team"
              value={formData.team}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block font-medium mb-2">Contact Email</label>
          <input
            type="email"
            name="email"
            placeholder="team@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            Email for notifications and alerts
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            + Add Application
          </button>
        </div>
      </form>
    </div>
  );
}
