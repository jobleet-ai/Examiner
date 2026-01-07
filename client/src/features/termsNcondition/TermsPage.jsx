import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-gray-500 mb-8 italic">Last Updated: January 2026</p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">1. Role of AI in Recruitment</h2>
          <p>
            Jobleet utilizes AI to provide match scores. While our AI suggests the best candidates, 
            <strong>human oversight</strong> is always maintained. No candidate is rejected solely 
            by an automated process without the possibility of human review.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">2. User Data & GDPR</h2>
          <p>
            By using Jobleet, you grant us permission to process your data for recruitment purposes. 
            You retain the right to access, export, or delete your data at any time via your 
            <a href="/profile/settings" className="text-blue-600 hover:underline"> account settings</a>.
          </p>

          {/* Add other sections here */}
        </section>
      </article>
    </div>
  );
};

export default TermsPage;