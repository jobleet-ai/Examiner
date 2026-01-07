import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('jobleet_cookie_consent');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('jobleet_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-2xl animate-bounce-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          Jobleet uses cookies and AI-driven processing to enhance your recruitment experience. 
          By clicking "Accept All", you agree to our <a href="/privacy" className="underline text-blue-400">Privacy Policy</a>.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setIsVisible(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition">Decline</button>
          <button onClick={acceptConsent} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">Accept All</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;