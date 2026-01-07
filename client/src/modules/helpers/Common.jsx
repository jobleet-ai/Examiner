// --- Helper Components ---

import { ChevronDown } from "lucide-react";

// --- Helper Components updated to accept and use inputClass/labelClass ---

export const Section = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 transition-all duration-200 print:hidden">
    <button 
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <ChevronDown 
        size={20} 
        className={`text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    {isOpen && <div className="p-6 animate-fadeIn">{children}</div>}
  </div>
);

export const InputGroup = ({ label, value, onChange, type = "text", placeholder, className = "", inputClass, labelClass }) => (
  <div className={`mb-4 ${className}`}>
    <label className={labelClass}>{label}</label>
    <input 
      type={type} 
      value={value || ''} 
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass} // Using the provided class for consistency
    />
  </div>
);

export const TextAreaGroup = ({ label, value, onChange, placeholder, rows = 3, inputClass, labelClass }) => (
  <div className="mb-4">
    <label className={labelClass}>{label}</label>
    <textarea 
      value={value || ''} 
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} resize-none`} // Using the provided class for consistency
    />
  </div>
);