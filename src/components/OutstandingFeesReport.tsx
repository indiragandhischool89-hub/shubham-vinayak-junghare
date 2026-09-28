/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId, Student } from '../types';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  RotateCcw, 
  Send, 
  ChevronDown, 
  FileText, 
  Wallet, 
  TrendingUp, 
  Users, 
  TrendingDown, 
  LineChart,
  Home,
  Bell,
  Menu
} from 'lucide-react';

interface OutstandingFeesReportProps {
  language: Language;
  students: Student[];
  setScreen: (screen: ScreenId) => void;
}

export default function OutstandingFeesReport({
  language,
  students,
  setScreen,
}: OutstandingFeesReportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [feeCategory, setFeeCategory] = useState('All Categories');
  const [exporting, setExporting] = useState(false);
  const [sendingReminderId, setSendingReminder] = useState<string | null>(null);

  // Student specific reminder dates mock
  const [reminderDates, setReminderDates] = useState<Record<string, string>>({
    's1': '12 Oct 2023',
    's2': '--',
    's3': '28 Sep 2023',
    's5': '05 Oct 2023',
    's24': '18 Oct 2023',
  });

  const handleSendReminder = (id: string) => {
    setSendingReminder(id);
    setTimeout(() => {
      setSendingReminder(null);
      const today = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setReminderDates({
        ...reminderDates,
        [id]: today
      });
      alert(
        language === 'mr'
          ? 'स्मरणपत्र यशस्वीरित्या पाठवले गेले आहे!'
          : 'Outstanding fee payment reminder notification has been sent successfully to the parent\'s mobile device.'
      );
    }, 1200);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(
        language === 'mr'
          ? 'अहवाल यशस्वीरित्या पीडीएफ स्वरूपात डाउनलोड झाला आहे.'
          : 'Success: Outstanding Fees Report (PDF) has been generated and downloaded to your device.'
      );
    }, 1500);
  };

  // Filter outstanding students
  const outstandingStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(q) || s.rollNo.includes(q);
    const matchesClass = classFilter === 'All Classes' || s.class === classFilter;
    return s.outstandingFees > 0 && matchesSearch && matchesClass;
  });

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 relative space-y-6">
      
      {/* Top Header */}
      <nav className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setScreen('admin_dashboard')}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors active:scale-95 duration-200"
          >
            <ArrowLeft className="text-blue-900" size={18} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg text-blue-950 leading-tight">Outstanding Fees Report</h1>
            <span className="text-[10px] text-gray-400 font-semibold uppercase">थकीत शुल्क अहवाल</span>
          </div>
        </div>
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-lg font-bold transition-all active:scale-95"
        >
          {language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard'}
        </button>
      </nav>

      {/* Summary Statistics (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Total Outstanding / एकूण थकीत
              </span>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <Wallet size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-950 mt-2">₹4,25,800</h2>
          </div>
          <div className="flex items-center mt-3 text-red-600 gap-1 text-[11px] font-semibold">
            <TrendingUp size={14} />
            <span>12% higher than last month</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Pending Students / थकीत विद्यार्थी
              </span>
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                <Users size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-950 mt-2">142</h2>
          </div>
          <div className="flex items-center mt-3 text-gray-500 gap-1 text-[11px] font-semibold">
            <span>Across 12 classes</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Collection Trend / संकलन कल
              </span>
              <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
                <LineChart size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-950 mt-2">84%</h2>
          </div>
          {/* Mini collection chart simulation */}
          <div className="flex items-end gap-1 h-8 mt-3">
            <div className="bg-blue-100 w-full h-[40%] rounded-t-sm"></div>
            <div className="bg-blue-100 w-full h-[60%] rounded-t-sm"></div>
            <div className="bg-blue-100 w-full h-[55%] rounded-t-sm"></div>
            <div className="bg-blue-100 w-full h-[80%] rounded-t-sm"></div>
            <div className="bg-yellow-400 w-full h-[84%] rounded-t-sm shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">
              Search Student / विद्यार्थी शोधा
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name or Roll No."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-blue-900"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Class / वर्ग</label>
            <select 
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-blue-900"
            >
              <option value="All Classes">All Classes</option>
              <option value="1st-A">1st Grade</option>
              <option value="2nd-A">2nd Grade</option>
              <option value="4-B">4th Grade</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Fee Category / शुल्क प्रकार</label>
            <select 
              value={feeCategory}
              onChange={(e) => setFeeCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg outline-none focus:border-blue-900"
            >
              <option>All Categories</option>
              <option>Tuition Fee</option>
              <option>Transport Fee</option>
              <option>Exam Fee</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-blue-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1 text-xs">
              <Filter size={14} />
              <span>Apply</span>
            </button>
            <button 
              onClick={() => {
                setSearchQuery('');
                setClassFilter('All Classes');
                setFeeCategory('All Categories');
              }}
              className="p-2 border border-gray-250 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Student List Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-blue-950 text-sm md:text-base">
          Student Records / विद्यार्थ्यांच्या नोंदी
        </h3>
        <span className="text-xs text-gray-400 font-semibold">
          Showing {outstandingStudents.length} records
        </span>
      </div>

      {/* Student List - Card Based */}
      <div className="space-y-4">
        {outstandingStudents.map((student) => {
          const initials = student.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
          const rDate = reminderDates[student.id] || '--';
          const isSending = sendingReminderId === student.id;

          return (
            <div 
              key={student.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-sm shrink-0 border border-blue-200">
                  {initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-blue-950 leading-tight">{student.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Roll No: #{student.rollNo} • Class: {student.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-1 md:text-right">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Outstanding Amount</p>
                  <p className="text-sm font-extrabold text-red-600">₹{student.outstandingFees.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Last Reminder</p>
                  <p className="text-xs text-gray-700 font-semibold">{rDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button 
                  onClick={() => alert(`Showing fee ledger details for ${student.name}.`)}
                  className="flex-1 md:flex-none px-4 py-2 text-blue-900 border border-blue-900/20 rounded-lg font-bold hover:bg-blue-50 transition-colors text-xs"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleSendReminder(student.id)}
                  disabled={isSending}
                  className="flex-1 md:flex-none px-4 py-2 bg-yellow-400 text-blue-950 rounded-lg font-bold hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 text-xs border border-yellow-300"
                >
                  {isSending ? (
                    <div className="w-3.5 h-3.5 border-2 border-blue-950/30 border-t-blue-950 rounded-full animate-spin"></div>
                  ) : (
                    <Send size={12} />
                  )}
                  <span>Send Reminder</span>
                </button>
              </div>
            </div>
          );
        })}

        {outstandingStudents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-400 text-sm">No student records found with outstanding fees.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button for Export (as in Screen 9) */}
      <button 
        onClick={handleExport}
        disabled={exporting}
        className="fixed bottom-24 right-4 md:right-10 md:bottom-10 bg-blue-900 text-white p-4 md:px-6 md:py-3.5 rounded-full md:rounded-xl shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-90 z-40 border border-blue-950"
      >
        {exporting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <FileText size={18} className="text-yellow-400" />
        )}
        <span className="hidden md:inline font-bold text-sm">Export Report (PDF/Excel)</span>
      </button>

      {/* Mobile spacer */}
      <div className="h-16 md:hidden"></div>

      {/* Mobile bottom nav bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-35 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('admin_outstanding_fees')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Wallet size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Fees</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Bell size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Alerts</span>
        </button>
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="flex flex-col items-center justify-center text-gray-400"
        >
          <Menu size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Menu</span>
        </button>
      </nav>
    </main>
  );
}
