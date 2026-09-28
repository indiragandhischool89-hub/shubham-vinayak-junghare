/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Role, ScreenId } from '../types';
import { User, Lock, Eye, EyeOff, ShieldCheck, Phone, Mail } from 'lucide-react';

interface LoginViewProps {
  language: Language;
  role: Role | null;
  setRole: (role: Role | null) => void;
  setScreen: (screen: ScreenId) => void;
}

export default function LoginView({
  language,
  setRole,
  setScreen,
}: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('teacher');
  const [username, setUsername] = useState('teacher02');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto pre-fill credentials based on selected role to make testing seamless
  useEffect(() => {
    if (selectedRole === 'admin') {
      setUsername('admin_igep');
    } else if (selectedRole === 'teacher') {
      setUsername('teacher_kulkarni');
    } else {
      setUsername('parent_aryan');
    }
    setPassword('••••••••');
  }, [selectedRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRole(selectedRole);
      if (selectedRole === 'admin') {
        setScreen('admin_dashboard');
      } else if (selectedRole === 'teacher') {
        setScreen('teacher_attendance');
      } else {
        setScreen('parent_dashboard');
      }
    }, 1200);
  };

  return (
    <div className="flex-grow flex items-center justify-center relative px-4 py-12 overflow-hidden bg-gray-50 min-h-[calc(100vh-140px)]">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-200 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-100 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-500 hover:shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
              <img 
                className="w-16 h-16 object-contain" 
                alt="School Crest" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3T6dXxkFfdV9L_eZYP27vmSuQ6RNm5UkYYU-sbjl0SRR9qi6P4dcuDNhA3k0as9tZOA8-995ndve2J4hpkhhdHs1qRIa3oKNbt2y6kf2h7PMIpiSzotYz_ON0hiJLPZ634NljP_jw2p1BDYmcOxatYuzjBYSy1o68Klf5UF3BQX18R9QLlKIqRZJYO7JXwaGhf74qJ4A2OCI7Jd6r3KAKgBu-RX7RzLGCX-p0npHdLRFZCGe_FljqEgf1mNW5IBiE1YctfUPoNolG"
              />
            </div>
            <h2 className="font-bold text-2xl text-blue-950 text-center">
              {language === 'mr' ? 'स्वागत आहे' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              {language === 'mr' 
                ? 'कृपया पोर्टलमध्ये प्रवेश करण्यासाठी साइन इन करा' 
                : 'Please sign in to access the portal'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} id="login-form">
            {/* Role Selector */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg">
              {(['admin', 'teacher', 'parent'] as Role[]).map((r) => {
                const label = language === 'mr' 
                  ? r === 'admin' ? 'प्रशासक' : r === 'teacher' ? 'शिक्षक' : 'पालक'
                  : r.charAt(0).toUpperCase() + r.slice(1);
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`text-center py-1.5 rounded-md font-semibold text-xs md:text-sm transition-all ${
                      selectedRole === r
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1" htmlFor="username">
                  {language === 'mr' ? 'वापरकर्ता नाव / आयडी' : 'Username / ID'}
                </label>
                <div className="flex items-center px-3 py-2.5 bg-white border border-gray-300 rounded-xl focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900 transition-all">
                  <User size={16} className="text-gray-400 mr-2" />
                  <input 
                    className="bg-transparent border-none p-0 w-full focus:ring-0 text-sm outline-none" 
                    id="username" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your ID" 
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1" htmlFor="password">
                  {language === 'mr' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="flex items-center px-3 py-2.5 bg-white border border-gray-300 rounded-xl focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900 transition-all">
                  <Lock size={16} className="text-gray-400 mr-2" />
                  <input 
                    className="bg-transparent border-none p-0 w-full focus:ring-0 text-sm outline-none" 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-blue-900 ml-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900" 
                  type="checkbox" 
                  defaultChecked
                />
                <span className="text-xs text-gray-500 font-medium">
                  {language === 'mr' ? 'लक्षात ठेवा' : 'Remember me'}
                </span>
              </label>
              <a href="#forgot" className="text-xs text-blue-900 font-bold hover:underline" onClick={(e) => e.preventDefault()}>
                {language === 'mr' ? 'पासवर्ड विसरलात?' : 'Forgot Password?'}
              </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{language === 'mr' ? 'प्रमाणित करत आहे...' : 'Authenticating...'}</span>
                </div>
              ) : (
                <span>
                  {language === 'mr' ? 'पोर्टलवर लॉगिन करा' : 'Login to Portal'}
                </span>
              )}
            </button>
          </form>

          {/* Technical Assistance */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-500 font-semibold">
              {language === 'mr' ? 'तांत्रिक सहाय्य हवे आहे का?' : 'Need technical assistance?'}
            </p>
            <div className="flex gap-6">
              <a 
                href="tel:+912012345678" 
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-900 transition-colors font-medium"
              >
                <Phone size={14} />
                <span>Support</span>
              </a>
              <a 
                href="mailto:it@igeschool.edu" 
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-900 transition-colors font-medium"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Secure Footer */}
        <footer className="mt-8 text-center px-4">
          <div className="flex items-center justify-center gap-1 text-gray-400 text-xs">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span className="font-semibold">Secure 256-bit SSL Encrypted Connection</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 font-medium">
            © 2024 Indira Gandhi English Primary School. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
