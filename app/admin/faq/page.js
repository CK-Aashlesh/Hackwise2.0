'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // ID of item being edited
  const [formData, setFormData] = useState({ question: '', answer: '', display_order: 0 });
  const [isAdding, setIsAdding] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq'); // Public endpoint for reading
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await fetch('/api/admin/faq', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchFaqs();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleEdit = (faq) => {
    setEditing(faq.id);
    setFormData({ question: faq.question, answer: faq.answer, display_order: faq.display_order });
    setIsAdding(false);
  };

  const handleSave = async (id) => {
    try {
      const method = id ? 'PUT' : 'POST';
      const body = id ? { ...formData, id } : formData;

      await fetch('/api/admin/faq', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      setEditing(null);
      setIsAdding(false);
      setFormData({ question: '', answer: '', display_order: 0 });
      fetchFaqs();
    } catch (error) {
      console.error('Failed to save', error);
    }
  };

  if (loading) return <div className="text-orange-500 font-mono">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-mono font-bold text-white uppercase">
          Manage <span className="text-orange-500">FAQ</span>
        </h2>
        <button
          onClick={() => { setIsAdding(true); setEditing(null); setFormData({ question: '', answer: '', display_order: 0 }); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-black font-bold font-mono rounded hover:bg-orange-600 transition-colors"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="space-y-4">
        {/* Add New Form */}
        {isAdding && (
          <div className="p-6 border border-orange-500/50 bg-orange-500/10 rounded-lg space-y-4">
            <h3 className="text-xl font-mono text-white mb-4">New FAQ</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Question"
                value={formData.question}
                onChange={e => setFormData({...formData, question: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none"
              />
              <textarea
                placeholder="Answer"
                value={formData.answer}
                onChange={e => setFormData({...formData, answer: e.target.value})}
                className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none h-32"
              />
              <input
                type="number"
                placeholder="Order (0, 1, 2...)"
                value={formData.display_order}
                onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none"
              />
              <div className="flex gap-2">
                <button onClick={() => handleSave(null)} className="px-4 py-2 bg-green-600 text-white font-mono rounded hover:bg-green-700">Save</button>
                <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-white/10 text-white font-mono rounded hover:bg-white/20">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        {faqs.map(faq => (
          <div key={faq.id} className="p-6 border border-white/10 bg-white/5 rounded-lg">
            {editing === faq.id ? (
              <div className="space-y-3">
                 <input
                  type="text"
                  value={formData.question}
                  onChange={e => setFormData({...formData, question: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none"
                />
                <textarea
                  value={formData.answer}
                  onChange={e => setFormData({...formData, answer: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none h-32"
                />
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                  className="w-full bg-black/50 border border-white/10 p-3 text-white font-mono rounded focus:border-orange-500 outline-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleSave(faq.id)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-mono rounded hover:bg-green-700">
                    <Save size={16} /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-mono rounded hover:bg-white/20">
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1 mr-4">
                  <h3 className="text-lg font-bold text-white font-mono">{faq.question}</h3>
                  <p className="text-white/60 font-sans">{faq.answer}</p>
                  <span className="text-xs text-white/20 font-mono">Order: {faq.display_order}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(faq)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {faqs.length === 0 && !isAdding && (
          <div className="text-center text-white/40 font-mono py-8">No FAQs found. Add one!</div>
        )}
      </div>
    </div>
  );
}

