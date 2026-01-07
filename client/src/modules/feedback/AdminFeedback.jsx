import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Clock, XCircle, Loader2, Filter } from 'lucide-react';
import API_BASE from '@/config/API_BASE';

export default function AdminFeedback() {
  const [data, setData] = useState({ feedbacks: [], totalPages: 1 });
  const [filters, setFilters] = useState({ page: 1, status: '', sort: '-createdAt' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE.FEEDBACK}?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_BASE.FEEDBACK}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchFeedbacks();
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Delete this feedback?")) {
      await fetch(`${API_BASE.FEEDBACK}/${id}`, { method: 'DELETE' });
      fetchFeedbacks();
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700';
      case 'inprogress': return 'bg-amber-100 text-amber-700';
      case 'closed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-rose-100 text-rose-700';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Header & Filters */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-xl font-black text-slate-800">Feedback Management</h1>
          <div className="flex gap-2">
            <select 
              className="p-2 text-sm border rounded-lg bg-slate-50"
              onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Table - Optimized for smaller laptop screens */}
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" /></td></tr>
              ) : data.feedbacks.map((item) => (
                <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.email}</div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-600">{item.message}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(item._id, 'inprogress')} title="In Progress" className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"><Clock size={16} /></button>
                      <button onClick={() => updateStatus(item._id, 'resolved')} title="Resolve" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle size={16} /></button>
                      <button onClick={() => updateStatus(item._id, 'closed')} title="Close" className="p-1.5 text-slate-400 hover:bg-slate-100 rounded"><XCircle size={16} /></button>
                      <button onClick={() => deleteFeedback(item._id)} title="Delete" className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-center gap-2">
          {[...Array(data.totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => setFilters({...filters, page: i + 1})}
              className={`px-3 py-1 rounded-md text-sm font-bold ${filters.page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}