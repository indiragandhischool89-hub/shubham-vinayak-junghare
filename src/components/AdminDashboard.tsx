/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, ScreenId } from '../types';
import { 
  Users, 
  UserPlus, 
  User,
  CreditCard, 
  BookOpen, 
  Megaphone, 
  TrendingUp, 
  School, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  BookMarked,
  Award,
  ChevronRight,
  Shield,
  Settings,
  LogOut,
  MapPin,
  Bell,
  Menu,
  Home
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
  setRole: (role: any) => void;
}

export default function AdminDashboard({
  language,
  setScreen,
  setRole,
}: AdminDashboardProps) {
  return (
    <div className="flex flex-col lg:flex-row max-w-[1140px] mx-auto min-h-screen">
      
      {/* Desktop Sidebar (As seen in Screen 2) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white py-6 px-4 gap-6 shrink-0">
        <div className="px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-white">
              <School size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-blue-950">Indira Gandhi School</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Admin Portal v1.0.2</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setScreen('admin_dashboard')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold bg-blue-50 text-blue-900 text-left transition-colors"
          >
            <School size={16} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setScreen('parent_timetable')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-blue-950 text-left transition-colors"
          >
            <Calendar size={16} />
            <span>Academic Calendar</span>
          </button>
          <button 
            onClick={() => setScreen('admin_outstanding_fees')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-blue-950 text-left transition-colors"
          >
            <CreditCard size={16} />
            <span>Fee Structure</span>
          </button>
          <button 
            onClick={() => setScreen('notice_board')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-blue-950 text-left transition-colors"
          >
            <Megaphone size={16} />
            <span>Notice Board</span>
          </button>
          <button 
            onClick={() => setScreen('gallery')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-blue-950 text-left transition-colors"
          >
            <BookOpen size={16} />
            <span>School Gallery</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-150">
          <button 
            onClick={() => alert('Settings module ready. Database configurations loaded.')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-blue-950 text-left transition-colors mb-2"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-gray-800 truncate">Admin User</p>
              <button 
                onClick={() => {
                  setRole(null);
                  setScreen('login');
                }}
                className="text-[9px] text-red-600 font-extrabold uppercase hover:underline"
              >
                Logout
              </button>
            </div>
            <LogOut 
              size={14} 
              className="text-gray-400 hover:text-red-600 cursor-pointer" 
              onClick={() => {
                setRole(null);
                setScreen('login');
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 pb-24 lg:pb-12 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-blue-950">
            {language === 'mr' ? 'प्रशासक डॅशबोर्ड' : 'Admin Dashboard'}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-semibold">
            {language === 'mr' ? 'इंदिरा गांधी स्कूल व्यवस्थापन' : 'Indira Gandhi English Primary School Management'}
          </p>
        </div>

        {/* Bento Grid Summary Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                {language === 'mr' ? 'एकूण विद्यार्थी (Total Students)' : 'Total Students'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mt-1">1,240</h2>
            </div>
            <div className="mt-3 flex items-center text-green-600 gap-1">
              <TrendingUp size={14} />
              <span className="text-[10px] font-bold">4% from last term</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                {language === 'mr' ? 'एकूण शिक्षक (Total Teachers)' : 'Total Teachers'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mt-1">48</h2>
            </div>
            <div className="mt-3 flex items-center text-gray-500 gap-1">
              <Users size={14} className="text-blue-900" />
              <span className="text-[10px] font-bold">All departments active</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between border-l-4 border-l-yellow-400 hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                {language === 'mr' ? 'आजची उपस्थिती (Today\'s Attendance)' : 'Today\'s Attendance'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mt-1">92%</h2>
            </div>
            <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-blue-900 p-5 rounded-2xl shadow-md flex flex-col justify-between text-white hover:brightness-105 transition-all">
            <div>
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                {language === 'mr' ? 'संकलित शुल्क (Fees Collected)' : 'Fees Collected'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">₹4.2L</h2>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-blue-100 text-[10px]">
              <Calendar size={14} className="text-yellow-400" />
              <span className="font-bold">Current Month</span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="font-bold text-lg text-blue-950 mb-4">
            {language === 'mr' ? 'त्वरित कृती' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setScreen('admin_admission_form')}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-95 duration-200 gap-2 shadow-sm"
            >
              <UserPlus className="text-blue-900" size={24} />
              <span className="text-xs font-bold text-blue-950">New Admission</span>
            </button>
            <button 
              onClick={() => setScreen('admin_fees_collection')}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-95 duration-200 gap-2 shadow-sm"
            >
              <CreditCard className="text-blue-900" size={24} />
              <span className="text-xs font-bold text-blue-950">Fees Collection</span>
            </button>
            <button 
              onClick={() => setScreen('admin_outstanding_fees')}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-95 duration-200 gap-2 shadow-sm"
            >
              <BookMarked className="text-blue-900" size={24} />
              <span className="text-xs font-bold text-blue-950">Class Management</span>
            </button>
            <button 
              onClick={() => setScreen('notice_board')}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-95 duration-200 gap-2 shadow-sm"
            >
              <Megaphone className="text-blue-900" size={24} />
              <span className="text-xs font-bold text-blue-950">Notice Board</span>
            </button>
          </div>
        </section>

        {/* Two Column Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Recent Notices (Asymmetric 7-column) */}
          <section className="md:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-base text-blue-950">
                {language === 'mr' ? 'अलीकडील सूचना' : 'Recent Notices'}
              </h3>
              <button 
                onClick={() => setScreen('notice_board')}
                className="text-xs font-bold text-blue-900 hover:underline"
              >
                {language === 'mr' ? 'सर्व पहा' : 'View All'}
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              <div 
                onClick={() => setScreen('notice_board')}
                className="p-5 hover:bg-gray-50/50 transition-colors cursor-pointer flex gap-4"
              >
                <div className="min-w-[40px] h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900">
                  <School size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Independence Day Celebration</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    Cultural programs will start at 8:00 AM. Attendance is mandatory for all students and staff.
                  </p>
                  <span className="text-[10px] text-gray-400 font-semibold mt-2 block flex items-center gap-1">
                    <Clock size={10} />
                    Posted 2 hours ago
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setScreen('notice_board')}
                className="p-5 hover:bg-gray-50/50 transition-colors cursor-pointer flex gap-4"
              >
                <div className="min-w-[40px] h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-800">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Unit Test-I Results</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    Results for classes V to VIII have been published. Please check the student portal.
                  </p>
                  <span className="text-[10px] text-gray-400 font-semibold mt-2 block flex items-center gap-1">
                    <Clock size={10} />
                    Posted Yesterday
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setScreen('notice_board')}
                className="p-5 hover:bg-gray-50/50 transition-colors cursor-pointer flex gap-4"
              >
                <div className="min-w-[40px] h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">School Bus Route Update</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    Route 4 will be delayed by 15 minutes due to road maintenance near the station.
                  </p>
                  <span className="text-[10px] text-gray-400 font-semibold mt-2 block flex items-center gap-1">
                    <Clock size={10} />
                    Posted 2 days ago
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Exams (Asymmetric 5-column) */}
          <section className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-base text-blue-950 mb-4">
                {language === 'mr' ? 'आगामी परीक्षा' : 'Upcoming Exams'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="bg-blue-900 text-white p-2 rounded text-center min-w-[54px] shadow-sm">
                    <span className="block text-[8px] font-bold uppercase text-blue-200">Oct</span>
                    <span className="block text-base font-extrabold leading-none mt-0.5">12</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-800">Mid-Term Finals</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Class I - Class IV</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="bg-blue-950 text-white p-2 rounded text-center min-w-[54px] shadow-sm">
                    <span className="block text-[8px] font-bold uppercase text-blue-200">Oct</span>
                    <span className="block text-base font-extrabold leading-none mt-0.5">15</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-800">Oral Assessments</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">English & Marathi</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>
              </div>
              <button 
                onClick={() => setScreen('parent_timetable')}
                className="w-full mt-4 py-2.5 rounded-lg bg-gray-100 text-blue-900 font-bold hover:bg-gray-200 transition-all text-xs"
              >
                Full Exam Schedule
              </button>
            </div>

            {/* Admin Insight Card */}
            <div className="relative overflow-hidden rounded-2xl h-44 group shadow-md border border-gray-200/50">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="School Library" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeePMs-IWjBC_nYirkChXD7mveV5xWNlxjWm3j7g_dLfnVlzkrOx_dPmr-ajGkT1GYbUqzElUDyzhGQcOqEGXDy9ipWri2agv_MaoLdbmEhQLrkvdtxt0LIQzUtx6-pTs-O4PdxLksLo-Bs6T5PqJpyypn0HTpw4C6A-4T0-u0TQ8zuVPGzrv4CbX5z_7LFJbzULEp6iZdJ8hBQEJ0A49awaChDha4fC6fVVGJcNd5L_ZW1QHfHF0wrhXphlDhWr-OOqPYS-IMjMsf"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                <h4 className="font-bold text-sm">Academic Year Progress</h4>
                <p className="text-[10px] opacity-90 font-medium">Term 1 is 65% complete</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Footer Navigation Bar (consistent tabs) */}
      <nav className="md:hidden fixed bottom-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Bell size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Alerts</span>
        </button>
        <button 
          onClick={() => {
            setRole('parent');
            setScreen('parent_dashboard');
          }}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <User size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Profile</span>
        </button>
        <button 
          onClick={() => alert('Mobile menu list loaded: Support, Settings, Reports.')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Menu size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Menu</span>
        </button>
      </nav>
    </div>
  );
}
