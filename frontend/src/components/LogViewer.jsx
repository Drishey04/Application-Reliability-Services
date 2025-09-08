import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function LogViewer() {
  const { scriptId } = useParams();
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const wsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/run-script");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setIsRunning(false);
    };

    return () => {
      ws.close();
    };
  }, [scriptId]);

  const saveLogs = () => {
    const blob = new Blob([logs.join("\n")], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scriptId}_logs.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 rounded-lg"
      >
        ← Back to Scripts
      </button>

      <h2 className="text-xl font-bold mb-4">Running: {scriptId}</h2>
      <button
        onClick={saveLogs}
        disabled={logs.length === 0}
        className="mb-4 px-4 py-2 bg-green-500 rounded-lg"
      >
        Save Logs
      </button>

      <div className="bg-black text-green-400 font-mono p-4 h-96 overflow-y-auto rounded-lg">
        {logs.map((log, index) => (
          <div key={index}>$ {log}</div>
        ))}
      </div>

      {!isRunning && (
        <div className="mt-4 text-green-400">✅ Script finished.</div>
      )}
    </div>
  );
}

export default LogViewer;
