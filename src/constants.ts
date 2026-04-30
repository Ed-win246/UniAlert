import { Alert, User, Role } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Atuhaire Edwin', role: 'Admin', department: 'Administration', email: '2300815040@std.ku.ac.ug', phone: '0745028870', status: 'Active', idNumber: 'ADM-001' },
  { id: '2', name: 'Prof. Michael Chen', role: 'Staff', department: 'Computer Science', email: 'm.chen@university.edu', phone: '+1 (555) 0124', status: 'Active', idNumber: 'STF-442' },
  { id: '3', name: 'Elena Rodriguez', role: 'Student', department: 'Business School', email: 'e.rodriguez@student.university.edu', phone: '+1 (555) 0125', status: 'Active', idNumber: 'STU-998' },
  { id: '4', name: 'David Smith', role: 'Student', department: 'Engineering', email: 'd.smith@student.university.edu', phone: '+1 (555) 0126', status: 'Active', idNumber: 'STU-102' },
  { id: '5', name: 'Maria Garcia', role: 'Staff', department: 'Health Sciences', email: 'm.garcia@university.edu', phone: '+1 (555) 0127', status: 'Inactive', idNumber: 'STF-551' },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    title: 'Severe Weather Warning: Flash Floods',
    category: 'Emergency',
    severity: 'Critical',
    targetAudience: 'All',
    message: 'A flash flood warning has been issued for the campus area. Please avoid low-lying areas and stay indoors if possible. All outdoor activities are suspended.',
    channels: ['In-App', 'Email', 'SMS'],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    status: 'Active',
    sentBy: 'Campus Security',
    acknowledgedBy: ['3', '4']
  },
  {
    id: 'a2',
    title: 'Final Exam Schedule Update',
    category: 'Academic',
    severity: 'Medium',
    targetAudience: 'Students Only',
    message: 'The final exam schedule for the Department of Engineering has been updated. Please check the student portal for the new times and venues.',
    channels: ['In-App', 'Email'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'Active',
    sentBy: 'Registrar Office'
  },
  {
    id: 'a3',
    title: 'Campus Wi-Fi Maintenance',
    category: 'General',
    severity: 'Low',
    targetAudience: 'All',
    message: 'Scheduled maintenance will be performed on the campus Wi-Fi network this Sunday from 2:00 AM to 6:00 AM. Intermittent connectivity is expected.',
    channels: ['In-App'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'Resolved',
    sentBy: 'IT Services'
  },
  {
    id: 'a4',
    title: 'Security Alert: Library Area',
    category: 'Security',
    severity: 'High',
    targetAudience: 'All',
    message: 'Reports of suspicious activity near the main library. Campus police are on site. Please avoid the area and use the campus escort service for safe transit.',
    channels: ['In-App', 'SMS'],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    status: 'Resolved',
    sentBy: 'Campus Security'
  },
  {
    id: 'a5',
    title: 'Free Flu Vaccinations',
    category: 'Health',
    severity: 'Low',
    targetAudience: 'All',
    message: 'The University Health Center is offering free flu vaccinations to all students and staff this week. Walk-ins welcome from 9:00 AM to 4:00 PM.',
    channels: ['In-App', 'Email'],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    status: 'Active',
    sentBy: 'Health Center'
  },
    {
    id: 'a6',
    title: 'Heavy Rain Alert ',
    category: 'Emergency',
    severity: 'Low',
    targetAudience: 'All',
    message: 'The University Health Center is offering free flu vaccinations to all students and staff this week. Walk-ins welcome from 9:00 AM to 4:00 PM.',
    channels: ['In-App', 'Email'],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    status: 'Active',
    sentBy: 'Health Center'
  },
      {
    id: 'a7',
    title: 'Guild elections voting ',
    category: 'Emergency',
    severity: 'Low',
    targetAudience: 'All',
    message: 'The University Health Center is offering free flu vaccinations to all students and staff this week. Walk-ins welcome from 9:00 AM to 4:00 PM.',
    channels: ['In-App', 'Email'],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    status: 'Active',
    sentBy: 'Health Center'
  }
  
];

export const CHART_DATA_ALERTS_WEEK = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 12 },
  { day: 'Fri', count: 8 },
  { day: 'Sat', count: 3 },
  { day: 'Sun', count: 2 },
];

export const CHART_DATA_CATEGORIES = [
  { name: 'Emergency', value: 15 },
  { name: 'Academic', value: 30 },
  { name: 'Health', value: 10 },
  { name: 'Security', value: 20 },
  { name: 'General', value: 25 },
];

export const CHART_DATA_DELIVERY = [
  { date: 'Apr 01', rate: 98 },
  { date: 'Apr 05', rate: 97 },
  { date: 'Apr 10', rate: 99 },
  { date: 'Apr 15', rate: 95 },
  { date: 'Apr 20', rate: 100 },
  { date: 'Apr 25', rate: 98 },
  { date: 'Apr 30', rate: 99 },
];

export const SEVERITY_COLORS = {
  Low: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Critical: 'bg-red-100 text-red-700 border-red-200',
};

export const CATEGORY_COLORS = {
  Emergency: 'text-red-600 bg-red-50',
  Academic: 'text-blue-600 bg-blue-50',
  Health: 'text-green-600 bg-green-50',
  Security: 'text-purple-600 bg-purple-50',
  General: 'text-gray-600 bg-gray-50',
};
