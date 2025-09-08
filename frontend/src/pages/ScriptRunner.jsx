import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ScriptRunner = () => {
  const { scriptName } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/run-script");

    ws.onopen = () => {
      setLogs((prev) => [...prev, `▶️ Starting ${scriptName}...`]);
    };

    ws.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    ws.onerror = () => {
      setLogs((prev) => [...prev, "⚠️ Error connecting to WebSocket"]);
    };

    ws.onclose = () => {
      setLogs((prev) => [...prev, "✅ Script execution finished"]);
    };

    return () => ws.close();
  }, [scriptName]);

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
        onClick={() => navigate("/automation")}
      >
        ← Back to Scripts
      </button>
      <h2 className="text-xl font-semibold mb-2">Running Script: {scriptName}</h2>

      <div className="bg-black text-green-400 p-4 rounded h-[70vh] overflow-y-auto font-mono text-sm">
        {logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => {
          const blob = new Blob([logs.join("\n")], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${scriptName}-logs.txt`;
          link.click();
        }}
      >
        💾 Save Logs
      </button>
    </div>
  );
};

export default ScriptRunner;
