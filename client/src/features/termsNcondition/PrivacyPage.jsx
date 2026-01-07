import React from 'react';
import { Shield, Eye, Database, Cpu, Trash2, UserCheck } from 'lucide-react'; 

const PrivacyPage = () => {
  const sections = [
    {
      title: "1. Data Collection",
      icon: <Database className="w-6 h-6 text-blue-600" />,
      content: "We collect information you provide directly to us, including your CV, contact details, work history, and skills. We also collect technical data such as IP addresses and device information via our CDN."
    },
    {
      title: "2. AI Processing & Matching",
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      content: "Our AI systems analyze your profile to match you with relevant job opportunities. This includes parsing text, calculating match scores, and ranking applications based on merit and job requirements."
    },
    {
      title: "3. Automated Decisions",
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      content: "While AI helps in shortlisting, Jobleet maintains human oversight. You have the right to request a manual review of any automated decision that significantly affects your application status."
    },
    {
      title: "4. Your GDPR Rights",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      content: "Under GDPR, you have the right to access your data, correct inaccuracies, and request data portability. You can also withdraw consent for AI processing at any time."
    },
    {
      title: "5. Data Retention & Deletion",
      icon: <Trash2 className="w-6 h-6 text-blue-600" />,
      content: "We store your data for as long as your account is active. If you request account deletion, we purge your data from our servers and Cloud Storage buckets within 30 days."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            How Jobleet protects your data and manages AI transparency.
          </p>
          <div className="mt-2 text-sm text-gray-400">Effective: January 2026</div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            At Jobleet, your privacy is our priority. This policy explains how we collect, 
            use, and protect your personal information in compliance with the **General 
            Data Protection Regulation (GDPR)** and the **EU AI Act**.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex gap-5">
              <div className="flex-shrink-0">{section.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Contact */}
        <div className="mt-12 p-8 bg-blue-400 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Questions about your data?</h2>
          <p className="mb-6">Our Data Protection Officer is ready to help you exercise your rights.</p>
          <a 
            href="mailto:admin@jobleet.com" 
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Contact DPO
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;