/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowLeft, 
  Search, 
  Megaphone, 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  Clock, 
  Plus, 
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Home,
  User,
  Menu
} from 'lucide-react';
import { INITIAL_NOTICES } from '../data';

interface NoticeBoardViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
  role: string | null;
}

export default function NoticeBoardView({
  language,
  setScreen,
  role,
}: NoticeBoardViewProps) {
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  // Filter notices
  const filteredNotices = notices.filter((notice) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      notice.title.toLowerCase().includes(q) || 
      notice.titleMr.includes(q) || 
      notice.content.toLowerCase().includes(q) || 
      notice.contentMr.includes(q);
    const matchesTag = filterTag === 'all' || notice.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  const getTagColor = (tag: string) => {
    if (tag === 'urgent') return 'bg-red-50 text-red-600 border-red-200';
    if (tag === 'academic') return 'bg-blue-50 text-blue-900 border-blue-200';
    return 'bg-yellow-50 text-yellow-800 border-yellow-200';
  };

  const getTagIcon = (tag: string) => {
    if (tag === 'urgent') return <AlertTriangle size={14} />;
    if (tag === 'academic') return <BookOpen size={14} />;
    return <Calendar size={14} />;
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 grid grid-cols-1 md:grid-cols-12 gap-6">
      
      {/* Main Notice Board Area (Left Column - 8 grid slots) */}
      <section className="md:col-span-8 space-y-6">
        
        {/* Navigation header back */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <button 
            onClick={() => {
              if (role === 'admin') setScreen('admin_dashboard');
              else if (role === 'teacher') setScreen('teacher_attendance');
              else if (role === 'parent') setScreen('parent_dashboard');
              else setScreen('login');
            }}
            className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← {language === 'mr' ? 'मागे जा' : 'Back'}
          </button>
          <span className="text-xs font-bold text-gray-500 uppercase">
            {language === 'mr' ? 'शाळा नोटीस बोर्ड' : 'School Bulletin'}
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="font-extrabold text-2xl text-blue-950 flex items-center gap-2">
            <Megaphone size={24} className="text-blue-900 shrink-0" />
            <span>{language === 'mr' ? 'शाळा नोटीस बोर्ड' : 'School Notice Board'}</span>
          </h2>
          <p className="text-xs text-gray-500 font-semibold">
            {language === 'mr' ? 'महत्वाच्या घोषणा आणि परिपत्रके' : 'Official announcements and urgent circulars'}
          </p>
        </div>

        {/* Search & Filter Options */}
        <div className="space-y-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'शोधा...' : 'Search circulars...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-900 focus:ring-0 outline-none transition-all"
            />
          </div>

          {/* Tags Filter Row */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'urgent', 'academic', 'holiday'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3.5 py-2 rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-wide shrink-0 transition-all ${
                  filterTag === tag
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id}
              className="bg-white rounded-2xl border border-gray-250 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {notice.tag === 'urgent' && (
                <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600"></div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase border ${getTagColor(notice.tag)}`}>
                  {getTagIcon(notice.tag)}
                  <span>{notice.tag}</span>
                </span>
                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-0.5">
                  <Clock size={10} />
                  {notice.postedAgo}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-blue-950">
                {language === 'mr' ? notice.titleMr : notice.title}
              </h3>
              
              <p className="text-xs text-gray-600 font-semibold leading-relaxed mt-2">
                {language === 'mr' ? notice.contentMr : notice.content}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100 border-dashed mt-4 text-[10px] text-gray-400 font-bold">
                <span>Ref: IGEP/2023/{notice.id.toUpperCase()}</span>
                <span>Date: {notice.date}</span>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-150">
              <p className="text-gray-400 text-sm">No notifications match your filtering rules.</p>
            </div>
          )}
        </div>
      </section>

      {/* Right Sidebar Widgets (4 grid slots) */}
      <section className="md:col-span-4 space-y-6">
        
        {/* Gallery Preview Box */}
        <div 
          onClick={() => setScreen('gallery')}
          className="bg-blue-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden group cursor-pointer border border-blue-950"
        >
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-850/20 rounded-full blur-xl pointer-events-none transition-transform group-hover:scale-110"></div>
          <h3 className="font-bold text-base text-yellow-400">School Photo Gallery</h3>
          <p className="text-xs text-blue-100 opacity-90 leading-relaxed mt-2">
            Explore images from our sports tournaments, annual exhibitions, and academic assemblies.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold bg-white text-blue-900 px-3 py-1.5 rounded-lg shadow-sm">
            <span>Explore Album</span>
            <ChevronRight size={14} />
          </span>
        </div>

        {/* Contact info widget */}
        <div className="bg-white p-5 rounded-2xl border border-gray-250 shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-blue-950 border-b border-gray-100 pb-2">
            School Office Contacts
          </h4>
          <div className="space-y-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-900" />
              <span>+91 20 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-blue-900" />
              <span>office@igeschool.edu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile nav bar spacing */}
      <div className="h-16 md:hidden"></div>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            if (role === 'admin') setScreen('admin_dashboard');
            else if (role === 'teacher') setScreen('teacher_attendance');
            else if (role === 'parent') setScreen('parent_dashboard');
            else setScreen('login');
          }}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
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
          onClick={() => setScreen('gallery')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <BookOpen size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Gallery</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Megaphone size={18} />
          <span className="text-[10px] mt-0.5 font-bold">News</span>
        </button>
      </nav>
    </main>
  );
}
