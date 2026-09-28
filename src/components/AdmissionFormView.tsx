/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  UploadCloud, 
  Info,
  Home,
  Bell,
  User,
  Menu
} from 'lucide-react';

interface AdmissionFormViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
}

export default function AdmissionFormView({
  language,
  setScreen,
}: AdmissionFormViewProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [address, setAddress] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobile, setMobile] = useState('');
  const [prevSchool, setPrevSchool] = useState('');
  const [lastGrade, setLastGrade] = useState('');
  const [percentage, setPercentage] = useState('');
  const [declaresTrue, setDeclaresTrue] = useState(false);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaresTrue) {
      alert(
        language === 'mr'
          ? 'कृपया माहिती अचूक असल्याची घोषणा स्वीकारण्यासाठी चेकबॉक्सवर खूण करा.'
          : 'Please check the declaration box to confirm that the information provided is accurate.'
      );
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert(
        language === 'mr'
          ? 'प्रवेश अर्ज यशस्वीरित्या सबमिट करण्यात आला आहे! आमचे कार्यालय लवकरच तुमच्याशी संपर्क साधेल.'
          : 'Admission Application Submitted Successfully! Our administrative office will contact you soon.'
      );
      setScreen('admin_dashboard');
    }, 1500);
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 mb-24 space-y-6">
      {/* Top Header Back link */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <button 
          onClick={() => setScreen('admin_dashboard')}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'डॅशबोर्डवर जा' : 'Back to Dashboard'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'प्रवेश अर्ज' : 'Admission Portal'}
        </span>
      </div>

      {/* Welcome Section */}
      <div className="text-center md:text-left space-y-1">
        <h2 className="font-bold text-2xl text-blue-950">
          {language === 'mr' ? 'विद्यार्थी प्रवेश अर्ज' : 'Student Admission Form'}
        </h2>
        <p className="text-sm text-gray-500 font-semibold">
          {language === 'mr' ? 'विद्यार्थी प्रवेश अर्ज - शैक्षणिक वर्ष २०२४-२५' : 'Student Admission Form - Academic Year 2024-25'}
        </p>
      </div>

      {/* Stepper Indicator (Exact replica of Screen 10) */}
      <div className="flex flex-col md:flex-row justify-between gap-4 px-1 bg-white p-4 rounded-2xl border border-gray-150 shadow-sm">
        
        {/* Step 1 */}
        <div className={`flex items-center gap-3 transition-opacity ${currentStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
            currentStep > 1 ? 'bg-yellow-400 text-blue-950' : 'bg-blue-900 text-white'
          }`}>
            {currentStep > 1 ? <Check size={16} /> : '1'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-950">Student Details</span>
            <span className="text-[10px] text-gray-400 font-semibold leading-tight">विद्यार्थ्याची माहिती</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-[2px] bg-gray-200 self-center mx-4"></div>

        {/* Step 2 */}
        <div className={`flex items-center gap-3 transition-opacity ${currentStep === 2 ? 'opacity-100' : currentStep > 2 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border ${
            currentStep > 2 
              ? 'bg-yellow-400 text-blue-950 border-yellow-300' 
              : currentStep === 2 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'bg-gray-100 text-gray-400 border-gray-300'
          }`}>
            {currentStep > 2 ? <Check size={16} /> : '2'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-950">Parent/Guardian</span>
            <span className="text-[10px] text-gray-400 font-semibold leading-tight">पालकांची माहिती</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-[2px] bg-gray-200 self-center mx-4"></div>

        {/* Step 3 */}
        <div className={`flex items-center gap-3 transition-opacity ${currentStep === 3 ? 'opacity-100' : currentStep > 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border ${
            currentStep > 3 
              ? 'bg-yellow-400 text-blue-950 border-yellow-300' 
              : currentStep === 3 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'bg-gray-100 text-gray-400 border-gray-300'
          }`}>
            {currentStep > 3 ? <Check size={16} /> : '3'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-950">Previous School</span>
            <span className="text-[10px] text-gray-400 font-semibold leading-tight">मागील शाळा</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-[2px] bg-gray-200 self-center mx-4"></div>

        {/* Step 4 */}
        <div className={`flex items-center gap-3 transition-opacity ${currentStep === 4 ? 'opacity-100' : 'opacity-40'}`}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border ${
            currentStep === 4 
              ? 'bg-blue-900 text-white border-blue-900' 
              : 'bg-gray-100 text-gray-400 border-gray-300'
          }`}>
            '4'
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-950">Documents</span>
            <span className="text-[10px] text-gray-400 font-semibold leading-tight">कागदपत्रे</span>
          </div>
        </div>
      </div>

      {/* Form Card Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Student Details */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Full Name (विद्यार्थ्याचे पूर्ण नाव) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As per Birth Certificate"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Date of Birth (जन्म तारीख) *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Gender (लिंग) *
                  </label>
                  <select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50 font-medium text-gray-700"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male (मुलगा)</option>
                    <option value="female">Female (मुलगी)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Aadhaar Number (आधार कार्ड क्रमांक) *
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    required
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    placeholder="12 Digit Aadhaar Number"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Permanent Address (कायमचा पत्ता) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat No, Society, Landmark, Pincode"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Parent/Guardian Details */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Father's Name (वडिलांचे नाव) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="First Name Middle Name Surname"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Mother's Name (आईचे नाव) *
                  </label>
                  <input
                    type="text"
                    required
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="Full Name"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Occupation (व्यवसाय)
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Teacher, Business, Farmer"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Mobile Number (मोबाईल नंबर) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Previous School */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Previous School Name (मागील शाळेचे नाव)
                  </label>
                  <input
                    type="text"
                    value={prevSchool}
                    onChange={(e) => setPrevSchool(e.target.value)}
                    placeholder="Full name of the last attended school"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Last Grade Completed (पूर्ण केलेली इयत्ता)
                  </label>
                  <input
                    type="text"
                    value={lastGrade}
                    onChange={(e) => setLastGrade(e.target.value)}
                    placeholder="e.g. 1st Standard"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Percentage/Grade Secured (टक्केवारी)
                  </label>
                  <input
                    type="text"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="e.g. 85% or A+"
                    className="p-3 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents Upload */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* File 1 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Birth Certificate (जन्म दाखला) *
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-900 transition-colors cursor-pointer relative group text-center">
                    <UploadCloud size={32} className="text-blue-900 mb-1" />
                    <p className="text-xs font-bold text-blue-950">Click to upload or drag & drop</p>
                    <p className="text-[10px] text-gray-400 font-semibold">PDF, JPG (Max 2MB)</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                {/* File 2 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500">
                    Leaving Certificate (शाळा सोडल्याचा दाखला)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-900 transition-colors cursor-pointer relative group text-center">
                    <UploadCloud size={32} className="text-blue-900 mb-1" />
                    <p className="text-xs font-bold text-blue-950">Click to upload or drag & drop</p>
                    <p className="text-[10px] text-gray-400 font-semibold">PDF, JPG (Max 2MB)</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-150">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={declaresTrue}
                    onChange={(e) => setDeclaresTrue(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                  />
                  <span className="text-xs text-gray-500 font-semibold leading-relaxed">
                    I hereby declare that the information provided is true and accurate to the best of my knowledge. (मी असे घोषित करतो/करते की वर दिलेली सर्व माहिती माझ्या माहितीनुसार खरी आहे.)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleBack}
              className={`px-5 py-2.5 rounded-full font-bold text-xs text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-1 ${
                currentStep === 1 ? 'invisible' : 'visible'
              }`}
            >
              <ArrowLeft size={14} />
              <span>{language === 'mr' ? 'मागे' : 'Back (मागे)'}</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full font-extrabold text-xs bg-yellow-400 text-blue-950 hover:shadow-md transition-all active:scale-95 flex items-center gap-1 border border-yellow-300"
              >
                <span>{language === 'mr' ? 'पुढील पायरी' : 'Next Step'}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-full font-extrabold text-xs bg-blue-900 text-white hover:bg-primary-container transition-all active:scale-95 shadow-lg flex items-center gap-1 border border-blue-950"
              >
                {submitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Check size={14} className="text-yellow-400" />
                )}
                <span>{language === 'mr' ? 'अर्ज सबमिट करा' : 'Submit Application'}</span>
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Guidance Banner (Exact matches Screen 10 layout) */}
      <div className="p-4 bg-blue-900 text-white rounded-xl flex items-start gap-3 border border-blue-950 shadow-md">
        <Info size={18} className="text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wide">
            Need Help? (मदत हवी आहे का?)
          </h4>
          <p className="text-xs text-blue-100 opacity-90 leading-relaxed mt-0.5">
            Call our helpline at 020-23456789 or visit the school office between 10 AM to 4 PM.
          </p>
        </div>
      </div>

      {/* Mobile Spacer & bottom nav */}
      <div className="h-16 md:hidden"></div>
      <nav className="md:hidden fixed bottom-0 w-full z-35 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,35,102,0.05)]">
        <button onClick={() => setScreen('admin_dashboard')} className="flex flex-col items-center justify-center text-gray-400">
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button onClick={() => setScreen('admin_outstanding_fees')} className="flex flex-col items-center justify-center text-gray-400">
          <Bell size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Alerts</span>
        </button>
        <button className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1 rounded-full shadow-sm">
          <User size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Profile</span>
        </button>
        <button onClick={() => setScreen('admin_dashboard')} className="flex flex-col items-center justify-center text-gray-400">
          <Menu size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Menu</span>
        </button>
      </nav>
    </main>
  );
}
