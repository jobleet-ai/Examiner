import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Section = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 transition-all duration-200">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      </div>
      <ChevronDown
        size={20}
        className={`text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && <div className="p-6 border-t border-gray-100">{children}</div>}
  </div>
);