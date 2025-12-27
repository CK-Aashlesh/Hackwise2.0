'use client';
import { useState, useEffect } from 'react';

export default function QueriesPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const fetchQueries = async () => {
    try {
      const res = await fetch('/api/admin/queries');
      if (res.ok) {
        const data = await res.json();
        setQueries(data);
      }
    } catch (error) {
      console.error('Failed to fetch queries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleResolve = async (id, currentStatus) => {
    try {
      await fetch('/api/admin/queries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_resolved: !currentStatus }),
      });
      fetchQueries();
    } catch (error) {
      console.error('Failed to update', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this query?')) return;
    try {
      await fetch('/api/admin/queries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchQueries();
      setSelectedQuery(null);
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  if (loading) return <div className="p-8 font-mono text-orange-500">Loading queries...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-mono font-bold text-white uppercase mb-8">
        Contact <span className="text-orange-500">Queries</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {queries.map((query) => (
            <div 
              key={query.id}
              onClick={() => setSelectedQuery(query)}
              className={`p-4 border rounded cursor-pointer transition-colors ${
                selectedQuery?.id === query.id 
                  ? 'bg-orange-500/10 border-orange-500' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs px-2 py-1 rounded font-mono uppercase ${query.is_resolved ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {query.is_resolved ? 'Resolved' : 'Pending'}
                </span>
                <span className="text-xs text-white/40 font-mono">
                  {new Date(query.created_at).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-bold text-white mb-1 truncate">{query.subject || 'No Subject'}</h4>
              <p className="text-sm text-white/60 truncate">{query.name}</p>
            </div>
          ))}
          {queries.length === 0 && (
             <div className="text-white/40 font-mono text-center py-8">No queries found</div>
          )}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          {selectedQuery ? (
            <div className="p-8 border border-white/10 bg-white/5 rounded h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedQuery.subject}</h3>
                  <div className="flex gap-4 text-sm font-mono text-white/60">
                    <span className="flex items-center gap-2">
                      <i className="ri-user-line" /> {selectedQuery.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="ri-mail-line" /> {selectedQuery.email}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResolve(selectedQuery.id, selectedQuery.is_resolved)}
                    className={`px-4 py-2 rounded font-mono text-sm uppercase transition-colors ${
                      selectedQuery.is_resolved 
                        ? 'bg-white/10 hover:bg-white/20 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-black font-bold'
                    }`}
                  >
                    {selectedQuery.is_resolved ? 'Mark Pending' : 'Mark Resolved'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedQuery.id)}
                    className="px-4 py-2 rounded font-mono text-sm uppercase bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="bg-black/30 p-6 rounded border border-white/5 font-mono text-white/80 whitespace-pre-wrap">
                  {selectedQuery.message}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-white/40 space-y-1">
                <p>ID: {selectedQuery.id}</p>
                <p>Received: {new Date(selectedQuery.created_at).toLocaleString()}</p>
                {selectedQuery.client_metadata && (
                  <p>Metadata: {JSON.stringify(selectedQuery.client_metadata)}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border border-white/10 border-dashed rounded bg-white/5 text-white/30 font-mono uppercase">
              Select a query to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

