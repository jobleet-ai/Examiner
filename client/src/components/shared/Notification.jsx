import React from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 ${
      notification.type === 'error' ? 'bg-red-500 text-white' :
      notification.type === 'pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
    }`}>
      {notification.type === 'error' ? <AlertCircle size={20} /> : 
       notification.type === 'pending' ? <Loader className="w-5 h-5 animate-spin" /> : 
       <CheckCircle size={20} />}
      <span className="font-medium">{notification.message}</span>
    </div>
  );
};