'use client';
import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState({ pageViews: [], events: [] });
  const [range, setRange] = useState('24h');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?range=${range}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [range]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-mono font-bold text-white uppercase">
          Analytics <span className="text-orange-500">Reports</span>
        </h2>
        
        <div className="flex bg-white/5 rounded border border-white/10 p-1">
          {['24h', '7d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 rounded text-sm font-mono transition-colors ${
                range === r 
                  ? 'bg-orange-500 text-black font-bold' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-lg">
          <h3 className="text-xl font-mono text-white mb-6 uppercase border-b border-white/10 pb-4">Top Pages</h3>
          <div className="space-y-4">
            {data.pageViews.map((page, i) => (
              <div key={page.page_url} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white/20 font-mono text-sm">#{i + 1}</span>
                  <span className="text-white/80 font-mono truncate max-w-[200px]">{page.page_url}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 bg-white/10 w-24 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500" 
                      style={{ width: `${(page.count / Math.max(...data.pageViews.map(p => p.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-bold font-mono text-sm w-12 text-right">{page.count}</span>
                </div>
              </div>
            ))}
             {data.pageViews.length === 0 && !loading && (
              <div className="text-white/40 text-center font-mono">No data available</div>
            )}
          </div>
        </div>

        {/* Top Events */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-lg">
          <h3 className="text-xl font-mono text-white mb-6 uppercase border-b border-white/10 pb-4">Event Interactions</h3>
          <div className="space-y-4">
            {data.events.map((event, i) => (
              <div key={event.event_name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white/20 font-mono text-sm">#{i + 1}</span>
                  <span className="text-white/80 font-mono capitalize">{event.event_name.replace(/_/g, ' ')}</span>
                </div>
                <span className="text-white font-bold font-mono text-sm">{event.count}</span>
              </div>
            ))}
            {data.events.length === 0 && !loading && (
              <div className="text-white/40 text-center font-mono">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

