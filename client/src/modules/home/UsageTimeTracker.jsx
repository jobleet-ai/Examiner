import { useState, useEffect, useRef } from 'react';

export function UsageTimeTracker({ isLoggedIn = false }) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const TIME_AFTER = 120; // seconds after which to show the timer
  const MAX_TIME = 5 * 60; // 5 minutes in seconds

  useEffect(() => {
    // Don't run timer if user is logged in
    if (isLoggedIn) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Start tracking time
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeElapsed(elapsed);

      // Redirect when time limit is reached
      if (elapsed >= MAX_TIME) {
        clearInterval(intervalRef.current);
        window.location.href = '/login';
      }
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoggedIn]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate percentage for progress bar
  const percentage = Math.min((timeElapsed / MAX_TIME) * 100, 100);

  // Don't show timer if user is logged in
  if (isLoggedIn) {
    return null;
  }

  return (!isLoggedIn && timeElapsed > TIME_AFTER &&
    <div className="fixed top-32 right-4 sm:top-16 bg-white shadow-xl rounded-lg p-4 border-2 border-red-400 z-50 w-72">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-red-100 rounded-full p-2">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-700">Browsing Time</div>
          <div className="text-2xl font-bold text-red-600">{formatTime(timeElapsed)}</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-xs text-gray-600 text-center">
        {timeElapsed >= MAX_TIME ? (
          <span className="text-red-600 font-semibold">Redirecting to login...</span>
        ) : (
          <span>Login required after 5 minutes</span>
        )}
      </div>
    </div>
  );
}
