/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId, Student } from '../types';
import { Search, Info, CheckSquare, Square, Banknote, QrCode, CreditCard, Receipt, Home, Bell, User, Menu, School } from 'lucide-react';

interface FeesCollectionViewProps {
  language: Language;
  students: Student[];
  setScreen: (screen: ScreenId) => void;
  setRole: (role: any) => void;
}

export default function FeesCollectionView({
  language,
  students,
  setScreen,
  setRole,
}: FeesCollectionViewProps) {
  // Pre-select Aryan Rajesh Shinde (s24) for demo high fidelity
  const defaultStudent = students.find((s) => s.id === 's24') || students[0];
  const [selectedStudent, setSelectedStudent] = useState<Student>(defaultStudent);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'cheque'>('cash');
  const [processing, setProcessing] = useState(false);

  // Categories Checked state
  const [tuitionChecked, setTuitionChecked] = useState(true);
  const [transportChecked, setTransportChecked] = useState(true);
  const [examChecked, setExamChecked] = useState(true);

  // Search filter
  const searchResults = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return q !== '' && (s.name.toLowerCase().includes(q) || s.rollNo.includes(q));
  });

  // Calculate dynamic fees
  const tuitionFee = 6000;
  const transportFee = 1500;
  const examFee = 1000;

  let totalAmount = 0;
  if (tuitionChecked) totalAmount += tuitionFee;
  if (transportChecked) totalAmount += transportFee;
  if (examChecked) totalAmount += examFee;

  const handleProcessPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(
        language === 'mr'
          ? `यशस्वी! ₹${totalAmount.toLocaleString('en-IN')} चे शुल्क भरले गेले आहे आणि पावती व्युत्पन्न केली आहे.`
          : `Success! Payment of ₹${totalAmount.toLocaleString('en-IN')} has been processed via ${paymentMethod.toUpperCase()} and receipt generated.`
      );
    }, 1500);
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Top Navigation Back link */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'डॅशबोर्डवर जा' : 'Back to Dashboard'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'शुल्क संकलन' : 'Fees Module'}
        </span>
      </div>

      {/* Page Title */}
      <div>
        <h2 className="font-bold text-xl text-blue-950">
          {language === 'mr' ? 'शुल्क संकलन (Fees Collection)' : 'Fees Collection'}
        </h2>
        <p className="text-xs text-gray-500 font-semibold">
          {language === 'mr' ? 'विद्यार्थी फी संकलन केंद्र' : 'Indira Gandhi School Fee Collection Center'}
        </p>
      </div>

      {/* Student Search Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 relative">
        <label className="text-xs font-bold text-gray-400 block mb-1" htmlFor="student-search">
          {language === 'mr' ? 'विद्यार्थी शोधा (Search Student)' : 'Search Student'}
        </label>
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            id="student-search"
            placeholder={language === 'mr' ? 'हजेरी क्रमांक किंवा विद्यार्थ्याचे नाव टाका...' : 'Enter Roll No or Student Name...'}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-900 focus:ring-0 outline-none transition-all"
          />
        </div>

        {/* Live Search dropdown suggestions */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl z-50 divide-y max-h-48 overflow-y-auto">
            {searchResults.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedStudent(s);
                  setSearchQuery('');
                  setShowDropdown(false);
                }}
                className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center text-xs"
              >
                <div>
                  <p className="font-bold text-gray-800">{s.name}</p>
                  <p className="text-gray-400">Roll: {s.rollNo} | Class: {s.class}</p>
                </div>
                <span className="font-bold text-blue-900">Select →</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selected Student Card */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-blue-900 p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-white">
                <img 
                  className="w-full h-full object-cover" 
                  alt={selectedStudent.name} 
                  src={selectedStudent.photoUrl} 
                />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-base leading-tight">{selectedStudent.name}</h3>
                <p className="text-[11px] opacity-90 font-semibold">Roll: {selectedStudent.rollNo} | Class: {selectedStudent.class}</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 border-dashed">
                <span className="text-xs font-bold text-gray-500">
                  {language === 'mr' ? 'एकूण थकबाकी' : 'Total Outstanding'}
                </span>
                <span className="text-base font-extrabold text-red-600">
                  ₹{selectedStudent.outstandingFees.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-800 bg-yellow-50 p-2.5 rounded-lg text-xs font-semibold">
                <Info size={16} className="shrink-0" />
                <span>Fees due for 2nd Term and Transport</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Selection */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-blue-950">
              {language === 'mr' ? 'शुल्क श्रेणी निवडा (Select Fee Categories)' : 'Select Fee Categories'}
            </h4>
            <div className="space-y-3">
              {/* Fee Item 1 */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setTuitionChecked(!tuitionChecked)}
                    className="text-blue-900 outline-none"
                  >
                    {tuitionChecked ? <CheckSquare size={20} className="fill-current text-blue-900 text-white" /> : <Square size={20} />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Term 2 Tuition Fee</p>
                    <p className="text-[10px] text-gray-400 font-semibold">सत्र २ शैक्षणिक शुल्क</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-blue-900">₹6,000</span>
              </label>

              {/* Fee Item 2 */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setTransportChecked(!transportChecked)}
                    className="text-blue-900 outline-none"
                  >
                    {transportChecked ? <CheckSquare size={20} className="fill-current text-blue-900 text-white" /> : <Square size={20} />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Transport Fee (Nov)</p>
                    <p className="text-[10px] text-gray-400 font-semibold">वाहतूक शुल्क (नोव्हेंबर)</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-blue-900">₹1,500</span>
              </label>

              {/* Fee Item 3 */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setExamChecked(!examChecked)}
                    className="text-blue-900 outline-none"
                  >
                    {examChecked ? <CheckSquare size={20} className="fill-current text-blue-900 text-white" /> : <Square size={20} />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Exam Fee</p>
                    <p className="text-[10px] text-gray-400 font-semibold">परीक्षा शुल्क</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-blue-900">₹1,000</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Summary & Method */}
      <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              {language === 'mr' ? 'एकूण निवडलेली रक्कम' : 'Total Selected Amount'}
            </p>
            <p className="text-2xl font-extrabold text-blue-950">
              ₹{totalAmount.toLocaleString('en-IN')}.00
            </p>
          </div>
          <div className="space-y-1 flex-1 max-w-md">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              {language === 'mr' ? 'पेमेंट पद्धत' : 'Payment Method'}
            </p>
            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                  paymentMethod === 'cash' 
                    ? 'bg-white shadow-sm text-blue-900' 
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <Banknote size={14} />
                <span>Cash</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                  paymentMethod === 'upi' 
                    ? 'bg-white shadow-sm text-blue-900' 
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <QrCode size={14} />
                <span>UPI</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('cheque')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                  paymentMethod === 'cheque' 
                    ? 'bg-white shadow-sm text-blue-900' 
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <CreditCard size={14} />
                <span>Cheque</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleProcessPayment}
          disabled={processing}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] border border-yellow-300"
        >
          {processing ? (
            <div className="w-5 h-5 border-2 border-blue-950/30 border-t-blue-950 rounded-full animate-spin"></div>
          ) : (
            <Receipt size={16} />
          )}
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-sm">Process Payment & Generate Receipt</span>
            <span className="text-[10px] font-semibold opacity-85">पेमेंट प्रक्रिया करा आणि पावती तयार करा</span>
          </div>
        </button>
      </section>

      {/* Mobile Footer Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 md:hidden shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
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
          onClick={() => setScreen('admin_dashboard')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <Menu size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Menu</span>
        </button>
      </nav>
    </main>
  );
}
