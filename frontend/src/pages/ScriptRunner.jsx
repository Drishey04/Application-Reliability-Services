import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogViewer from "../components/LogViewer";

const ScriptRunner = () => {
  const { scriptName } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const socketRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRun = () => {
    const socket = new WebSocket("ws://localhost:8000/ws/run-prosuite");
    socketRef.current = socket;

    socket.onopen = () => {
      setLogs(["🔗 Connection open"]);
      socket.send(JSON.stringify({ username, password }));
    };

    socket.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      setLogs((prev) => [...prev, "❌ Connection closed"]);
    };

    socket.onerror = (err) => {
      setLogs((prev) => [...prev, "⚠️ WebSocket error"]);
    };
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
        onClick={() => navigate("/automation")}
      >
        ⬅ Back
      </button>

      <h2 className="text-xl font-semibold mb-4">Running: {scriptName}</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded w-1/3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-1/3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          ▶ Run Script
        </button>
      </div>

      <LogViewer logs={logs} />
    </div>
  );
};

export default ScriptRunner;
