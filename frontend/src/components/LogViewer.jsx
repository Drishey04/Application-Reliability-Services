import React, { useEffect, useRef } from "react";

const LogViewer = ({ logs }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-black text-green-400 p-3 rounded h-96 overflow-y-auto font-mono text-sm">
      {logs && logs.map((log, i) => <div key={i}>{log}</div>)}
      <div ref={logEndRef} />
    </div>
  );
};

export default LogViewer;
