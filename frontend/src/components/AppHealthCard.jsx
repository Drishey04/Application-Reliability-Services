// src/components/ScriptRunner.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogViewer from "./LogViewer";

const ScriptRunner = () => {
  const { scriptName } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  const handleRun = () => {
    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/run-script/${scriptName}`);
    setSocket(ws);

    ws.onopen = () => {
      setConnected(true);
      setLogs(["✅ Connected to backend..."]);
      ws.send(JSON.stringify({ username, password }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.line) {
          setLogs((prev) => [...prev, data.line]);
        }
      } catch {
        setLogs((prev) => [...prev, event.data]);
      }
    };

    ws.onerror = () => {
      setLogs((prev) => [...prev, "❌ WebSocket error"]);
    };

    ws.onclose = () => {
      setConnected(false);
      setLogs((prev) => [...prev, "🔴 Disconnected"]);
    };
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Running Script: {scriptName}
      </h2>

      {/* Credentials */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded w-1/3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded w-1/3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRun}
          disabled={connected}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {connected ? "Running..." : "Run Script"}
        </button>
      </div>

      {/* Logs */}
      <LogViewer logs={logs} />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/automation")}
      >
        ⬅ Back to Scripts
      </button>
    </div>
  );
};

export default ScriptRunner;
