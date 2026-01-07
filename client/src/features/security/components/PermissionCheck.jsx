import React, { useState, useRef } from 'react';
import { Camera, Mic, Check, AlertTriangle, ShieldCheck, ArrowRight, VideoOff } from 'lucide-react';

const PermissionCheck = ({ onPermissionsGranted, onCancel, isMonitoringRequired }) => {
  const [status, setStatus] = useState({ camera: 'pending', mic: 'pending' });
  const [stream, setStream] = useState(null);
  const [hasConsented, setHasConsented] = useState(false);
  const videoRef = useRef(null);

  const requestPermissions = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      if (videoRef.current) videoRef.current.srcObject = userStream;
      setStatus({ camera: 'granted', mic: 'granted' });
      setHasConsented(true); 
    } catch (err) {
        //alert(err);
      setStatus({ camera: 'denied', mic: 'denied' });
      // Handle different error types
      let errorMessage = "Camera/Microphone access is required for this assessment.";
      
      if (err.name === 'NotAllowedError') {
        errorMessage = "Camera and microphone access denied. Please allow permissions in your browser settings and refresh the page.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "No camera or microphone found. Please connect a camera and microphone to continue.";
      } else if (err.name === 'NotReadableError') {
        errorMessage = "Camera or microphone is already in use by another application. Please close other applications and try again.";
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = "Camera settings not supported. Please try with a different camera.";
      } else if (err.name === 'SecurityError') {
        errorMessage = "Camera access blocked due to security settings. Please use HTTPS or check your browser security settings.";
      }

      
      // Show alert with instructions
      alert(
        `⚠️ Camera/Microphone Access Required\n\n${errorMessage}\n\n` +
        `How to fix:\n` +
        `1. Click the camera icon in your browser's address bar\n` +
        `2. Select "Allow" for camera and microphone\n` +
        `3. Refresh this page\n\n` +
        `Or go to browser Settings → Privacy → Camera/Microphone`
      );      
    }
  };

  const handleProceed = (monitoringActive) => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    onPermissionsGranted(monitoringActive);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-2xl max-w-sm mx-auto border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-gray-900">Assessment Security</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
         This assessment supports <strong>Active Monitoring</strong> to verify candidate integrity.
      </p>
      {/* Mini Preview Area */}
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-scroll-y mb-3 border border-gray-200">
        {status.camera === 'granted' ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
            <VideoOff className="w-8 h-8 mb-1 opacity-20" />
            <p className="text-[10px] uppercase tracking-wider">Camera Off</p>
          </div>
        )}
      </div>

      {/* Status Badges */}
      <div className="flex gap-2 mb-4">
        <StatusBadge label="Camera" active={status.camera === 'granted'} />
        <StatusBadge label="Mic" active={status.mic === 'granted'} />
      </div>

      {/* Consent & Warning Box */}
      <div className={`p-3 rounded-xl border mb-4 transition-colors ${hasConsented ? 'bg-indigo-50 border-indigo-100' : 'bg-orange-50 border-orange-100'}`}>
        <div className="flex gap-2">
          <input
            id="consent"
            type="checkbox"
            checked={hasConsented}
            onChange={(e) => setHasConsented(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-indigo-600 rounded cursor-pointer"
          />
          <label htmlFor="consent" className="cursor-pointer">
            <span className="block text-xs font-bold text-gray-900">Enable Identity Verification</span>
            <p className="text-[11px] text-gray-600 mt-0.5 leading-tight">
              {hasConsented 
                ? "Monitoring enabled. Your session will be verified." 
                : "Proceeding without camera will mark your test as 'Unverified'."}
            </p>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {status.camera !== 'granted' ? (
          <>
            <button
              onClick={requestPermissions}
              className="w-full py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> Enable Camera
            </button>
            
            {!isMonitoringRequired && (
              <button
                onClick={() => handleProceed(false)}
                className="w-full py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Skip & Proceed Unverified
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => handleProceed(true)}
            disabled={!hasConsented}
            className="w-full py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> Start Verified Test
          </button>
        )}
        <button onClick={onCancel} className="w-full text-[11px] text-gray-400 hover:text-gray-600 text-center font-medium">
          Cancel and Return
        </button>
      </div>
    </div>
  );
};

const StatusBadge = ({ label, active }) => (
  <div className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-md border text-[10px] font-bold uppercase ${active ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'}`} />
    {label}
  </div>
);
export default PermissionCheck;