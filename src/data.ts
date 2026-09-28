/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Notice, Exam, Period, Album } from './types';

// Mock list of students for Class 2nd - Section A & general admin list
export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    rollNo: '01',
    name: 'Aditya Rajesh Deshmukh',
    nameMr: 'आदित्य राजेश देशमुख',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1k8V_YTxsdMXtVvZIeVlKb_lxeKDE_KpSwv5v-l8ZKnk57XV8cES5SfF6EUILIgilgqnepmHrKn4jDlvTyyQ4kQJ099FNTQeIhleY209mcAUn5cpKkU1Pfp7P0SFz3pd6udR3gM9JNRAsqP2cJDBjPc6OUUzLJDWPA1no49-S1qmzwrpK_Rl3ATrHI9Tnu3MNyMsSOJidkBkXue8geNGVxDqWRJ4JoPKE6LOn5S0-O2hp6Tkq48dP23zlg6yOwSdPuQlntqDTGwvg',
    attendance: 'present',
    marks: 45,
    outstandingFees: 6000,
    class: '2nd-A',
    grNumber: '1001',
    overallGrade: 'A+'
  },
  {
    id: 's2',
    rollNo: '02',
    name: 'Ananya Vikas Patil',
    nameMr: 'अनन्या विकास पाटील',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAqNOo0csKs-eOCUlTgFFfJETsEbau1DtcRjh-GEV_tPbD0-aqbqbAgOB_IBACbtdmg6DbTqIk4HOVTc9LFLjnm2HYwNXsJFq3LuYc-0dOTMYgi7XBG4sB4BratbN2HIVmpJZfYx9a-vf2CuAJwgCl58LRVSZ1XkJ3UiznXCLicM2AbCC2UkZsq-ev1UMluatC4OTZYB5vtcUxi9qfFHZNwSlKT76vK3yM5_LAo2Ddpda0MLMAHBhUPpIF6s6QVwMK9lBHf88ogOVo',
    attendance: 'present',
    marks: null,
    outstandingFees: 4500,
    class: '2nd-A',
    grNumber: '1002',
    overallGrade: 'A'
  },
  {
    id: 's3',
    rollNo: '03',
    name: 'Ishan Sanjay More',
    nameMr: 'ईशान संजय मोरे',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiiJHy-ZCb95F3GTjoNYMZkGOckNAYoIaazKMINBnjDwasYra-NOSIpEkrujpJZprdZpaJeTw3PSTIPv6odai4hrN-yiPsD506pDb4FPkE7wdbXJWmE-dQErSOwSgVr1Y258_bEyQD2NybNDg3DkSra7QP6TSRr34kTo-1eUhfZn4tbXrQo52oN3vwd6bb6UvDmvSYAdr0uRGWf1FI1dSBWmYyIaNKS-HfNpVAg_gkg9bGOjp95DtDtAx3Lt1Oo-u4dhLtHMAkAZBt',
    attendance: 'absent',
    marks: 12,
    outstandingFees: 8700,
    class: '2nd-A',
    grNumber: '1003',
    overallGrade: 'C'
  },
  {
    id: 's4',
    rollNo: '04',
    name: 'Kajal Amit Shah',
    nameMr: 'काजल अमित शाह',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2zAOOtFNBuzXIs3eaq3OGLB5I6DdqRAlMj7yBeqd1s8ukgYaAR6kef-UKgz-eEXDFnwI_JKm3BVpyjRqV8VsUDtkVcnR0OiCOPg_a7TC0JlePsvr68YKs5uxWnTbmMbaEzN9QKEe6lhmhOsk3VX3rt-MRuwj2qQjDcPkB1X2VC8j3ZeHRnbznzomYN61_bJDBKnGQeQClN-qScvonZf_SyFKfZy_pJ6JrSBRDmJKcHpAnqs45CtRQdVRUE_qDsDp4x21oGHSWgFd',
    attendance: 'present',
    marks: 48,
    outstandingFees: 0,
    class: '2nd-A',
    grNumber: '1004',
    overallGrade: 'O'
  },
  {
    id: 's5',
    rollNo: '05',
    name: 'Rohan Anil More',
    nameMr: 'रोहन अनिल मोरे',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCi0KEnmK3shal_5zG6XCYYiNj2kanTVq0CQWyaOF5z2r93vcCb3SKuZeSn4fLh-68CTuKYcDKU30DR18Urr_hPStjGu1oaI_SR411SyHKYQLjmuHlY_Je79v1pkVmYJhVTDRh42B8NnxQF4s3bHUsxHwzuFbZ1fqTk79v0vTP5hbuWzUCDdcWWM8O0P_w1tK1Av9Oz_mpUL_OUDF_qTiB7TJkVVpmNR8Du5wlNA8vkvZ-IoQZ_sgcJlS_g7ViCOIcN_UHxpHCGJ50',
    attendance: 'present',
    marks: 39,
    outstandingFees: 12000,
    class: '2nd-A',
    grNumber: '1005',
    overallGrade: 'B+'
  },
  {
    id: 's12',
    rollNo: '12',
    name: 'Aryan Sharma',
    nameMr: 'आर्यन शर्मा',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY8wskg1dSB6t7mYbJaPYeUu2wgolvLtzLpv2Q_9IgLgUYSGn1wX2FqpjtCpplK7IeAmTrWzPKZOxP5-4k1TP-Y9YyvkJ75XylZpZe-yI5tmMnS6kXfMNsyJN6LbGA7PcjGustLcD5PFhjRB2uytZMqpRXB1j0DQ66ikxE0pix0Y-OprzgHFZJ1Tvsm1rf6FppqUotmovg9FYppX0WGY1-srLWaOArbXILZvyX-Selz9CjhzRh52KbhD--cJQikcu1DPjobYVrG7Xb',
    attendance: 'present',
    marks: 46,
    outstandingFees: 12500,
    class: '1st-A',
    grNumber: '8812',
    overallGrade: 'A+'
  },
  {
    id: 's24',
    rollNo: '24',
    name: 'Aryan Rajesh Shinde',
    nameMr: 'आर्यन राजेश शिंदे',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCi0KEnmK3shal_5zG6XCYYiNj2kanTVq0CQWyaOF5z2r93vcCb3SKuZeSn4fLh-68CTuKYcDKU30DR18Urr_hPStjGu1oaI_SR411SyHKYQLjmuHlY_Je79v1pkVmYJhVTDRh42B8NnxQF4s3bHUsxHwzuFbZ1fqTk79v0vTP5hbuWzUCDdcWWM8O0P_w1tK1Av9Oz_mpUL_OUDF_qTiB7TJkVVpmNR8Du5wlNA8vkvZ-IoQZ_sgcJlS_g7ViCOIcN_UHxpHCGJ50',
    attendance: 'present',
    marks: 49,
    outstandingFees: 8500,
    class: '4-B',
    grNumber: '8852',
    overallGrade: 'A+'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Revised School Timings for Winter',
    titleMr: 'हिवाळ्यासाठी सुधारित शाळेच्या वेळा',
    content: 'From November 1st, school will start at 8:30 AM instead of 8:00 AM for all primary grades due to falling temperatures.',
    contentMr: 'वाढत्या थंडीमुळे १ नोव्हेंबरपासून सर्व प्राथमिक वर्गांसाठी शाळा सकाळी ८:०० ऐवजी ८:३० वाजता सुरू होईल.',
    date: 'Oct 24, 2023',
    tag: 'urgent',
    postedAgo: 'Posted 2 hours ago'
  },
  {
    id: 'n2',
    title: 'Unit Test II Schedule Released',
    titleMr: 'घटक चाचणी २ चे वेळापत्रक प्रसिद्ध',
    content: 'The detailed schedule for the upcoming Unit Test II for Grades 1 to 5 is now available for download.',
    contentMr: 'इयत्ता पहिली ते पाचवीच्या आगामी घटक चाचणी २ चे सविस्तर वेळापत्रक आता डाऊनलोडसाठी उपलब्ध आहे.',
    date: 'Oct 22, 2023',
    tag: 'academic',
    postedAgo: 'Posted Yesterday'
  },
  {
    id: 'n3',
    title: 'Diwali Vacation Announcement',
    titleMr: 'दिवाळीच्या सुट्ट्यांची घोषणा',
    content: 'School will remain closed for Diwali break from Nov 10 to Nov 25. Regular classes resume Nov 27.',
    contentMr: 'दिवाळीच्या सुट्टीसाठी शाळा १० नोव्हेंबर ते २५ नोव्हेंबर दरम्यान बंद राहील. नियमित वर्ग २७ नोव्हेंबरपासून पुन्हा सुरू होतील.',
    date: 'Oct 20, 2023',
    tag: 'holiday',
    postedAgo: 'Posted 2 days ago'
  },
  {
    id: 'n4',
    title: 'School Bus Route Update',
    titleMr: 'शालेय बस मार्ग अपडेट',
    content: 'Route 4 will be delayed by 15 minutes due to road maintenance near the station.',
    contentMr: 'स्टेशनजवळ रस्ता दुरुस्तीच्या कामामुळे बस मार्ग क्र. ४ ला १५ मिनिटे उशीर होईल.',
    date: 'Oct 18, 2023',
    tag: 'urgent',
    postedAgo: 'Posted 3 days ago'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'e1',
    name: 'Mid-Term Finals',
    nameMr: 'मध्यावधी परीक्षा',
    date: 'Oct 12',
    classInfo: 'Class I - Class IV',
    iconName: 'Calendar'
  },
  {
    id: 'e2',
    name: 'Oral Assessments',
    nameMr: 'तोंडी परीक्षा',
    date: 'Oct 15',
    classInfo: 'English & Marathi',
    iconName: 'Mic'
  }
];

