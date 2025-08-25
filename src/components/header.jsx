import React from "react";

export default function Header({ currentDate }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo + Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">🔧 SRE Platform</h1>
            <p className="ml-4 text-sm text-gray-600 hidden sm:block">
              Site Reliability Engineering Dashboard
            </p>
          </div>

          {/* Right: Status + Date */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
            <div className="text-sm text-gray-500">{currentDate}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
