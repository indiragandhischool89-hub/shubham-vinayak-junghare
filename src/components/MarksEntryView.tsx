/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId, Student } from '../types';
import { Search, ChevronDown, CheckCircle, AlertTriangle, HelpCircle, Save, Send, Home, Bell, Edit3, Menu, RotateCcw } from 'lucide-react';

interface MarksEntryViewProps {
  language: Language;
  students: Student[];
  setStudents: (students: Student[]) => void;
  setScreen: (screen: ScreenId) => void;
}

export default function MarksEntryView({
  language,
  students,
  setStudents,
  setScreen,
}: MarksEntryViewProps) {
  const [examType, setExamType] = useState('Unit Test I');
  const [subject, setSubject] = useState('Mathematics (गणित)');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Filter students to show Class 2nd-A students as demo
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (s.name.toLowerCase().includes(q) || s.nameMr.includes(q) || s.rollNo.includes(q)) &&
      s.class === '2nd-A'
    );
  });

  const handleMarkChange = (id: string, value: string) => {
    const numericVal = value === '' ? null : Math.min(50, Math.max(0, parseInt(value) || 0));
    setStudents(
      students.map((s) => (s.id === id ? { ...s, marks: numericVal } : s))
    );
  };

  const studentsWithMarks = filteredStudents.filter((s) => s.marks !== null);
  const enteredCount = studentsWithMarks.length;
  const totalCount = filteredStudents.length;

  const averageMarks = enteredCount > 0
    ? (studentsWithMarks.reduce((acc, curr) => acc + (curr.marks || 0), 0) / enteredCount).toFixed(1)
    : '0.0';

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert(
        language === 'mr'
          ? `घटक चाचणी १ (गणित) चे निकाल प्रशासक पोर्टलवर यशस्वीरित्या सबमिट केले आहेत!`
          : `Results for ${examType} (${subject}) have been successfully submitted to the administrator portal.`
      );
    }, 1500);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 mt-6 pb-28">
      {/* Selection Area & Filters */}
      <section className="mb-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Exam Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">
                {language === 'mr' ? 'परीक्षा प्रकार (Exam Type)' : 'Exam Type'}
              </label>
              <div className="relative">
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg px-3 text-sm focus:border-blue-900 focus:ring-0 appearance-none outline-none font-medium text-gray-800"
                >
                  <option>Unit Test I</option>
                  <option>Unit Test II</option>
                  <option>Semester I</option>
                  <option>Semester II (Final)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Subject Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">
                {language === 'mr' ? 'विषय (Subject)' : 'Subject'}
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg px-3 text-sm focus:border-blue-900 focus:ring-0 appearance-none outline-none font-medium text-gray-800"
                >
                  <option>Mathematics (गणित)</option>
                  <option>Marathi (मराठी)</option>
                  <option>English (इंग्रजी)</option>
                  <option>Science (विज्ञान)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Box */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">
                {language === 'mr' ? 'शोध (Search Student)' : 'Search Student'}
              </label>
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'mr' ? 'नाव किंवा हजेरी क्रमांक...' : 'Roll No or Name...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg pl-10 pr-4 text-sm focus:border-blue-900 focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
              <p className="text-sm font-semibold text-blue-900">
                {language === 'mr' ? 'वर्ग: ४ था - तुकडी अ' : 'Class: 4th - Division A'}
              </p>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 rounded-full">
              <p className="text-xs font-bold text-blue-900">
                {language === 'mr' ? 'एकूण गुण: ५०' : 'Total Marks: '}<span className="text-sm">50</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Results Entry List */}
      <section className="space-y-4">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-2">Roll No</div>
          <div className="col-span-6">Student Name</div>
          <div className="col-span-4 text-right pr-6">Marks Obtained</div>
        </div>

        {/* Student Cards */}
        <div className="space-y-3">
          {filteredStudents.map((student) => {
            const isFailing = student.marks !== null && student.marks !== undefined && student.marks < 18;
            const hasMarks = student.marks !== null && student.marks !== undefined;

            return (
              <div
                key={student.id}
                className={`bg-white border rounded-2xl p-4 flex flex-col md:grid md:grid-cols-12 items-center gap-4 shadow-sm hover:shadow-md transition-all group ${
                  isFailing 
                    ? 'border-red-300 bg-red-50/10' 
                    : hasMarks 
                      ? 'border-green-300' 
                      : 'border-gray-200'
                }`}
              >
                {/* Roll No */}
                <div className="col-span-2 flex items-center justify-center md:justify-start w-full md:w-auto">
                  <span className="bg-gray-100 text-blue-900 font-bold w-10 h-10 rounded-lg flex items-center justify-center text-sm">
                    {student.rollNo}
                  </span>
                </div>

                {/* Name */}
                <div className="col-span-6 w-full text-center md:text-left">
                  <h3 className="font-bold text-sm text-blue-950">{student.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{student.nameMr}</p>
                </div>

                {/* Mark Input */}
                <div className="col-span-4 w-full flex items-center justify-center md:justify-end gap-3">
                  <div className="relative w-32">
                    <input
                      type="number"
                      max={50}
                      min={0}
                      placeholder="--"
                      value={student.marks ?? ''}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      className={`w-full h-11 text-center text-lg font-bold border-2 rounded-lg focus:ring-0 transition-colors bg-gray-50 outline-none ${
                        isFailing
                          ? 'border-red-500 bg-red-100/30 text-red-700'
                          : 'border-gray-200 focus:border-blue-900'
                      }`}
                    />
                    <span className={`absolute -bottom-5 left-0 right-0 text-center text-[9px] font-bold uppercase tracking-tight ${
                      isFailing ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {isFailing ? 'Failing' : 'Marks'}
                    </span>
                  </div>
                  <div className="text-gray-500 font-bold text-base">/ 50</div>

                  {/* Status Indicator Icon */}
                  <div className="ml-4">
                    {isFailing ? (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-red-600 bg-red-100">
                        <AlertTriangle size={16} />
                      </div>
                    ) : hasMarks ? (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-green-600 bg-green-50">
                        <CheckCircle size={16} className="fill-current text-green-600" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 bg-gray-100">
                        <HelpCircle size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pagination View More */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 text-blue-900 font-bold px-6 py-2 rounded-full border-2 border-blue-900/10 hover:bg-blue-50 transition-all active:scale-95 text-xs">
          <span>Show More Students</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Sticky Bottom Footer Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/80 shadow-2xl py-4 px-4 z-40">
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                {language === 'mr' ? 'विद्यार्थी प्रविष्टी (Students Entry)' : 'Students Entry'}
              </span>
              <p className="text-sm font-bold text-blue-950">
                {enteredCount.toString().padStart(2, '0')} / {totalCount.toString().padStart(2, '0')} Entered
              </p>
            </div>
            <div className="h-10 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                {language === 'mr' ? 'सरासरी गुण (Average Marks)' : 'Average Marks'}
              </span>
              <p className="text-sm font-bold text-blue-950">{averageMarks} / 50.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setScreen('teacher_attendance')}
              className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-all text-xs"
            >
              {language === 'mr' ? 'मसुदा जतन करा' : 'Save Draft'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-[2] md:flex-none bg-yellow-400 text-blue-950 font-extrabold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-2 border border-yellow-300"
            >
              <Send size={14} />
              <span>
                {language === 'mr' 
                  ? 'निकाल जतन करा आणि सबमिट करा' 
                  : 'Save & Submit Results'}
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile navigation menu spacer */}
      <div className="h-16 md:hidden"></div>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-20 left-4 right-4 bg-blue-950 text-white rounded-2xl flex justify-around items-center h-14 px-4 shadow-2xl z-40">
        <button 
          onClick={() => setScreen('teacher_attendance')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Home size={16} />
          <span className="text-[9px] font-semibold mt-0.5">Home</span>
        </button>
        <button 
          onClick={() => setScreen('teacher_attendance')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Bell size={16} />
          <span className="text-[9px] font-semibold mt-0.5">Alerts</span>
        </button>
        <button 
          onClick={() => setScreen('teacher_marks')}
          className="flex flex-col items-center justify-center text-yellow-400"
        >
          <Edit3 size={16} />
          <span className="text-[9px] font-bold mt-0.5">Marks</span>
        </button>
        <button 
          onClick={() => setScreen('teacher_attendance')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Menu size={16} />
          <span className="text-[9px] font-semibold mt-0.5">Menu</span>
        </button>
      </nav>
    </div>
  );
}
