/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowLeft, 
  Printer, 
  BookOpen, 
  Calculator, 
  Languages, 
  FlaskConical, 
  Globe, 
  Coffee,
  Calendar,
  Home,
  FileText,
  Megaphone
} from 'lucide-react';
import { MONDAY_PERIODS } from '../data';

interface TimetableViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
}

export default function TimetableView({
  language,
  setScreen,
}: TimetableViewProps) {
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const [downloading, setDownloading] = useState(false);

  const days = [
    { key: 'Mon', label: 'Mon (सोम)' },
    { key: 'Tue', label: 'Tue (मंगळ)' },
    { key: 'Wed', label: 'Wed (बुध)' },
    { key: 'Thu', label: 'Thu (गुरू)' },
    { key: 'Fri', label: 'Fri (शुक्र)' },
    { key: 'Sat', label: 'Sat (शनि)' },
  ];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(
        language === 'mr'
          ? 'वेळापत्रक पीडीएफ स्वरूपात यशस्वीरित्या डाऊनलोड झाले आहे.'
          : 'Success: Class Timetable PDF has been downloaded.'
      );
    }, 1500);
  };

  const getSubjectIcon = (iconName: string) => {
    if (iconName === 'Book') return <BookOpen size={18} className="text-blue-900" />;
    if (iconName === 'Calculator') return <Calculator size={18} className="text-amber-600" />;
    if (iconName === 'Languages') return <Languages size={18} className="text-indigo-600" />;
    if (iconName === 'FlaskConical') return <FlaskConical size={18} className="text-emerald-600" />;
    return <Globe size={18} className="text-pink-600" />;
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 space-y-6">
      
      {/* Navigation header */}
      <nav className="flex justify-between items-center border-b border-gray-100 pb-3">
        <button 
          onClick={() => setScreen('parent_dashboard')}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'पालक डॅशबोर्ड' : 'Back to Parent Portal'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'वेळापत्रक' : 'Timetable Module'}
        </span>
      </nav>

      {/* Page Title */}
      <div>
        <h2 className="font-extrabold text-xl text-blue-950">
          {language === 'mr' ? 'वर्ग वेळापत्रक' : 'Class Timetable'}
        </h2>
        <p className="text-xs text-gray-500 font-semibold">
          Class 4th - Section A • Room No: 104
        </p>
      </div>

      {/* Day Selector Tabs (Mon - Sat) */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => (
          <button
            key={day.key}
            onClick={() => setSelectedDay(day.key)}
            className={`px-4 py-3 rounded-xl font-bold text-xs shrink-0 transition-all active:scale-95 border cursor-pointer ${
              selectedDay === day.key
                ? 'bg-blue-900 text-white border-blue-950 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Periods / Timeline List */}
      <section className="space-y-4">
        {MONDAY_PERIODS.map((period, idx) => {
          return (
            <div key={idx} className="space-y-4">
              {/* Recess Slot display after period 2 */}
              {period.periodNum === 3 && (
                <div className="flex items-center gap-4 bg-yellow-50 border border-yellow-200 p-3.5 rounded-xl text-yellow-800 shadow-inner">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Coffee size={18} className="text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Recess & Lunch Break (मध्यंतर सुट्टी)</h4>
                    <p className="text-[10px] text-yellow-700 font-semibold mt-0.5">10:00 AM - 10:15 AM</p>
                  </div>
                </div>
              )}

              {/* Subject Period card */}
              <div 
                className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-blue-300 transition-all"
                style={{ borderLeftWidth: '5px', borderLeftColor: period.color }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    {getSubjectIcon(period.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full">
                        Period {period.periodNum}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">{period.time}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-gray-900 mt-1 leading-none">{period.subject}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-none">{period.subjectMr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t sm:border-t-0 border-gray-100 pt-2.5 sm:pt-0">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center text-[10px] font-extrabold shadow-sm shrink-0">
                    {period.teacherInitials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{period.teacher}</p>
                    <p className="text-[9px] text-gray-400 font-semibold uppercase leading-none mt-0.5">Faculty Room 4</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Download Print Button */}
      <div className="flex justify-center pt-4">
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
          <span>Download Timetable (PDF)</span>
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
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Schedule</span>
        </button>
        <button 
          onClick={() => setScreen('parent_results')}
          className="flex flex-col items-center justify-center text-gray-400"
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
