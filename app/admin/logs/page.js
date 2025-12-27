'use client';
import { useState, useEffect } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/admin/logs');
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (error) {
        console.error('Failed to fetch logs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div className="p-8 font-mono text-orange-500">Loading logs...</div>;

  return (
    <div className="space-y-6">
       <h2 className="text-3xl font-mono font-bold text-white uppercase mb-8">
        System <span className="text-orange-500">Logs</span>
      </h2>

      <div className="border border-white/10 rounded overflow-hidden">
        <table className="w-full text-left font-mono text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase">
            <tr>
              <th className="p-4">Time</th>
              <th className="p-4">Level</th>
              <th className="p-4">Message</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors text-white/80">
                <td className="p-4 whitespace-nowrap text-white/40">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    log.level === 'ERROR' ? 'bg-red-500/20 text-red-500' :
                    log.level === 'WARN' ? 'bg-yellow-500/20 text-yellow-500' :
                    log.level === 'AUTH' ? 'bg-purple-500/20 text-purple-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {log.level}
                  </span>
                </td>
                <td className="p-4">{log.message}</td>
                <td className="p-4 font-mono text-xs text-white/40 max-w-xs truncate">
                  {log.details ? JSON.stringify(log.details) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

