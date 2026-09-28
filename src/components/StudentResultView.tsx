/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowLeft, 
  ChevronDown, 
  FileDown, 
  Printer, 
  CheckCircle, 
  AlertCircle,
  Home,
  Calendar,
  FileText,
  Megaphone
} from 'lucide-react';

interface StudentResultViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
}

interface SubjectScore {
  name: string;
  nameMr: string;
  maxMarks: number;
  minPass: number;
  obtained: number;
  grade: string;
}

export default function StudentResultView({
  language,
  setScreen,
}: StudentResultViewProps) {
  const [examType, setExamType] = useState('Unit Test I');
  const [downloading, setDownloading] = useState(false);

  // Score details for Aryan Rajesh Shinde (Roll 24)
  const scores: SubjectScore[] = [
    { name: 'English (HL)', nameMr: 'इंग्रजी (प्रथम भाषा)', maxMarks: 50, minPass: 18, obtained: 46, grade: 'O' },
    { name: 'Mathematics', nameMr: 'गणित', maxMarks: 50, minPass: 18, obtained: 49, grade: 'O' },
    { name: 'Marathi Language', nameMr: 'मराठी भाषा', maxMarks: 50, minPass: 18, obtained: 45, grade: 'A+' },
    { name: 'General Science', nameMr: 'सामान्य विज्ञान', maxMarks: 50, minPass: 18, obtained: 44, grade: 'A+' },
    { name: 'Social Studies', nameMr: 'सामाजिक शास्त्र', maxMarks: 50, minPass: 18, obtained: 48, grade: 'O' },
  ];

  const totalMax = scores.reduce((acc, curr) => acc + curr.maxMarks, 0);
  const totalObtained = scores.reduce((acc, curr) => acc + curr.obtained, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(1);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(
        language === 'mr'
          ? 'निकालपत्रक यशस्वीरित्या डाऊनलोड झाले आहे.'
          : 'Official signed PDF report card (Marksheet) has been downloaded successfully.'
      );
    }, 1500);
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 space-y-6">
      
      {/* Back button header */}
      <nav className="flex justify-between items-center border-b border-gray-100 pb-3">
        <button 
          onClick={() => setScreen('parent_dashboard')}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'पालक पोर्टल' : 'Back to Parent Portal'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'निकालपत्रक' : 'Result Portal'}
        </span>
      </nav>

      {/* Title & Exam Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl text-blue-950">
            {language === 'mr' ? 'घटक निकाल' : 'Examination Results'}
          </h2>
          <p className="text-xs text-gray-500 font-semibold">
            Aryan Rajesh Shinde • Roll: 24 • Class: 4th - Section B
          </p>
        </div>

        <div className="relative w-full md:w-54 shrink-0">
          <select 
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full h-11 bg-white border-2 border-gray-200 rounded-xl px-3 pr-8 text-xs font-bold text-gray-700 focus:border-blue-900 focus:ring-0 appearance-none outline-none"
          >
            <option>Unit Test I</option>
            <option>Unit Test II</option>
            <option>Semester I</option>
            <option>Semester II</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Metrics Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-950 text-white p-5 rounded-3xl shadow-lg">
        <div className="text-center md:border-r md:border-white/10 py-1">
          <p className="text-[10px] text-blue-200 font-bold uppercase">Marks Obtained</p>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-white">{totalObtained} / {totalMax}</h3>
        </div>
        <div className="text-center md:border-r md:border-white/10 py-1">
          <p className="text-[10px] text-blue-200 font-bold uppercase">Percentage</p>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-yellow-400">{percentage}%</h3>
        </div>
        <div className="text-center md:border-r md:border-white/10 py-1">
          <p className="text-[10px] text-blue-200 font-bold uppercase">Attendance</p>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-white">95.0%</h3>
        </div>
        <div className="text-center py-1">
          <p className="text-[10px] text-blue-200 font-bold uppercase">Rank in Class</p>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-yellow-400">02 / 45</h3>
        </div>
      </section>

      {/* Subject Report Table */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50/50 border-b border-gray-150">
          <h3 className="font-extrabold text-sm text-blue-950">Subject-wise Performance</h3>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="bg-gray-100 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-3">Subject Name / विषय</th>
                <th className="px-4 py-3 text-center">Max Marks</th>
                <th className="px-4 py-3 text-center">Passing</th>
                <th className="px-4 py-3 text-center">Obtained</th>
                <th className="px-4 py-3 text-center">Grade</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {scores.map((score, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{score.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">{score.nameMr}</p>
                  </td>
                  <td className="px-4 py-4 text-center">{score.maxMarks}</td>
                  <td className="px-4 py-4 text-center">{score.minPass}</td>
                  <td className="px-4 py-4 text-center text-blue-900 font-black">{score.obtained}</td>
                  <td className="px-4 py-4 text-center text-amber-600 font-bold">{score.grade}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-200">
                      <CheckCircle size={10} className="fill-current text-green-700" />
                      Pass
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two Column Footer: Teacher Remarks & Performance Chart */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Remarks */}
        <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <h4 className="font-extrabold text-sm text-blue-955 border-b border-gray-100 pb-2">
            Class Teacher's Remarks (शिक्षक अभिप्राय)
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-semibold italic">
            "Aryan is an exceptionally bright and diligent student. His analytical skills in Mathematics and creative writing in English are outstanding. Consistent effort!"
          </p>
          <div className="pt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-900">
              MS
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Mrs. Meenakshi Sharma</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Class 4th-B Tutor</p>
            </div>
          </div>
        </div>

        {/* Dynamic bar chart with custom CSS flex values */}
        <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h4 className="font-extrabold text-sm text-blue-955 border-b border-gray-100 pb-2">
            Subject Performance Curve
          </h4>
          
          <div className="space-y-3 pt-2">
            {scores.map((score, idx) => {
              const pct = (score.obtained / score.maxMarks) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-700">{score.name}</span>
                    <span className="text-blue-900 font-bold">{score.obtained} / 50</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-900 rounded-full" 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Download Floating / CTA Button */}
      <div className="flex justify-center pt-2">
        <button 
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-extrabold rounded-xl shadow-lg border border-yellow-300 transition-all active:scale-95 text-xs cursor-pointer"
        >
          {downloading ? (
            <div className="w-3.5 h-3.5 border-2 border-blue-950/30 border-t-blue-950 rounded-full animate-spin"></div>
          ) : (
            <Printer size={14} />
          )}
          <span>Download Marksheet (PDF)</span>
        </button>
      </div>

      {/* Mobile nav bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('parent_dashboard')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('parent_timetable')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Schedule</span>
        </button>
        <button 
          onClick={() => setScreen('parent_results')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <FileText size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Marks</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Megaphone size={18} />
          <span className="text-[10px] mt-0.5 font-bold">News</span>
        </button>
      </nav>
    </main>
  );
}
