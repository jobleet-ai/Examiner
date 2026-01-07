import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle, XCircle, Clock, Search, 
  ChevronLeft, ChevronRight, Eye, MessageSquare, ShieldAlert, 
  ExternalLink
} from 'lucide-react';
import API_BASE from '@/config/API_BASE';
import { getItem } from '@/tokenUtils';
import { showErrorToast, showSuccessToast } from '@/modules/utils/toastMsg';
import { Link } from 'react-router-dom';

const AdminVerificationDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); // For viewing details

  const fetchRequests = async (page = 1) => {
    setLoading(true);
    try {
      // API call to the backend we defined earlier
      const res = await axios.get(`${API_BASE.JOBS_ENDPOINT}/admin/pending-verifications?page=${page}&query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${getItem('token')}` }
      });
      setRequests(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total
      });
    } catch (err) {
      showErrorToast("Failed to load verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [searchQuery]);

  const handleAction = async (jobId, action, notes = "") => {
    try {
      const endpoint = action === 'approve' 
        ? `${API_BASE.JOBS_ENDPOINT}/admin/verify-job/${jobId}` 
        : `${API_BASE.JOBS_ENDPOINT}/admin/reject-job/${jobId}`;
      
      const res = await axios.patch(endpoint, { adminNotes: notes }, {
        headers: { Authorization: `Bearer ${getItem('token')}` }
      });

      if (res.data.success) {
        showSuccessToast(res.data.message);
        fetchRequests(pagination.page); // Refresh list
        setSelectedJob(null);
      }
    } catch (err) {
      showErrorToast("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="text-blue-600" />
              Job Verification Center
            </h1>
            <p className="text-slate-500">Review and activate job postings requested by recruiters.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by company or title..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Review</p>
              <Clock className="text-amber-500" />
            </div>
            <p className="text-4xl font-black text-slate-800 mt-2">{pagination.total}</p>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Recruiter & Company</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Job Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Request Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading requests...</td></tr>
                ) : requests.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No pending verification requests found.</td></tr>
                ) : requests.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{job.recruiterId?.name || 'Unknown'}</span>
                        <span className="text-xs text-slate-500">{job.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{job.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase">
                        {job.adminReviewData?.type || 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(job.adminReviewData?.requestedAt).toLocaleDateString()}
                    </td>
                    {/* <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleAction(job._id, 'approve')}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td> */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* NEW: View Live Link Button */}
                        <Link 
                          to={`/jobs/${job.slug}-${job._id}?status=view`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Live Posting"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>

                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details/Notes"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        <button 
                          onClick={() => handleAction(job._id, 'approve')}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition"
                          title="Approve Now"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Showing <span className="font-bold">{requests.length}</span> of {pagination.total} requests
            </span>
            <div className="flex gap-2">
              <button 
                disabled={pagination.page === 1}
                onClick={() => fetchRequests(pagination.page - 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                disabled={pagination.page * pagination.limit >= pagination.total}
                onClick={() => fetchRequests(pagination.page + 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-black text-slate-800">Review Request</h2>
              <button onClick={() => setSelectedJob(null)}><XCircle className="text-slate-300 hover:text-slate-500" /></button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recruiter Note</p>
                <p className="text-slate-700 italic flex gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400 shrink-0" />
                  "{selectedJob.adminReviewData?.description || 'No reason provided.'}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Job ID</p>
                  <p className="font-mono text-slate-600">{selectedJob._id}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Experience Required</p>
                  <p className="text-slate-600">{selectedJob.experience}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => handleAction(selectedJob._id, 'approve')}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95"
                >
                  APPROVE POSTING
                </button>
                <button 
                  onClick={() => handleAction(selectedJob._id, 'reject', 'Does not meet guidelines')}
                  className="flex-1 py-4 bg-rose-50 text-rose-600 border border-rose-100 font-bold rounded-2xl hover:bg-rose-100 transition-all active:scale-95"
                >
                  REJECT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerificationDashboard;