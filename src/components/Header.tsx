/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, Role, ScreenId } from '../types';
import { GraduationCap, Languages, Shield, User, Users, LogIn } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: Role | null;
  setRole: (role: Role | null) => void;
  screen: ScreenId;
  setScreen: (screen: ScreenId) => void;
}

export default function Header({
  language,
  setLanguage,
  role,
  setRole,
  screen,
  setScreen,
}: HeaderProps) {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  const getRoleLabel = (r: Role) => {
    if (language === 'mr') {
      if (r === 'admin') return 'प्रशासक (Admin)';
      if (r === 'teacher') return 'शिक्षक (Teacher)';
      return 'पालक (Parent)';
    }
    if (r === 'admin') return 'Admin';
    if (r === 'teacher') return 'Teacher';
    return 'Parent';
  };

  return (
    <header className="w-full top-0 sticky z-50 shadow-md bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 max-w-[1140px] mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            if (role) {
              if (role === 'admin') setScreen('admin_dashboard');
              else if (role === 'teacher') setScreen('teacher_attendance');
              else setScreen('parent_dashboard');
            } else {
              setScreen('login');
            }
          }}
        >
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center overflow-hidden shadow-sm">
            <img 
              className="w-full h-full object-cover" 
              alt="IGEP School Logo" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXrbsoM3192aZSTt3QA_VniILjn0JzF4tVIPTb4WZ1GRVb03xMww9liqDHxLz4N935Yoq_tjZdxno21wT_PmCsd1vx7P0XPojAYvtWUWpMyEfo2gjSSMYpkQQG4jtBw1ugDGJRReNHS_i7f-2aAq9N8clQnRAZcsyz_9GILlHgRpZLXwZYzxUM-ZOE5AkVfHAVZW5qlaY5cAKTMcEp35qgYpHA6PXXwX1_12hrZptNM5WFMRkSfpu2OYZZiB3QV8hUfyMj5KxfGbQU"
            />
          </div>
          <div>
            <h1 className="font-bold text-blue-950 text-base md:text-lg leading-tight">
              {language === 'mr' ? 'इंदिरा गांधी इंग्लिश प्रायमरी स्कूल' : 'Indira Gandhi English Primary School'}
            </h1>
            {role && (
              <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1 uppercase tracking-wider">
                {role === 'admin' ? (
                  <Shield size={12} className="text-red-700" />
                ) : role === 'teacher' ? (
                  <GraduationCap size={12} className="text-blue-700" />
                ) : (
                  <User size={12} className="text-amber-700" />
                )}
                {getRoleLabel(role)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Role Switcher (extremely useful for demonstrating multiple views) */}
          {role && (
            <div className="hidden sm:flex items-center gap-1 mr-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">Demo Role:</span>
              {(['admin', 'teacher', 'parent'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    if (r === 'admin') setScreen('admin_dashboard');
                    else if (r === 'teacher') setScreen('teacher_attendance');
                    else setScreen('parent_dashboard');
                  }}
                  className={`text-xs px-2 py-1 rounded font-semibold transition-all ${
                    role === r
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-400 text-blue-950 hover:bg-amber-500 font-bold text-xs md:text-sm active:scale-95 duration-200 shadow-sm border border-amber-300"
          >
            <Languages size={14} />
            <span>{language === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Logout if logged in */}
          {role && (
            <button
              onClick={() => {
                setRole(null);
                setScreen('login');
              }}
              title="Logout"
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LogIn size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Demo Role Bar */}
      {role && (
        <div className="sm:hidden flex items-center justify-center gap-2 bg-gray-50 border-t border-gray-100 py-1.5">
          <span className="text-[9px] uppercase font-bold text-gray-400">Demo Role:</span>
          {(['admin', 'teacher', 'parent'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                if (r === 'admin') setScreen('admin_dashboard');
                else if (r === 'teacher') setScreen('teacher_attendance');
                else setScreen('parent_dashboard');
              }}
              className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                role === r ? 'bg-blue-900 text-white' : 'text-gray-600'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
