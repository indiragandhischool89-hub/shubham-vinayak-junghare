/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId, Student } from '../types';
import { 
  PhoneCall, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  GraduationCap,
  Megaphone,
  User,
  Home,
  Bell,
  Menu
} from 'lucide-react';

interface ParentDashboardProps {
  language: Language;
  students: Student[];
  setScreen: (screen: ScreenId) => void;
  setRole: (role: any) => void;
}

export default function ParentDashboard({
  language,
  students,
  setScreen,
  setRole,
}: ParentDashboardProps) {
  // Pre-select Aryan Sharma (s12) or general parent student
  const parentStudent = students.find((s) => s.id === 's12') || students[0];

  const [homeworkSubmitted, setHomeworkSubmitted] = useState<Record<string, boolean>>({
    'hw1': false,
    'hw2': true,
  });

  const handleHomeworkSubmit = (id: string) => {
    setHomeworkSubmitted({
      ...homeworkSubmitted,
      [id]: true
    });
    alert(
      language === 'mr'
        ? 'गृहपाठ यशस्वीरित्या सबमिट करण्यात आला आहे!'
        : 'Homework assignment has been submitted successfully to the class teacher.'
    );
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-6 mb-24 space-y-6">
      
      {/* Student Profile Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Abstract background circles */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-800/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt={parentStudent.name} 
              src={parentStudent.photoUrl} 
            />
          </div>
          <div>
            <h2 className="font-extrabold text-lg md:text-xl leading-tight">
              {parentStudent.name}
            </h2>
            <p className="text-xs text-blue-200 mt-1 font-semibold">
              Class {parentStudent.class} • Roll No: {parentStudent.rollNo} • GR: {parentStudent.grNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 z-10">
          <button 
            onClick={() => alert('Dialing Class Teacher Mrs. Meenakshi Sharma (+91 98765 43210)')}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-extrabold px-4 py-2.5 rounded-xl shadow-sm text-xs cursor-pointer border border-yellow-300 transition-transform active:scale-95"
          >
            <PhoneCall size={14} />
            <span>Contact Teacher</span>
          </button>
          <button 
            onClick={() => setScreen('parent_timetable')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-transform active:scale-95 border border-white/10"
          >
            <Calendar size={14} />
            <span>School Calendar</span>
          </button>
        </div>
      </div>

      {/* Grid: 3 Columns for stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attendance SVG Ring Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-250 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Attendance / उपस्थिती
          </h3>
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                className="text-gray-100" 
                strokeWidth="10" 
                stroke="currentColor" 
                fill="transparent" 
                r="38" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-green-500" 
                strokeWidth="10" 
                strokeDasharray="238.7" 
                strokeDashoffset="23.87" // 90% complete
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="38" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-blue-950">90%</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase">Attended</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-semibold mt-1">Excellent! Consistent attendance.</p>
        </div>

        {/* Fees Status Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-250 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Fees Status / शुल्क स्थिती
            </h3>
            <div className="flex items-center gap-2 mt-4">
              <CheckCircle size={28} className="text-emerald-500 fill-current text-white" />
              <div>
                <p className="text-lg font-black text-blue-950">PAID</p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Term 1 Fees Cleared</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
            <span className="text-gray-500 font-semibold">Term 2 Due: ₹{parentStudent.outstandingFees.toLocaleString('en-IN')}</span>
            <button 
              onClick={() => {
                setRole('admin');
                setScreen('admin_fees_collection');
              }}
              className="text-blue-900 font-extrabold hover:underline"
            >
              Pay Now →
            </button>
          </div>
        </div>

        {/* Academic Profile */}
        <div className="bg-white p-6 rounded-2xl border border-gray-250 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Academic Grade
            </h3>
            <div className="flex items-center gap-2 mt-4">
              <GraduationCap size={28} className="text-blue-900" />
              <div>
                <p className="text-2xl font-black text-blue-950">{parentStudent.overallGrade}</p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">Subject Average: A+</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setScreen('parent_results')}
            className="w-full py-2.5 rounded-xl bg-gray-100 text-blue-900 font-bold text-xs flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
          >
            <FileText size={14} />
            <span>View Marksheet</span>
          </button>
        </div>
      </div>

      {/* Middle Grid: Homework & Notice Board */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left: Homework List */}
        <section className="md:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-base text-blue-950 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-900" />
              <span>Homework List / गृहपाठ</span>
            </h3>
            <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full border border-red-200">
              2 Pending
            </span>
          </div>

          <div className="space-y-4">
            {/* HW Item 1 */}
            <div className="p-4 rounded-xl border border-gray-150 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-blue-900 uppercase">Mathematics</span>
                  <h4 className="font-bold text-sm text-gray-800">Solve Exercise 4.2 - Fractions</h4>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-0.5">
                  <Clock size={10} /> Due tomorrow
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <a href="#doc" className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1" onClick={(e)=>e.preventDefault()}>
                  <FileText size={12} /> download_materials.pdf
                </a>
                {homeworkSubmitted['hw1'] ? (
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle size={14} className="fill-current text-emerald-600 text-white" />
                    Submitted
                  </span>
                ) : (
                  <button 
                    onClick={() => handleHomeworkSubmit('hw1')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-3 py-1.5 rounded-lg text-xs font-extrabold border border-yellow-300 transition-transform active:scale-95"
                  >
                    Submit Homework
                  </button>
                )}
              </div>
            </div>

            {/* HW Item 2 */}
            <div className="p-4 rounded-xl border border-gray-150 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-blue-900 uppercase">Marathi Language</span>
                  <h4 className="font-bold text-sm text-gray-800">निबंध लेखन - माझा आवडता प्राणी</h4>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-0.5">
                  <Clock size={10} /> Passed
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">No materials attached</span>
                {homeworkSubmitted['hw2'] ? (
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle size={14} className="fill-current text-emerald-600 text-white" />
                    Submitted
                  </span>
                ) : (
                  <button 
                    onClick={() => handleHomeworkSubmit('hw2')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-3 py-1.5 rounded-lg text-xs font-extrabold border border-yellow-300 transition-transform active:scale-95"
                  >
                    Submit Homework
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right: Notices & Board */}
        <section className="md:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-base text-blue-950 flex items-center gap-2">
              <Megaphone size={18} className="text-blue-900" />
              <span>School Notices</span>
            </h3>
            <button 
              onClick={() => setScreen('notice_board')}
              className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-0.5"
            >
              All <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-4 divide-y divide-gray-100">
            <div 
              onClick={() => setScreen('notice_board')}
              className="pt-3 first:pt-0 cursor-pointer hover:bg-gray-50/50 p-2 rounded transition-all"
            >
              <h4 className="font-bold text-xs text-gray-800">Revised School Timings for Winter</h4>
              <p className="text-[11px] text-gray-400 font-semibold mt-1">Due to rising cold school starts 8:30 AM.</p>
              <span className="text-[9px] text-gray-400 font-bold mt-1.5 block">Posted 2 hours ago</span>
            </div>

            <div 
              onClick={() => setScreen('notice_board')}
              className="pt-3 cursor-pointer hover:bg-gray-50/50 p-2 rounded transition-all"
            >
              <h4 className="font-bold text-xs text-gray-800">Diwali Vacation Announcement</h4>
              <p className="text-[11px] text-gray-400 font-semibold mt-1">School remains closed Nov 10 - Nov 25.</p>
              <span className="text-[9px] text-gray-400 font-bold mt-1.5 block">Posted 2 days ago</span>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile nav spacing */}
      <div className="h-16 md:hidden"></div>

      {/* Mobile Navigation Footer (persistent) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('parent_dashboard')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('parent_timetable')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Schedule</span>
        </button>
        <button 
          onClick={() => setScreen('parent_results')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <FileText size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Marks</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Megaphone size={18} />
          <span className="text-[10px] mt-0.5 font-bold">News</span>
        </button>
      </nav>
    </div>
  );
}
