/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, Role, ScreenId, Student } from './types';
import { INITIAL_STUDENTS } from './data';
import Header from './components/Header';
import LoginView from './components/LoginView';
import TeacherDashboard from './components/TeacherDashboard';
import MarksEntryView from './components/MarksEntryView';
import AdminDashboard from './components/AdminDashboard';
import FeesCollectionView from './components/FeesCollectionView';
import OutstandingFeesReport from './components/OutstandingFeesReport';
import AdmissionFormView from './components/AdmissionFormView';
import ParentDashboard from './components/ParentDashboard';
import StudentResultView from './components/StudentResultView';
import TimetableView from './components/TimetableView';
import NoticeBoardView from './components/NoticeBoardView';
import EventsGalleryView from './components/EventsGalleryView';
import UploadPhotosView from './components/UploadPhotosView';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<Role | null>(null);
  const [screen, setScreen] = useState<ScreenId>('login');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  // Render components based on screen state
  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
          <LoginView
            language={language}
            role={role}
            setRole={setRole}
            setScreen={setScreen}
          />
        );
      case 'teacher_attendance':
        return (
          <TeacherDashboard
            language={language}
            students={students}
            setStudents={setStudents}
            setScreen={setScreen}
            setRole={setRole}
          />
        );
      case 'teacher_marks':
        return (
          <MarksEntryView
            language={language}
            students={students}
            setStudents={setStudents}
            setScreen={setScreen}
          />
        );
      case 'admin_dashboard':
        return (
          <AdminDashboard
            language={language}
            setScreen={setScreen}
            setRole={setRole}
          />
        );
      case 'admin_fees_collection':
        return (
          <FeesCollectionView
            language={language}
            students={students}
            setScreen={setScreen}
            setRole={setRole}
          />
        );
      case 'admin_outstanding_fees':
        return (
          <OutstandingFeesReport
            language={language}
            students={students}
            setScreen={setScreen}
          />
        );
      case 'admin_admission_form':
        return (
          <AdmissionFormView
            language={language}
            setScreen={setScreen}
          />
        );
      case 'parent_dashboard':
        return (
          <ParentDashboard
            language={language}
            students={students}
            setScreen={setScreen}
            setRole={setRole}
          />
        );
      case 'parent_results':
        return (
          <StudentResultView
            language={language}
            setScreen={setScreen}
          />
        );
      case 'parent_timetable':
        return (
          <TimetableView
            language={language}
            setScreen={setScreen}
          />
        );
      case 'notice_board':
        return (
          <NoticeBoardView
            language={language}
            setScreen={setScreen}
            role={role}
          />
        );
      case 'gallery':
        return (
          <EventsGalleryView
            language={language}
            setScreen={setScreen}
            role={role}
          />
        );
      case 'gallery_upload':
        return (
          <UploadPhotosView
            language={language}
            setScreen={setScreen}
            role={role}
          />
        );
      default:
        return (
          <LoginView
            language={language}
            role={role}
            setRole={setRole}
            setScreen={setScreen}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-900 selection:bg-blue-900 selection:text-white">
      {/* Universal header banner */}
      <Header
        language={language}
        setLanguage={setLanguage}
        role={role}
        setRole={setRole}
        screen={screen}
        setScreen={setScreen}
      />

      {/* Primary content router */}
      <div className="flex-grow flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
}