export const MONDAY_PERIODS: Period[] = [
  {
    periodNum: 1,
    subject: 'English Literature',
    subjectMr: 'इंग्रजी साहित्य',
    time: '08:30 AM - 09:15 AM',
    teacher: 'Mrs. Meenakshi Sharma',
    teacherInitials: 'MS',
    color: '#3B82F6', // Blue
    iconName: 'Book'
  },
  {
    periodNum: 2,
    subject: 'Mathematics',
    subjectMr: 'गणित',
    time: '09:15 AM - 10:00 AM',
    teacher: 'Mr. Rajesh Kulkarni',
    teacherInitials: 'RK',
    color: '#F59E0B', // Amber
    iconName: 'Calculator'
  },
  {
    periodNum: 3,
    subject: 'Marathi Language',
    subjectMr: 'मराठी भाषा',
    time: '10:15 AM - 11:00 AM',
    teacher: 'Mrs. Vaishali Jadhav',
    teacherInitials: 'VJ',
    color: '#6366F1', // Indigo
    iconName: 'Languages'
  },
  {
    periodNum: 4,
    subject: 'General Science',
    subjectMr: 'सामान्य विज्ञान',
    time: '11:00 AM - 11:45 AM',
    teacher: 'Mr. Anil Patil',
    teacherInitials: 'AP',
    color: '#10B981', // Emerald
    iconName: 'FlaskConical'
  },
  {
    periodNum: 5,
    subject: 'Social Studies',
    subjectMr: 'सामाजिक शास्त्र',
    time: '12:30 PM - 01:15 PM',
    teacher: 'Ms. Sunita Deshpande',
    teacherInitials: 'SD',
    color: '#EC4899', // Pink
    iconName: 'Globe'
  }
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'al1',
    title: 'Annual Day 2023',
    titleMr: 'वार्षिक स्नेहसंमेलन २०२३',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAztV22-3uHtjXDXW6swewt0X3l27nxlsdXVph1FSkuFDN5PF3EJSRgoVM2YPlG4c7zCnojUCzdI-LxqsrZNT3X4-nZWfPP6zMGd-1bkhQ33QUWELasQ4Egrvq6_Y_1REYLshNfNuUOTRBsjI1X6mk33PEwzg3ZFfWoTHKBXvx4ELmTcCDCke0nyZ54Sbyqq_K7rsKNKF6Gi61M6XtxQ8Uglv4VzG0SomjR3Su5fYcLQ6A23RfyGegwwlA3TPPfbIm7BR8gT3bt9df',
    photosCount: 142,
    date: 'Dec 15, 2023',
    tag: 'cultural'
  },
  {
    id: 'al2',
    title: 'Sports Meet',
    titleMr: 'क्रीडा महोत्सव',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx1VFOOkpfvwyk44hbJN2ZXJ-RdBsiIB7m3DB4N2QoQ1gexGmkGU8hWPIxkry8UprIUmfO2K354ZVbeSxR4ulQIIxgq3e6EWdWphUPDUsXdqMwZ8yjbVTmM9npeJvPJCZTqMh-gEgDVP1OxCyzGnUEzBjbLH1iUHSMkcAk4tfRrY8cDnI5c-YUc6WiSnzWNRwIjMjSoiu_dXwZt5xnVWV-I2VQo4zVR0B0zZFGTyc1XSwtohDRSnH9atet_WPi8XXrzi_dNQzAKplI',
    photosCount: 86,
    date: 'Nov 20, 2023',
    tag: 'sports'
  },
  {
    id: 'al3',
    title: 'Science Fair',
    titleMr: 'विज्ञान प्रदर्शन',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK0MKZStF1kq6Rzi65UZfExK1Q_fkk2V6O0uTyHvY3WzJc_vjBZd4GfVE2h-Z3oHKi5YXu2tWuwdninSHW6tigd4wIUbkYrVqOWN1YO-FlqCS1sN4H8vHgt9124YbbBUU9VHowlkBJptLqz5b8hEUUy5mJcq91gHXyM8gy6nHRzwObFbSUzHpnjvg1BU26yJwC-n1qf8kZBOfCFTdOxooTTAsCkMvVGz7glTiL51bKFfUSi9q28fzkhYz-tlM6GNTz0z4O3oo3j3dO',
    photosCount: 42,
    date: 'Oct 12, 2023',
    tag: 'academic'
  },
  {
    id: 'al4',
    title: 'Art Exhibition',
    titleMr: 'कला प्रदर्शन',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlsCNBccJAmGwbUaOyf6Fmrb3HZ7-zixdcw1boHz9u48dVb2-jHBHKLYEOhiR84tdwhuzt7D8Pth70Gj2cBg92vsWGyE58lbh3XTtH-kFxB7HkHKMJoffzSTvoXiw3F8Mlmz5wWvT95oE6A8rGvpHQ093KnHcZ56Vh7oAi8g0vDXE60chPHKuCugg61UGr43hb8iAXRsuf7WlkZeTeQ3FzVC-1HOsFWHjuszg7TbXxRYaFmxSvC6wnXT1ut1Do5LIoE9rxgN_PuP46',
    photosCount: 28,
    date: 'Sep 05, 2023',
    tag: 'cultural'
  },
  {
    id: 'al5',
    title: 'Interschool Debate',
    titleMr: 'शालेय वादविवाद स्पर्धा',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1nVQpgIO6qBifBMPndymyEWSTx6FS3IyWPXvS-NYTdCeZ2aErU1-Mn28OPPcDvG81DUyguvhdQC9mVNQCDoDtSc3qVZiWw6bwWaRTZhmt-o2MgkWXJV9upe0uctD_fgMFJ2iC0I_l-9cpYUVWzIrIwDuA5BHHpSuasPDdT7QEIXRzZdL1BkzaTWfsTxvFGsuNcjwgnUbxCsOnLsWZmU3ySj1yAlU6j3SNjXuQYNxdYP0o17S2f9C0tAgi40RhJW1c5zY364kL3yBG',
    photosCount: 15,
    date: 'Aug 28, 2023',
    tag: 'academic'
  },
  {
    id: 'al6',
    title: 'International Yoga Day',
    titleMr: 'योग दिन',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq8drpFgiDFKMZpLiqog4o_y-dEukxvjc8AC0p5WEInSEn9z5x642Tihf-kz0clKA5n5ocVQgobKhlbos2FHl-yZcAj-sqoCopeFFWHFAeJf-Hg2ntwdR5GbUYXUDmhx53xOO8hDngOACc6NNmaEjODlGKwjUy-_6_icUM-6cG5DY1dwGSar1Xq0wrBIzEMbu9hFARkGe54ALPjjvfzYnT-R31Lj_rlaDpMLuhI95CXZ-HvBX__1leQKfPoLNXYoV5oODHbvm5i2Kh',
    photosCount: 54,
    date: 'Jun 21, 2023',
    tag: 'sports'
  }
];

export const SUBJECTS_MARATHI: Record<string, string> = {
  'English Literature': 'इंग्रजी साहित्य',
  'Mathematics': 'गणित',
  'Marathi Language': 'मराठी भाषा',
  'General Science': 'सामान्य विज्ञान',
  'Social Studies': 'सामाजिक शास्त्र',
  'English (HL)': 'इंग्रजी',
  'Science & Tech': 'विज्ञान',
  'Social Science': 'सामाजिक शास्त्र'
};
