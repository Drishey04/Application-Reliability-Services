import React from "react";
import { Download, Table2 } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow border">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">Audit & Compliance Reports</div>
            <div className="text-sm text-gray-500">Export health, incidents, SLA, and monitoring coverage per app.</div>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow border">
        <div className="flex items-center gap-2 font-semibold mb-3">
          <Table2 className="w-4 h-4" /> Report Samples
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Reliability Index by LOB (monthly)</li>
          <li>Incident Recurrence & MTTR Trend (quarterly)</li>
          <li>Monitoring Coverage Matrix by Environment</li>
          <li>Change Risk vs Post-change Incidents</li>
        </ul>
      </div>
    </div>
  );
}
