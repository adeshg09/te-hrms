import { ThemeOption } from '@/types';
import { MdDashboard } from 'react-icons/md';
import { AiOutlineTeam } from 'react-icons/ai';
import {
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaCalendarMinus,
  FaCalendarAlt,
  FaCog,
  FaUserAlt,
  FaFileAlt,
  FaLock,
} from 'react-icons/fa';

export const themes: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
  { value: 'system', label: 'System', icon: '/assets/icons/computer.svg' },
];

export const sidebarLinks = [
  {
    icon: MdDashboard,
    route: '/dashboard',
    label: 'Dashboard',
    // role:"Admin"
  },
  {
    icon: AiOutlineTeam,
    route: '/dashboard/roles',
    label: 'All Roles',
    // role:"Admin"
  },
  {
    icon: FaBriefcase,
    route: '/dashboard/designations',
    label: 'All Designations',
    // role:"Admin"
  },
  {
    icon: FaUsers,
    route: '/dashboard/employees',
    label: 'All Employees',
    // role:"Admin"
  },
  {
    icon: FaClipboardList,
    route: '/dashboard/attendance',
    label: 'Attendance',
    // role:"Hr"
  },
  {
    icon: FaCalendarMinus,
    route: '/dashboard/leaves',
    label: 'Leaves',
    // role:"Hr"
  },
  {
    icon: FaCalendarAlt,
    route: '/dashboard/holidays',
    label: 'Holidays',
    // role:"Hr"
  },
  {
    icon: FaCog,
    route: '/dashboard/settings',
    label: 'Settings',
    // role:"Hr"
  },
];

export const stats = [
  {
    title: 'Total Employee',
    value: 560,
    change: 12,
    updateDate: 'July 16, 2023',
    type: 'employee' as const,
  },
  {
    title: 'Today Attendance',
    value: 470,
    change: -8,
    updateDate: 'July 14, 2023',
    type: 'attendance' as const,
  },
];

export const addNewEmployeeSteps = [
  {
    icon: FaUserAlt,
    route: '/personal-details',
    label: 'Personal Information',
    // role:"Admin"
  },
  {
    icon: FaBriefcase,
    route: '/professional-details',
    label: 'Professional Information',
    // role:"Admin"
  },
  {
    icon: FaFileAlt,
    route: '/documents',
    label: 'Documents',
    // role:"Admin"
  },
  {
    icon: FaLock,
    route: '/Account Access',
    label: 'access',
    // role:"Admin"
  },
];

export const bloodGroups = [
  'APlus',
  'AMinus',
  'BPlus',
  'BMinus',
  'ABPlus',
  'ABMinus',
  'OPlus',
  'OMinus',
];

export const marritalStatus = ['Married', 'Single', 'Divorced', 'Widowed'];

export const educationCourse = [
  'Std 10th',
  'Std 12th',
  'Graduation',
  'Post Graduation',
  'Others',
];

export const educationStatus=[
  'Completed',
  'In Process',
  'Dropped'
]

export const studyMode=[
  'Full Time',
  'Part Time',
  'Correspondence',

]

export const basicDetailsInitialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  mobileNo: '',
  emailId: '',
  password: '',
  profileUrl: '',
  roles: [],
  isActive: true,
  showActivity: true,
  dateOfBirth: undefined,
  age: 18,
  gender: 'Male',
  maritalStatus: 'Single',
  bloodGroup: 'APlus',
  birthCountry: '',
  birthState: '',
  birthLocation: '',
  panNo: '',
  caste: '',
  religion: '',
  domicile: '',
};
