import React, { useEffect, useRef, useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, User as UserIcon, ArrowLeft, ShieldCheck, Building2, X } from 'lucide-react';
import axios from 'axios';
import { API } from '@/config/apiService';
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom"; 

import { isAuth, setItem } from "@/auth/tokenUtils";
import { setLoggedIn } from "../state/action-creators/profile";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../utils/toastMsg";
import API_BASE from '@/config/API_BASE';
import { getItem, removeItem } from '@/tokenUtils';
import TermsService from '../info/TermsService';
import PrivacyPolicy from '../info/PrivacyPolicy';
import TermsPage from '@/features/termsNcondition/TermsPage';
import PrivacyPage from '@/features/termsNcondition/PrivacyPage';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [agreed, setAgreed] = useState(false);
  const resetToken = searchParams.get('token'); // Detect token from admin@jobleet.com email link

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); 
  const [isResettingPassword, setIsResettingPassword] = useState(!!resetToken);
  const [modalContent, setModalContent] = useState(null); // 'terms' | 'privacy' | null


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailInputRef = useRef(null);

  const token = useSelector(state => state.profile.profile.token);
  const from = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: '',
    email: getItem("rememberedEmail") || '',
    password: '',
    role: 'jobseeker',
    company: '', // New field for recruiter company
    rememberMe: !!getItem("rememberedEmail"),
    rememberedEmail: getItem("rememberedEmail") || ''
  });

  const [resetEmail, setResetEmail] = useState('');
  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!isForgotPassword && !isResettingPassword) {
      emailInputRef.current?.focus();
    }
  }, [isForgotPassword, isSignUp, isResettingPassword]);

  // Email domain validation function
  const validateEmailDomain = (email, company) => {
    if (!email || !company) return false;
    
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const companyName = company.toLowerCase().replace(/\s+/g, '');
    
    // Check if email domain contains part of the company name
    // or company name contains part of the email domain
    const domainParts = emailDomain?.split('.')[0]; // Get the main domain without TLD
    
    return domainParts?.includes(companyName.substring(0, Math.min(4, companyName.length))) ||
           companyName.includes(domainParts?.substring(0, Math.min(4, domainParts?.length || 0)));
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleResetInputChange = (e) => {
    setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate company field for recruiter signup
    if (isSignUp && formData.role === 'recruiter') {
      if (!formData.company.trim()) {
        return showErrorToast("Company name is required for recruiters", 3000);
      }
      
      // Validate email domain matches company
      // if (!validateEmailDomain(formData.email, formData.company)) {
      //   return showErrorToast("Email domain should match your company name", 4000);
      // }
    }
    
    let api = isSignUp ? API.register : API.login;
    let succMSG = isSignUp ? 'Signup Success' : 'Login Success';
    
    const authData = {
      'email': formData.email,
      'password': formData.password,
      'role': formData.role, 
      'name' : formData.name,
      'agreed': agreed,
      ...(formData.role === 'recruiter' && { 'company': formData.company })
    };

    axios.post(api, authData)
      .then((response) => {
        setItem("token", response.data.data.token);
        setItem("role", response.data.data.user.role);
        setItem("email", response.data.data.user.email);
        setItem("name", response.data.data.user.name);
        setItem("agreed", response.data.data.user.agreed);

        if (response.data.data.user.company) {
          setItem("company", response.data.data.user.company);
        }
        // REMEMBER ME LOGIC
        if (formData.rememberMe) {
          setItem("rememberedEmail", formData.email);
        } else {
          removeItem("rememberedEmail");
        }
        dispatch(setLoggedIn(isAuth()));
        showSuccessToast(succMSG);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Authentication Failed";
        showErrorToast(msg, 3000);
      });
  };

  const handleRequestReset = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE.AUTH}/reset-password`, { email: resetEmail })
      .then(() => {
        showSuccessToast("A password reset link has been sent to your email from admin@jobleet.com", 5000);
        setIsForgotPassword(false);
      })
      .catch((err) => {
        showErrorToast(err.response?.data?.message || "Failed to send reset email", 5000);
      });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPasswordData.password !== newPasswordData.confirmPassword) {
      return showErrorToast("Passwords do not match!");
    }

    axios.post(`${API_BASE.AUTH}/update-password`, { 
      token: resetToken, 
      password: newPasswordData.password 
    })
    .then(() => {
      showSuccessToast("Password updated! You can now sign in.");
      setIsResettingPassword(false);
      navigate('/login', { replace: true });
    })
    .catch((err) => {
      showErrorToast(err.response?.data?.message || "Reset link expired or invalid", 5000);
    });
  };

  const renderResetPasswordForm = () => (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">New Password</h1>
        <p className="text-gray-600">Please enter your new secure password.</p>
      </div>
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password" name="password" value={newPasswordData.password} onChange={handleResetInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••" required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password" name="confirmPassword" value={newPasswordData.confirmPassword} onChange={handleResetInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••" required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition-transform">
          Reset Password
        </button>
      </form>
    </>
  );

  const renderAuthForm = () => (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        <p className="text-gray-600">{isSignUp ? 'Sign up to get started' : 'Sign in to continue'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe" required={isSignUp}
                />
              </div>
            </div>
            <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
                <div className="flex space-x-6">
                    <label className="flex items-center text-gray-600 cursor-pointer">
                        <input type="radio" name="role" value="jobseeker" checked={formData.role === 'jobseeker'} onChange={handleInputChange} className="mr-2 text-blue-600" />
                        <UserIcon className="w-4 h-4 mr-1 text-blue-500" /> Jobseeker
                    </label>
                    <label className="flex items-center text-gray-600 cursor-pointer">
                        <input type="radio" name="role" value="recruiter" checked={formData.role === 'recruiter'} onChange={handleInputChange} className="mr-2 text-purple-600" />
                        <Briefcase className="w-4 h-4 mr-1 text-purple-500" /> Recruiter
                    </label>
                </div>
            </div>

            {/* Company field - only for recruiters */}
            {formData.role === 'recruiter' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your Company Name" 
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your email domain should match your company name
                </p>
              </div>
            )}
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email" name="email" ref={emailInputRef} value={formData.email} onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com" required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••" required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {!isSignUp && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2 rounded text-blue-600 border-gray-300" 
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button type="button" onClick={() => setIsForgotPassword(true)} className="text-blue-600 font-medium hover:underline">
              Forgot password?
            </button>
          </div>
          
        )}

        {isSignUp && 
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <input 
              type="checkbox" 
              id="terms" 
              required 
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <button 
                  type="button"
                  onClick={() => setModalContent('terms')}
                  className="font-bold text-blue-700 underline hover:text-blue-800"
                >
                  Terms of Service
                </button>{" "}
                and acknowledge the{" "}
                <button 
                  type="button"
                  onClick={() => setModalContent('privacy')}
                  className="font-bold text-blue-700 underline hover:text-blue-800"
                >
                  Privacy Policy
                </button>{" "}
                regarding AI-based data processing.
            </label>
          </div>
        }


        <button type="submit" disabled={!agreed&&isSignUp} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition-transform">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 font-medium hover:underline">
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
        <div className="mb-4">
            <button onClick={() => setIsForgotPassword(false)} className="text-gray-600 hover:text-gray-800 flex items-center mb-4">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Sign In
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h1>
            <p className="text-gray-600 text-center">Enter your email to receive a reset link from admin@jobleet.com.</p>
        </div>
        <form onSubmit={handleRequestReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@example.com" required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:scale-105 shadow-lg">
              Send Reset Link
            </button>
        </form>

    </>
  );

  return (token ? <Navigate to={from} replace /> :
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl mt-4 p-8">
          {isResettingPassword ? renderResetPasswordForm() : (isForgotPassword ? renderForgotPasswordForm() : renderAuthForm())}
        </div>
      </div>
  {modalContent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-blue-100">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900">
          {modalContent === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
        </h3>
        <button 
          onClick={() => setModalContent(null)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-8 overflow-y-auto text-gray-600 leading-relaxed text-sm">
        {modalContent === 'terms' ? (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-tight">AI Verification Protocols</h4>
            <p>By using Jobleet, you agree to our AI-proctored verification loop as described in our core features.</p>
              <TermsPage/>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-tight">Data Processing</h4>
            <p>We process resume data to generate bias-free signals and ranked shortlists for recruiters.</p>
              <PrivacyPage/>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 text-right">
        <button 
          onClick={() => setModalContent(null)}
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
        >
          I Understand
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}