import React, { useState } from 'react';
import { Rocket, ChevronDown } from 'lucide-react';
import API_BASE from '@/config/API_BASE';


export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'General Feedback',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if(formData.message.trim() === '' || formData.name.trim() === '' || formData.email.trim() === '') return;

    setStatus({ loading: true, success: false });

    try {
      const response = await fetch(API_BASE.FEEDBACK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        console.log("Feedback submitted successfully:", result);
        setStatus({ loading: false, success: true });
        setFormData({ name: '', email: '', type: 'General Feedback', message: '' });
        //setTimeout(() => setStatus({ loading: false, success: false }), 5000);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus({ loading: false, success: false });
    }
  };

  return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-blue-50">
        {/* Sidebar - Compact for smaller laptop screens */}
        <div className="md:w-1/3 bg-indigo-600 p-6 md:p-8 text-white flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Feedback</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Your insights help us build the future of verified hiring.
          </p>
        </div>
        
        {/* Form Body - Grid optimized for 13.5" laptops */}
        <form onSubmit={submitFeedback} className="md:w-2/3 p-6 md:p-8 space-y-4">
          {status.success && (
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">
              Feedback received! Thank you for your support.
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 ml-1">Full Name</label>
              <input 
                name="name" type="text" required 
                value={formData.name} onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
              <input 
                name="email" type="email" required 
                value={formData.email} onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Inquiry Type</label>
            <div className="relative">
              <select 
                name="type" value={formData.type} onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
              >
                <option>Inquiry </option>
                <option>General Feedback</option>
                <option>Report a Bug</option>
                <option>Feature Request</option>
                <option>Partnership Inquiry</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Your Message</label>
            <textarea 
              name="message" required rows="3" 
              value={formData.message} onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" disabled={status.loading}
            className="w-full sm:w-auto px-10 py-3 bg-slate-900 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
          >
            {status.loading ? 'Processing...' : 'Submit Feedback'} <Rocket size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}