/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId, Student } from '../types';
import { Users, UploadCloud, Edit3, Filter, Search, CheckCircle2, XCircle, Save, Calendar, GraduationCap, BarChart3, User, Home } from 'lucide-react';

interface TeacherDashboardProps {
  language: Language;
  students: Student[];
  setStudents: (students: Student[]) => void;
  setScreen: (screen: ScreenId) => void;
  setRole: (role: any) => void;
}

export default function TeacherDashboard({
  language,
  students,
  setStudents,
  setScreen,
  setRole,
}: TeacherDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filter students based on search query
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.nameMr.includes(q) || s.rollNo.includes(q);
  });

  const presentCount = students.filter((s) => s.attendance === 'present').length;
  const absentCount = students.filter((s) => s.attendance === 'absent').length;

  const handleToggleAttendance = (id: string, status: 'present' | 'absent') => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, attendance: status } : s))
    );
  };

  const handleSubmitAttendance = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert(
        language === 'mr'
          ? 'उपस्थिती यशस्वीरित्या जतन करण्यात आली आहे!'
          : 'Attendance has been successfully submitted and saved!'
      );
    }, 1200);
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24">
      {/* Header & Quick Actions Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-900" size={24} />
            <h2 className="font-bold text-2xl text-blue-950">
              {language === 'mr' ? 'वर्ग २ रा - तुकडी अ' : 'Class 2nd - Section A'}
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-medium">
            {language === 'mr' 
              ? 'शैक्षणिक वर्ष: २०२३-२४ | एकूण विद्यार्थी: ३२' 
              : 'Academic Year: 2023-24 | Strength: 32 Students'}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
              {presentCount} {language === 'mr' ? 'हजर (Present)' : 'Present'}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-200">
              {absentCount} {language === 'mr' ? 'गैरहजर (Absent)' : 'Absent'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Homework Button */}
          <button 
            onClick={() => setScreen('gallery_upload')}
            className="flex items-center justify-between p-4 bg-yellow-400 text-blue-950 rounded-2xl font-bold shadow-sm hover:translate-x-1 transition-transform duration-200 text-sm cursor-pointer border border-yellow-300"
          >
            <div className="flex items-center gap-2">
              <UploadCloud size={20} />
              <span>{language === 'mr' ? 'गृहपाठ अपलोड' : 'Homework Upload'}</span>
            </div>
            <span className="font-bold text-lg">→</span>
          </button>

          {/* Marks Entry Button */}
          <button 
            onClick={() => setScreen('teacher_marks')}
            className="flex items-center justify-between p-4 bg-blue-900 text-white rounded-2xl font-bold shadow-sm hover:translate-x-1 transition-transform duration-200 text-sm cursor-pointer border border-blue-950"
          >
            <div className="flex items-center gap-2">
              <Edit3 size={20} />
              <span>{language === 'mr' ? 'गुण नोंदणी (Marks Entry)' : 'Marks Entry'}</span>
            </div>
            <span className="font-bold text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Student List Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-blue-950">
          {language === 'mr' ? 'विद्यार्थी उपस्थिती' : 'Student Attendance'}{' '}
          <span className="text-gray-400 font-normal text-sm">
            ({language === 'mr' ? '२ रा - अ' : 'Roll Call'})
          </span>
        </h3>
        <div className="flex gap-2 relative">
          {showSearch && (
            <input
              type="text"
              placeholder={language === 'mr' ? 'शोधा...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-36 sm:w-48 transition-all"
            />
          )}
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <Search size={16} />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="space-y-3">
        {filteredStudents.map((student) => (
          <div 
            key={student.id}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between shadow-sm hover:bg-gray-50/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-150">
                <img 
                  className="w-full h-full object-cover" 
                  alt={student.name} 
                  src={student.photoUrl} 
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-900 tracking-wider block">
                  {language === 'mr' ? `रोल क्र. ${student.rollNo}` : `Roll No. ${student.rollNo}`}
                </span>
                <h4 className="font-semibold text-sm text-gray-900 leading-tight">
                  {student.name}
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  {student.nameMr}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleToggleAttendance(student.id, 'present')}
                className={`px-3 py-2 rounded-lg border-2 font-bold text-xs transition-all flex items-center gap-1 active:scale-95 ${
                  student.attendance === 'present'
                    ? 'bg-green-500 text-white border-green-500 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-500'
                }`}
              >
                <CheckCircle2 size={14} />
                <span>P</span>
              </button>
              <button 
                onClick={() => handleToggleAttendance(student.id, 'absent')}
                className={`px-3 py-2 rounded-lg border-2 font-bold text-xs transition-all flex items-center gap-1 active:scale-95 ${
                  student.attendance === 'absent'
                    ? 'bg-red-500 text-white border-red-500 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <XCircle size={14} />
                <span>A</span>
              </button>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-inner">
            <p className="text-gray-400 text-sm">
              {language === 'mr' ? 'कोणतेही विद्यार्थी आढळले नाहीत.' : 'No students found matching your search.'}
            </p>
          </div>
        )}
      </div>

      {/* Submit Attendance CTA */}
      <div className="mt-6">
        <button 
          onClick={handleSubmitAttendance}
          disabled={submitting}
          className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-blue-950"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          <span>
            {language === 'mr' 
              ? 'उपस्थिती जतन करा (Submit Attendance)' 
              : 'Submit Attendance'}
          </span>
        </button>
      </div>

      {/* Persistent Bottom Mobile Nav Bar (exact replica) */}
      <nav className="fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-100 h-16 flex justify-around items-center px-4 md:hidden shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('teacher_attendance')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('teacher_attendance')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Class</span>
        </button>
        <button 
          onClick={() => setScreen('teacher_marks')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <BarChart3 size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Results</span>
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
      </nav>
    </main>
  );
}
