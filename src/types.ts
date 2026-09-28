/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'mr';

export type Role = 'admin' | 'teacher' | 'parent';

export type ScreenId =
  | 'login'
  | 'teacher_attendance'
  | 'teacher_marks'
  | 'admin_dashboard'
  | 'admin_fees_collection'
  | 'admin_outstanding_fees'
  | 'admin_admission_form'
  | 'parent_dashboard'
  | 'parent_results'
  | 'parent_timetable'
  | 'notice_board'
  | 'gallery'
  | 'gallery_upload';

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  nameMr: string;
  photoUrl: string;
  attendance: 'present' | 'absent' | null;
  marks?: number | null; // out of 50
  outstandingFees: number;
  class: string;
  grNumber?: string;
  overallGrade?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleMr: string;
  content: string;
  contentMr: string;
  date: string;
  tag: 'urgent' | 'academic' | 'holiday';
  postedAgo: string;
}

export interface Exam {
  id: string;
  name: string;
  nameMr: string;
  date: string; // e.g. "Oct 12"
  classInfo: string;
  iconName?: string;
}

export interface Period {
  periodNum: number;
  subject: string;
  subjectMr: string;
  time: string;
  teacher: string;
  teacherInitials: string;
  color: string; // tailwind border/bg colors
  iconName: string;
}

export interface Album {
  id: string;
  title: string;
  titleMr: string;
  coverImage: string;
  photosCount: number;
  date: string;
  tag: 'academic' | 'cultural' | 'sports' | 'campus';
}
